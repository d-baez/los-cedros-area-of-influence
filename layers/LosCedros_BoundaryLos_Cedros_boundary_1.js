/*
 * Generated from data/boundary.js — do NOT hand-edit the coordinates or
 * name here. Edit data/boundary.js instead and this feature collection
 * will stay in sync automatically.
 *
 * The extra null/default fields below (timestamp, begin, end,
 * altitudeMode, tessellate, extrude, visibility, drawOrder, icon) are
 * leftover KML attributes from the original QGIS export, kept as-is so
 * layers/layers.js's fieldAliases/popup wiring keeps working unchanged.
 *
 * Requires resources/geojson-layer-helpers.js and data/boundary.js to be
 * loaded first (see <script> order in index.html).
 */
var json_LosCedros_BoundaryLos_Cedros_boundary_1 = buildLineFeatureCollection(
    "LosCedros_BoundaryLos_Cedros_boundary_1",
    boundary,
    function (b) {
        return {
            "fid": String(b.id),
            "id": null,
            "Name": b.name,
            // Map click popups show shortDescription (falls back to the
            // full description); the story section text always uses the
            // full description directly from data/boundary.js.
            "description": pickLang(b.shortDescription) || pickLang(b.description) || null,
            "timestamp": null,
            "begin": null,
            "end": null,
            "altitudeMode": null,
            "tessellate": 1.0,
            "extrude": 0.0,
            "visibility": -1.0,
            "drawOrder": null,
            "icon": null
        };
    }
);
