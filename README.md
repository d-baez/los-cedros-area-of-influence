# Los Cedros — Area of Influence

An interactive, scroll-driven map of the **Bosque Los Cedros** reserve and
the communities that surround it. As you scroll through the story on the
left, the map on the right flies to each place being described — the
reserve boundary, the scientific station, and each neighboring community.
Available in English and Spanish (EN/ES toggle in the header).

It's a plain static website: no build step, no server-side code, no
package manager required to run it. Open `index.html` in a browser and
it works.

## Quick start

Just want to see it running locally?

```bash
# from the project root
python3 -m http.server 8000
# then open http://localhost:8000 in a browser
```

(Any local static file server works — `npx serve`, VS Code's Live Server,
etc. Opening `index.html` directly via `file://` mostly works too, but a
local server avoids occasional browser restrictions on loading local
files with JavaScript.)

## What's in this repo

| Path | What it is |
|---|---|
| `index.html` | The entire site: page layout, story text, and the script that ties scrolling to the map. |
| `data/` | **Edit these to update content: communities, the scientific station, the reserve boundary, and site language text.** See below. |
| `layers/` | Map data (reserve boundary, scientific station, communities) as OpenLayers-ready GeoJSON. |
| `styles/` | How each map layer is drawn (colors, icons, legend images). |
| `resources/` | Third-party map libraries (OpenLayers, qgis2web) plus a small helper script. |
| `images/` | Story photos (currently empty — see [next steps](#status--known-gaps)). |
| `scripts/` | A small Node tool for importing updated data from QGIS. |

For a deeper file-by-file breakdown, see [`intent.md`](intent.md). For
instructions on bringing in a new export from QGIS, see
[`IMPORT.md`](IMPORT.md).

## How to update the content

Every place (a community, the station, the boundary) has **two**
description fields, so pick the right one:

- `shortDescription` — one line, shown when someone **clicks the pin on
  the map** (the popup).
- `description` — the full text, shown in the **scrolling story panel**
  on the left as that section comes into view.

Both are **bilingual objects**: `{ en: "...", es: "..." }`. `name` stays
a plain string — place names aren't translated. Whichever language the
visitor has selected (the EN/ES toggle in the header) picks which one
shows; see "Language (English/Spanish)" below for how that works.

### Change a community's name, location, or description

Open **`data/communities.js`**. It's a plain list — one entry per
community:

```js
{
    id: 1,
    name: "Community 1",
    coordinates: [-78.780197, 0.368707], // [longitude, latitude]
    zoom: 16,
    duration: 1200,
    shortDescription: { en: "...", es: "..." }, // one line, shown in the map popup
    description: { en: "...", es: "..." }       // full text, shown in the story section
}
```

Edit any field and save. The map pin, the "fly to" camera move when you
scroll to that section, the map popup, and the story text are all
generated from this one file automatically — you never need to edit them
in more than one place.

There are 11 communities total; several are still placeholders
(`coordinates: null`) waiting on real location data. Any community
without coordinates is skipped on the map (and flagged in the browser
console) until it's filled in.

### Change the scientific station's name, location, or description

Open **`data/station.js`** — same idea as communities, just a single
entry instead of a list:

```js
var station = {
    id: 1,
    name: "Los Cedros",
    coordinates: [-78.81251, 0.361799], // [longitude, latitude]
    zoom: 16,
    duration: 1200,
    shortDescription: { en: "...", es: "..." }, // one line, shown in the map popup
    description: { en: "...", es: "..." }       // full text, shown in the story section
};
```

Edit any field and save — the map pin, the camera move when you scroll to
that section, the popup, and the section text update automatically, just
like communities.

### Change the reserve boundary's name or description

Open **`data/boundary.js`** — same idea again, but the boundary is a
line, not a point, so it carries an ordered list of vertices instead of a
single `coordinates` pair:

```js
var boundary = {
    id: 1,
    name: "Reserve outline",
    shortDescription: { en: "...", es: "..." }, // one line, shown in the map popup
    description: { en: "...", es: "..." },      // full text, shown in the story section
    coordinates: [ /* ~170 [longitude, latitude] points tracing the outline */ ]
};
```

Edit `name`/`shortDescription`/`description` freely — that updates the
map popup and story text automatically. The `coordinates` array is
usually replaced wholesale from a new QGIS export rather than hand-edited
point by point (see [`IMPORT.md`](IMPORT.md)), but it's still plain,
readable JSON if you ever need to check or tweak a specific vertex.

### Language (English/Spanish)

The EN/ES buttons in the header switch the whole site's language —
masthead, section headings, story text, and map popups all update
without a page reload, and the choice is remembered (`localStorage`) for
next time. It starts from the visitor's browser language (Spanish if the
browser is set to Spanish, English otherwise) until they pick one
themselves.

Two kinds of text feed this:

- **Place content** — `shortDescription`/`description` in `data/*.js`
  (see above). Edit those bilingual objects directly.
- **Site chrome** — fixed UI strings that aren't tied to a place: the
  masthead eyebrow/title/subtitle, the "Legend" button label, and the
  overview/boundary/station section headings and step-labels. These live
  in **`data/i18n.js`**'s `translations.en` / `translations.es` objects —
  edit those, not `index.html`, to change this copy.

Adding a third language later means adding another key (e.g. `fr`) to
every `{ en, es }` object across `data/*.js` and `translations` in
`data/i18n.js`, plus a third toggle button in `index.html`'s header.

### Add new map layers (e.g. points of interest)

See [`IMPORT.md`](IMPORT.md) — it covers bringing in a new QGIS export
generally, and adding points of interest (POIs) once that data is ready.

### Add story photos

Drop images into `images/` and uncomment the matching `<figure>` block in
`index.html` (each story section has one, commented out, showing exactly
which filename it expects).

## Status / known gaps

This project is actively being built out. As of now:

- 10 of 11 surrounding communities have real names; only 4 have confirmed locations.
- Community descriptions are still placeholder copy (both languages). The station and boundary have real Spanish content with an AI-drafted English translation — worth having someone fluent confirm/edit both before publishing. Every community `shortDescription` is still a TODO in both languages.
- No story photos have been added yet.

See [`intent.md`](intent.md) for the full, up-to-date list of what's
outstanding.


Project Created By Allie Namenuk-Bollinger and Daniel Báez