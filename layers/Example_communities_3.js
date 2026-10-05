/*
 * Generated from data/communities.js — do NOT hand-edit the coordinates
 * or names here. Edit data/communities.js instead and this feature
 * collection will stay in sync automatically.
 *
 * Communities without confirmed coordinates (coordinates: null in
 * data/communities.js) are skipped so they don't render at [0,0].
 *
 * Requires resources/geojson-layer-helpers.js and data/communities.js to be
 * loaded first (see <script> order in index.html).
 */
var json_Example_communities_3 = buildPointFeatureCollection(
    "Example_communities_3",
    communities,
    function (c) {
        return {
            "id": String(c.id),
            "Community": c.name,
            // Map click popups show shortDescription (falls back to the
            // full description); the story section text always uses the
            // full description directly from data/communities.js.
            "description": pickLang(c.shortDescription) || pickLang(c.description) || null
        };
    }
);
