/*
 * Single source of truth for the scientific station (La Estación
 * Científica Los Cedros). Mirrors data/communities.js: everything about
 * the station that used to be hand-duplicated — the map pin data in
 * layers/Scientific_station_SHPScientificStationLocation_2.js, the map
 * "fly to" waypoint, and the story section text in index.html — is now
 * generated from this one object at load time.
 *
 * To rename the station, move it, or rewrite its description, edit ONLY
 * this file.
 *
 * coordinates: [longitude, latitude] in EPSG:4326 (WGS84).
 *
 * shortDescription / description: bilingual objects, { en: "...", es: "..." }.
 * `name` stays a plain string (not translated). See data/i18n.js for how
 * these are resolved to the visitor's current language (pickLang()) and
 * README.md for editing guidance.
 */
var station = {
    id: 1, // unique id number
    name: "Estacíon Científica Los Cedros", // display name (map popup title + story heading)
    coordinates: [-78.779360, 0.308730], // [longitude, latitude] in decimal degrees (WGS84)
    zoom: 16, // map zoom level for the "fly to" (higher = closer)
    duration: 1200, // "fly to" animation duration, in milliseconds
    // one line — shown in the map's click popup — { en, es } — TODO: confirm/edit; drafted by condensing the description below
    shortDescription: {
        en: "Los Cedros Scientific Station: a 6,400-hectare reserve in the Toisán range, Cotacachi canton, Ecuador.",
        es: "Estación Científica Los Cedros: reserva de 6,400 hectáreas en la Cordillera del Toisán, cantón Cotacachi, Ecuador."
    },
    // full text — shown in the story section — { en, es } (use "\n" or string concatenation for multiple paragraphs)
    description: {
        en: "Los Cedros covers an area of 6,400 hectares in northwestern Ecuador, in Imbabura province, Cotacachi canton, García Moreno parish. It sits in the Toisán mountain range, where the biodiverse Chocó and Tropical Andes ecoregions meet. \n" +
            "To the west it borders Cotacachi-Cayapas National Park. The Magdalena, Manduriaco Grande, Verde, and Manduriaco Chico rivers all have their headwaters in Los Cedros, flowing into the Guayllabamba River within the Esmeraldas River watershed.",
        es: "Los Cedros tiene un área de 6400 hectáreas, situado en el noroccidente de Ecuador en la  provincia de Imbabura, cantón Cotacachi, parroquia García Moreno.  Se encuentra en la  Cordillera del Toisán, en donde se unen las ecorregiones del Chocó y Andes Tropicales, caracterizadas por su gran biodiversidad. \n" +
            "Al Occidente colinda con el Parque Nacional Cotacachi Cayapas.  Las microcuencas que tienen sus nacientes en Los Cedros son de los ríos Magdalena,  Manduriaco Grande, Verde y Manduriaco Chico, que desembocan en el río Guayllabamba de la cuenca hídrica del río Esmeraldas."
    }
};
