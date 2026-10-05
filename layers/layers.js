/*
 * Builds the OpenLayers map/layer objects and wires up the Legend /
 * click-popup config for each layer. Loaded after the layer data files
 * (layers/*.js) and their style files (styles/*.js) — see index.html.
 *
 * HOW TO UPDATE THINGS IN THIS FILE:
 *
 * - Rename a layer / change its label in the Legend panel:
 *   edit that layer's `title` (keeps the `<img>` legend swatch) and
 *   `popuplayertitle` (used as the map click-popup's heading) strings,
 *   below, in that layer's `new ol.layer.Vector({...})` block.
 *
 * - Change the legend swatch image: replace the PNG at the path the
 *   `title`'s `<img src="styles/legend/....png">` points to.
 *
 * - Show/hide a layer by default: edit its `setVisible(true|false)` call.
 *
 * - Change layer order (draw order on the map, and list order in the
 *   Legend panel): reorder the entries in `layersList` below.
 *
 * - Change what shows in the map click-popup for a layer: edit that
 *   layer's `fieldAliases` (see the comment above that block for how).
 *
 * - Change a place's actual NAME, LOCATION, or DESCRIPTION TEXT: do NOT
 *   edit this file — this file only reads the already-built
 *   `json_<LayerName>` GeoJSON. Edit `data/boundary.js`, `data/station.js`,
 *   or `data/communities.js` instead; the layer data files (layers/*.js)
 *   regenerate themselves from those automatically. See README.md.
 *
 * - Add a brand-new layer (e.g. POIs): see IMPORT.md — it needs a new
 *   data/*.js file, a new layers/*.js + styles/*.js pair, then wiring
 *   into `layersList` and the fieldAliases/fieldImages/fieldLabels block
 *   below, following the same pattern as the layers already here.
 */

// Base layer.
var wms_layers = [];

var lyr_OpenStreetMap_0 = new ol.layer.Tile({
    title: 'OpenStreetMap',
    type: 'base',
    opacity: 1.0,
    source: new ol.source.XYZ({
        attributions: ' ',
        url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
    })
});

// Reserve boundary layer (data: layers/LosCedros_BoundaryLos_Cedros_boundary_1.js, generated from data/boundary.js).
var format_LosCedros_BoundaryLos_Cedros_boundary_1 = new ol.format.GeoJSON();
var features_LosCedros_BoundaryLos_Cedros_boundary_1 = format_LosCedros_BoundaryLos_Cedros_boundary_1.readFeatures(
    json_LosCedros_BoundaryLos_Cedros_boundary_1,
    { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' }
);
var jsonSource_LosCedros_BoundaryLos_Cedros_boundary_1 = new ol.source.Vector({
    attributions: ' '
});
jsonSource_LosCedros_BoundaryLos_Cedros_boundary_1.addFeatures(features_LosCedros_BoundaryLos_Cedros_boundary_1);
var lyr_LosCedros_BoundaryLos_Cedros_boundary_1 = new ol.layer.Vector({
    declutter: false,
    source: jsonSource_LosCedros_BoundaryLos_Cedros_boundary_1,
    style: style_LosCedros_BoundaryLos_Cedros_boundary_1,
    popuplayertitle: 'Los Cedros Boundary', // heading shown at the top of this layer's map click-popup
    interactive: true,
    title: '<img src="styles/legend/LosCedros_BoundaryLos_Cedros_boundary_1.png" /> Los Cedros Boundary ' // label + swatch shown in the Legend panel
});

// Scientific station layer (data: layers/Scientific_station_SHPScientificStationLocation_2.js, generated from data/station.js).
var format_Scientific_station_SHPScientificStationLocation_2 = new ol.format.GeoJSON();
var features_Scientific_station_SHPScientificStationLocation_2 = format_Scientific_station_SHPScientificStationLocation_2.readFeatures(
    json_Scientific_station_SHPScientificStationLocation_2,
    { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' }
);
var jsonSource_Scientific_station_SHPScientificStationLocation_2 = new ol.source.Vector({
    attributions: ' '
});
jsonSource_Scientific_station_SHPScientificStationLocation_2.addFeatures(features_Scientific_station_SHPScientificStationLocation_2);
var lyr_Scientific_station_SHPScientificStationLocation_2 = new ol.layer.Vector({
    declutter: false,
    source: jsonSource_Scientific_station_SHPScientificStationLocation_2,
    style: style_Scientific_station_SHPScientificStationLocation_2,
    popuplayertitle: 'Estación Científica', // heading shown at the top of this layer's map click-popup
    interactive: true,
    title: '<img src="styles/legend/Scientific_station_SHPScientificStationLocation_2.png" /> Estación Científica  — Scientific Station Location' // label + swatch shown in the Legend panel
});

// Communities layer (data: layers/Example_communities_3.js, generated from data/communities.js).
var format_Example_communities_3 = new ol.format.GeoJSON();
var features_Example_communities_3 = format_Example_communities_3.readFeatures(
    json_Example_communities_3,
    { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' }
);
var jsonSource_Example_communities_3 = new ol.source.Vector({
    attributions: ' '
});
jsonSource_Example_communities_3.addFeatures(features_Example_communities_3);
var lyr_Example_communities_3 = new ol.layer.Vector({
    declutter: false,
    source: jsonSource_Example_communities_3,
    style: style_Example_communities_3,
    popuplayertitle: 'Communities', // heading shown at the top of this layer's map click-popup
    interactive: true,
    title: '<img src="styles/legend/Example_communities_3.png" /> Communities' // label + swatch shown in the Legend panel
});

// Whether each layer is checked/visible by default when the page loads.
// Toggling a layer's checkbox in the Legend panel changes this at runtime;
// this just sets the starting state.
lyr_OpenStreetMap_0.setVisible(true);
lyr_LosCedros_BoundaryLos_Cedros_boundary_1.setVisible(true);
lyr_Scientific_station_SHPScientificStationLocation_2.setVisible(true);
lyr_Example_communities_3.setVisible(true);

// Draw order (first = bottom, last = top) AND the order layers are listed
// in the Legend panel. Reorder this array to change either.
var layersList = [
    lyr_OpenStreetMap_0,
    lyr_LosCedros_BoundaryLos_Cedros_boundary_1,
    lyr_Scientific_station_SHPScientificStationLocation_2,
    lyr_Example_communities_3
];

// Popup field config per layer: which feature properties show in the map
// click-popup, and how.
//   fieldAliases — { propertyKey: 'label shown before the value' }.
//     Only keys listed here ever show in the popup, in this order.
//   fieldImages  — { propertyKey: '' } marks a property as an image column
//     (unused by any property here — all left as '').
//   fieldLabels  — { propertyKey: 'no label' } shows just the raw value
//     with no "Alias:" prefix; anything else shows "alias: value".
// To ADD a field to a popup: the property must already exist in that
// layer's GeoJSON `properties` (built by layers/*.js from data/*.js —
// see resources/geojson-layer-helpers.js), then add matching entries to
// all three objects below for that layer.
// To REMOVE a field from a popup: delete its entry from all three.
// 'description' here is what layers/*.js's buildPointFeatureCollection()/
// buildLineFeatureCollection() fill with shortDescription (falling back to
// description) — see data/communities.js, data/station.js, data/boundary.js.
lyr_LosCedros_BoundaryLos_Cedros_boundary_1.set('fieldAliases', {
    fid: 'fid', id: 'id', Name: 'Name', description: 'description',
    timestamp: 'timestamp', begin: 'begin', end: 'end', altitudeMode: 'altitudeMode',
    tessellate: 'tessellate', extrude: 'extrude', visibility: 'visibility',
    drawOrder: 'drawOrder', icon: 'icon'
});
lyr_Scientific_station_SHPScientificStationLocation_2.set('fieldAliases', {
    fid: 'fid', id: 'id', Name: 'Name', description: 'description',
    timestamp: 'timestamp', begin: 'begin', end: 'end', altitudeMode: 'altitudeMode',
    tessellate: 'tessellate', extrude: 'extrude', visibility: 'visibility',
    drawOrder: 'drawOrder', icon: 'icon'
});
lyr_Example_communities_3.set('fieldAliases', {
    id: 'id', Community: 'Community', description: 'description'
});

lyr_LosCedros_BoundaryLos_Cedros_boundary_1.set('fieldImages', {
    fid: '', id: '', Name: '', description: '', timestamp: '', begin: '', end: '',
    altitudeMode: '', tessellate: '', extrude: '', visibility: '', drawOrder: '', icon: ''
});
lyr_Scientific_station_SHPScientificStationLocation_2.set('fieldImages', {
    fid: '', id: '', Name: '', description: '', timestamp: '', begin: '', end: '',
    altitudeMode: '', tessellate: '', extrude: '', visibility: '', drawOrder: '', icon: ''
});
lyr_Example_communities_3.set('fieldImages', {
    id: '', Community: '', description: ''
});

lyr_LosCedros_BoundaryLos_Cedros_boundary_1.set('fieldLabels', {
    fid: 'no label', id: 'no label', Name: 'no label', description: 'no label',
    timestamp: 'no label', begin: 'no label', end: 'no label', altitudeMode: 'no label',
    tessellate: 'no label', extrude: 'no label', visibility: 'no label',
    drawOrder: 'no label', icon: 'no label'
});
lyr_Scientific_station_SHPScientificStationLocation_2.set('fieldLabels', {
    fid: 'no label', id: 'no label', Name: 'no label', description: 'no label',
    timestamp: 'no label', begin: 'no label', end: 'no label', altitudeMode: 'no label',
    tessellate: 'no label', extrude: 'no label', visibility: 'no label',
    drawOrder: 'no label', icon: 'no label'
});
lyr_Example_communities_3.set('fieldLabels', {
    id: 'no label', Community: 'no label', description: 'no label'
});

// Keeps community marker icons crisp (prevents a semi-transparent
// compositing mode from blending them oddly against the base map).
// Cosmetic rendering tweak — leave as-is unless markers start looking off.
lyr_Example_communities_3.on('precompose', function (evt) {
    evt.context.globalCompositeOperation = 'normal';
});
