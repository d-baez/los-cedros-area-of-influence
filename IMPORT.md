# Importing a new QGIS export

This site started life as a **qgis2web** export, and the map layers still
come from that plugin. But `index.html` and `data/*.js` have since been
hand-customized (scrollytelling layout, narrative text, a single source
of truth per layer for boundary/station/community data) — so **do not
just drag a fresh qgis2web export on top of this project and overwrite
everything.** A full qgis2web export regenerates `index.html`,
`layers/*.js`, `styles/*.js`, `layers/layers.js`, and `resources/*` from
scratch, which would wipe out all of that.

Follow this checklist instead whenever QGIS work is ready to bring in.

Note: each `data/*.js` place also carries `shortDescription` (map popup
text) and `description` (story section text), each a bilingual
`{ en: "...", es: "..." }` object — see `README.md`. Neither comes from
QGIS; importing only ever touches `coordinates`/`name`, never these two
fields.

## 0. Export to a scratch folder, not into the project

In QGIS, run the qgis2web export into a separate folder, e.g.
`qgis-export/` at the repo root (already gitignored — never commit a raw
export). Don't export directly into this repo's `layers/`/`styles/`/
`resources/` folders.

## 1. Property boundary / "area of influence" outline

Like the station, don't hand-copy the exported layer file over
`layers/LosCedros_BoundaryLos_Cedros_boundary_1.js` — it's **generated**
from `data/boundary.js`. There's one boundary feature (a `LineString` of
vertices), so no sync script is needed, but a full re-export usually
redraws the whole outline rather than nudging individual points, so this
is normally a full vertex-array replacement rather than a hand-edit:

1. Open the new export (`qgis-export/layers/LosCedros_Boundary...js` or
   whatever qgis2web names it) and copy its `geometry.coordinates` array
   (a list of `[lon, lat]` pairs) wholesale into `data/boundary.js`'s
   `coordinates` field, replacing the old array. Update `name`/
   `description` too if those changed.
2. If you'd rather not paste ~170+ coordinate pairs by hand, a short
   Node one-liner does the swap for you (adjust the export path):
   ```
   node -e "
   const fs = require('fs');
   const raw = fs.readFileSync('qgis-export/layers/LosCedros_Boundary....js', 'utf8');
   const fc = JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1));
   const coords = fc.features[0].geometry.coordinates;
   console.log(JSON.stringify(coords));
   " > /tmp/new-boundary-coords.json
   ```
   then paste the contents of `/tmp/new-boundary-coords.json` in as
   `data/boundary.js`'s `coordinates` value (reformat with line breaks if
   you want it scannable — see the existing file for the style used).
3. The map outline and the boundary section's description text in
   `index.html` both update automatically from `data/boundary.js` — no
   other file needs touching.
4. If this is a genuinely **new, separate** layer (e.g. an "area of
   influence" polygon distinct from the property boundary, rather than
   an update to the existing one), that's a new data-driven layer: follow
   the same pattern as `data/boundary.js` (or `data/communities.js` if
   it's point-based) — a new `data/*.js` file, a new `layers/*.js` file
   built with `buildLineFeatureCollection()`/`buildPointFeatureCollection()`,
   added to `layers/layers.js`, plus a style file and legend image if you
   want it in the layer switcher.

## 2. Scientific station

Like communities, don't hand-copy the exported layer file over
`layers/Scientific_station_SHPScientificStationLocation_2.js` — it's
**generated** from `data/station.js`. There's only one station, so no
sync script is needed: just open the new export, copy its
`geometry.coordinates` (`[lon, lat]`) into `data/station.js`'s
`coordinates` field by hand, and update `name`/`description` if those
changed too. The map pin, the map's "fly to" waypoint for that section,
and the section heading/body text in `index.html` all update
automatically from that one file.

## 3. Communities

Don't hand-copy the new communities layer file over
`layers/Example_communities_3.js` — that file is **generated** from
`data/communities.js` and will be overwritten by the build path, not by
QGIS. Instead, sync just the coordinates:

```
node scripts/sync-communities-from-geojson.js qgis-export/layers/Example_communities_3.js --dry-run
# review the report, then run for real:
node scripts/sync-communities-from-geojson.js qgis-export/layers/Example_communities_3.js
```

What it does:
- Matches incoming features to existing `data/communities.js` entries by
  community name and patches **only their `coordinates`** in place —
  your hand-written `name`/`description`/`zoom`/`duration` are untouched.
- Appends any communities in the export that don't match an existing
  entry as new stub entries (`id`, `name`, `coordinates` filled in;
  `description` left as `TODO` for you to write).
- Never deletes anything — if a tracked community isn't in the new
  export, it's reported but left alone so you can decide.

Also accepts a plain `.geojson` file, not just a qgis2web `.js` export —
useful if you export directly from QGIS's "Export layer > GeoJSON"
instead of the full qgis2web plugin.

After syncing, fill in any `// TODO` names/descriptions by hand in
`data/communities.js`, and check the browser console on page load — it
warns about any community still missing coordinates.

## 4. POIs (new layer — not wired up yet)

Once POI data is ready, follow the same data-driven pattern communities
use, rather than a raw qgis2web layer file:

1. Create `data/pois.js` modeled on `data/communities.js` (an array of
   `{ id, name, coordinates, category?, shortDescription: { en, es }, description: { en, es } }`,
   matching the bilingual shape communities/station/boundary already use).
2. Create `layers/<POIsLayerName>.js` that builds its FeatureCollection
   with the shared helper in `resources/geojson-layer-helpers.js`:
   ```js
   var json_<POIsLayerName> = buildPointFeatureCollection(
       "<POIsLayerName>",
       pois,
       function (p) { return { "id": String(p.id), "Name": p.name, "Category": p.category }; }
   );
   ```
3. Add the layer to `layers/layers.js` (format/source/vector layer/add to
   `layersList`), a style file under `styles/`, and load `data/pois.js` +
   the new layer/style scripts in `index.html` in the same order as the
   communities scripts (`data/communities.js` → `resources/geojson-layer-helpers.js`
   → layer files).
4. If POIs should also drive scroll-story sections/waypoints like
   communities do, extend the generation script at the bottom of
   `index.html` the same way it's done for `communities`.
5. Once this pattern exists, a `sync-pois-from-geojson.js` script can be
   copied from `scripts/sync-communities-from-geojson.js` with the field
   names swapped.

## 5. Vendor library updates

If re-exporting bumps the qgis2web/OpenLayers version, new files will
appear under `qgis-export/resources/`. Diff them against `resources/`
before copying over — only copy files that actually changed, and don't
copy `qgis-export/index.html` at all (this project's `index.html` is
hand-maintained; see the header comment inside it for what NOT to touch).

## 6. Verify after importing

```
node --check data/communities.js
node -e "$(cat data/communities.js); $(cat resources/geojson-layer-helpers.js); $(cat layers/Example_communities_3.js); console.log(json_Example_communities_3.features.length + ' community features built OK')"
```

Then open `index.html` in a browser and confirm the map loads, the
community pins match `data/communities.js`, and scrolling still flies the
map through each section.
