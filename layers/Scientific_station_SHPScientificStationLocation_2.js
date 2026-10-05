/*
 * Generated from data/station.js — do NOT hand-edit the coordinates or
 * name here. Edit data/station.js instead and this feature collection
 * will stay in sync automatically.
 *
 * The extra null/default fields below (timestamp, begin, end,
 * altitudeMode, tessellate, extrude, visibility, drawOrder, icon) are
 * leftover KML attributes from the original QGIS export, kept as-is so
 * layers/layers.js's fieldAliases/popup wiring keeps working unchanged.
 *
 * Requires resources/geojson-layer-helpers.js and data/station.js to be
 * loaded first (see <script> order in index.html).
 */
var json_Scientific_station_SHPScientificStationLocation_2 = buildPointFeatureCollection(
    "Scientific_station_SHPScientificStationLocation_2",
    [station],
    function (s) {
        return {
            "fid": String(s.id),
            "id": null,
            "Name": s.name,
            // Map click popups show shortDescription (falls back to the
            // full description); the story section text always uses the
            // full description directly from data/station.js.
            "description": pickLang(s.shortDescription) || pickLang(s.description) || null,
            "timestamp": null,
            "begin": null,
            "end": null,
            "altitudeMode": null,
            "tessellate": -1.0,
            "extrude": 0.0,
            "visibility": -1.0,
            "drawOrder": null,
            "icon": null
        };
    }
);
