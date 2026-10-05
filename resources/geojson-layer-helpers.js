/*
 * Shared helpers for building qgis2web-compatible GeoJSON FeatureCollections
 * from a data/*.js "single source of truth" object/array (see
 * data/communities.js, data/station.js, data/boundary.js).
 *
 * Any layer that's driven by a hand-maintained data file — communities and
 * the station today, the reserve boundary now too, POIs once that data
 * arrives — should build its `json_<LayerName>` variable with one of these
 * helpers instead of writing the FeatureCollection boilerplate by hand
 * each time. That keeps every data-driven layer consistent and makes it
 * obvious, at a glance, which layer files are generated vs. raw qgis2web
 * exports.
 *
 * Must be loaded (via <script>) after the relevant data/*.js file(s) and
 * before the layer file(s) that call these.
 */

// For layers with one feature per item (e.g. communities): builds one
// Point feature per item in `items` that has a `coordinates` field.
function buildPointFeatureCollection(layerName, items, propertiesBuilder) {
    return {
        "type": "FeatureCollection",
        "name": layerName,
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        "features": items
            .filter(function (item) { return Array.isArray(item.coordinates); })
            .map(function (item) {
                return {
                    "type": "Feature",
                    "properties": propertiesBuilder(item),
                    "geometry": { "type": "Point", "coordinates": item.coordinates }
                };
            })
    };
}

// For a single-feature outline/boundary layer (e.g. the reserve boundary):
// builds one LineString feature from `item.coordinates`, an ordered array
// of [lon, lat] vertices.
function buildLineFeatureCollection(layerName, item, propertiesBuilder) {
    return {
        "type": "FeatureCollection",
        "name": layerName,
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        "features": [
            {
                "type": "Feature",
                "properties": propertiesBuilder(item),
                "geometry": { "type": "LineString", "coordinates": item.coordinates }
            }
        ]
    };
}
