/*
 * Single source of truth for the communities surrounding the Los Cedros
 * reserve. Everything that used to be duplicated by hand — the map pin
 * data in layers/Example_communities_3.js AND the WAYPOINTS array in
 * index.html — is now generated from this one array at load time.
 *
 * To move/rename/add/remove a community, edit ONLY this file:
 *   - layers/Example_communities_3.js builds its GeoJSON from `coordinates`.
 *   - index.html builds WAYPOINTS + the scroll-story sections from
 *     `coordinates`, `zoom`, `name`, and `description`.
 *
 * There are 11 communities total surrounding the reserve. Coordinates and
 * copy are only confirmed for 4 of them so far (carried over from the
 * original qgis2web export) — the remaining 7 are placeholders flagged
 * TODO below and are skipped when building the map layer/waypoints until
 * real coordinates are filled in.
 *
 * coordinates: [longitude, latitude] in EPSG:4326 (WGS84), or null if not
 * yet known.
 *
 * shortDescription / description: bilingual objects, { en: "...", es: "..." }.
 * `name` stays a plain string (place names aren't translated). See
 * data/i18n.js for how these are resolved to the visitor's current
 * language (pickLang()) and README.md for editing guidance.
 */
var communities = [
    {
        id: 1, // unique id number
        name: "Magdelena Alto", // display name (map popup title + story heading)
        coordinates: [-78.78019719807584, 0.368707327484827], // [longitude, latitude] in decimal degrees (WGS84)  TODO: Update coordinates
        zoom: 16, // map zoom level for the "fly to" (higher = closer)
        duration: 1200, // "fly to" animation duration, in milliseconds
        // one line — shown in the map's click popup — { en, es } — TODO: fill in
        shortDescription: { en: "", es: "" },
        // full text — shown in the story section — { en, es } — TODO: fill in
        description: { en: "Magdelena Alto - en bio ", es: "Magdelena Alto - es bio " }
    },
    {
        id: 2, // unique id number
        name: "Cielo Verde", // display name (map popup title + story heading)
        coordinates: [-78.77440627419827, 0.335772070784225], // [longitude, latitude] in decimal degrees (WGS84) - TODO: Update coordinates
        zoom: 16, // map zoom level for the "fly to" (higher = closer)
        duration: 1200, // "fly to" animation duration, in milliseconds
        // one line — shown in the map's click popup — { en, es } — TODO: fill in
        shortDescription: { en: "", es: "" },
        // full text — shown in the story section — { en, es } — TODO: fill in
        description: { en: "Cielo Verde - en bio ", es: "Cielo Verde - es bio " }
    },
    {
        id: 3, // unique id number
        name: "Magdelena Bajo", // display name (map popup title + story heading)
        coordinates: [-78.752871276028628, 0.312970673573975], // [longitude, latitude] in decimal degrees (WGS84)
        zoom: 16, // map zoom level for the "fly to" (higher = closer)
        duration: 1200, // "fly to" animation duration, in milliseconds
        // one line — shown in the map's click popup — { en, es } — TODO: fill in
        shortDescription: { en: "Magdelena Bajo - en short description", es: "Magdelena Bajo - es short description" },
        // full text — shown in the story section — { en, es } — TODO: fill in
        description: { en: "Magdelena Bajo - en bio ", es: "Magdelena Bajo - es bio " }
    },
    {
        id: 4, // unique id number
        name: "Brilla sol", // display name (map popup title + story heading)
        coordinates: [-78.885519626098855, 0.324190415127841], // [longitude, latitude] in decimal degrees (WGS84)
        zoom: 16, // map zoom level for the "fly to" (higher = closer)
        duration: 1200, // "fly to" animation duration, in milliseconds
        // one line — shown in the map's click popup — { en, es } — TODO: fill in
        shortDescription: { en: "Brilla sol - en short description", es: "Brilla sol - es short description" },
        // full text — shown in the story section — { en, es } — TODO: fill in
        description: { en: "Brilla sol - en bio ", es: "Brilla sol - es bio " }
    },
    {
        id: 5, // unique id number
        name: "Chontal", // display name (map popup title + story heading)
        coordinates: null, // [longitude, latitude] in decimal degrees (WGS84) — null if not yet known
        zoom: 16, // map zoom level for the "fly to" (higher = closer)
        duration: 1200, // "fly to" animation duration, in milliseconds
        // one line — shown in the map's click popup — { en, es } — TODO: fill in
        shortDescription: { en: "Chontal - en short description", es: "Chontal - es short description" },
        // full text — shown in the story section — { en, es } — TODO: fill in
        description: { en: "Chontal - en bio ", es: "Chontal - es bio " }
    },
    {
        id: 6, // unique id number
        name: "El Paraíso", // display name (map popup title + story heading)
        coordinates: null, // [longitude, latitude] in decimal degrees (WGS84) — null if not yet known
        zoom: 16, // map zoom level for the "fly to" (higher = closer)
        duration: 1200, // "fly to" animation duration, in milliseconds
        // one line — shown in the map's click popup — { en, es } — TODO: fill in
        shortDescription: { en: "El Paraíso - en short description", es: "El Paraíso - es short description" },
        // full text — shown in the story section — { en, es } — TODO: fill in
        description: { en: "El Paraíso - en bio ", es: "El Paraíso - es bio " }
    },
    {
        id: 7, // unique id number
        name: "El Corazon", // display name (map popup title + story heading)
        coordinates: null, // [longitude, latitude] in decimal degrees (WGS84) — null if not yet known
        zoom: 16, // map zoom level for the "fly to" (higher = closer)
        duration: 1200, // "fly to" animation duration, in milliseconds
        // one line — shown in the map's click popup — { en, es } — TODO: fill in
        shortDescription: { en: "El Corazon - en short description", es: "El Corazon - es short description" },
        // full text — shown in the story section — { en, es } — TODO: fill in
        description: { en: "El Corazon - en bio ", es: "El Corazon - es bio " }
    },
    {
        id: 8, // unique id number
        name: "Pueblo Unido", // display name (map popup title + story heading)
        coordinates: null, // [longitude, latitude] in decimal degrees (WGS84) — null if not yet known
        zoom: 16, // map zoom level for the "fly to" (higher = closer)
        duration: 1200, // "fly to" animation duration, in milliseconds
        // one line — shown in the map's click popup — { en, es } — TODO: fill in
        shortDescription: { en: "Pueblo Unido - en short description", es: "Pueblo Unido - es short description" },
        // full text — shown in the story section — { en, es } — TODO: fill in
        description: { en: "Pueblo Unido - en bio ", es: "Pueblo Unido - es bio " }
    },
    {
        id: 9, // unique id number
        name: "Rio Verde", // display name (map popup title + story heading)
        coordinates: null, // [longitude, latitude] in decimal degrees (WGS84) — null if not yet known
        zoom: 16, // map zoom level for the "fly to" (higher = closer)
        duration: 1200, // "fly to" animation duration, in milliseconds
        // one line — shown in the map's click popup — { en, es } — TODO: fill in
        shortDescription: { en: "Rio Verde - en short description", es: "Rio Verde - es short description" },
        // full text — shown in the story section — { en, es } — TODO: fill in
        description: { en: "Rio Verde - en bio ", es: "Rio Verde - es bio " }
    },
    {
        id: 10, // unique id number
        name: "Santa Rosa de Manduriaco", // display name (map popup title + story heading)
        coordinates: null, // [longitude, latitude] in decimal degrees (WGS84) — null if not yet known
        zoom: 16, // map zoom level for the "fly to" (higher = closer)
        duration: 1200, // "fly to" animation duration, in milliseconds
        // one line — shown in the map's click popup — { en, es } — TODO: fill in
        shortDescription: { en: "Santa Rosa de Manduriaco - en short description", es: "Santa Rosa de Manduriaco - es short description" },
        // full text — shown in the story section — { en, es } — TODO: fill in
        description: { en: "Santa Rosa de Manduriaco - en bio ", es: "Santa Rosa de Manduriaco - es bio " }
    },
    // {   Community template for future use — uncomment and fill in when ready
    //     id: 11, // unique id number
    //     name: "Community 11", // display name (map popup title + story heading) — TODO: replace with real community name
    //     coordinates: null, // [longitude, latitude] in decimal degrees (WGS84) — null if not yet known
    //     zoom: 16, // map zoom level for the "fly to" (higher = closer)
    //     duration: 1200, // "fly to" animation duration, in milliseconds
    //     shortDescription: { en: "", es: "" }, // one line — shown in the map's click popup — { en, es } — TODO: fill in
    //     description: { en: "", es: "" } // full text — shown in the story section — { en, es } — TODO: fill in
    // }
];
