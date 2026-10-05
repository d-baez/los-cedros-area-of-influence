/*
 * Language support (English / Spanish) for the site.
 *
 * Two different kinds of text are localized here:
 *
 * 1. SITE CHROME — fixed UI strings (masthead, the overview/boundary
 *    section headings, the "Legend" button, etc.) that don't come from
 *    data/*.js. Edit the `translations` object below to change this copy.
 *
 * 2. PLACE CONTENT — `name`, `shortDescription`, and `description` in
 *    data/communities.js, data/station.js, and data/boundary.js. `name`
 *    stays a plain string (place names generally aren't translated), but
 *    `shortDescription`/`description` are objects: `{ en: "...", es: "..." }`.
 *    Use `pickLang(field)` (below) anywhere you need to resolve one of
 *    those to plain text for the current language.
 *
 * CURRENT_LANG defaults to the browser's language (falls back to English
 * for anything that isn't Spanish), then remembers the user's choice via
 * localStorage once they use the EN/ES toggle in the header.
 */

var translations = {
    en: {
        eyebrow: "Los Cedros Scientific Station",
        title: "Los Cedros Area of Influence",
        dek: "Scroll to move through each surrounding community — the map follows along with each section.",
        legend: "Legend",
        overviewStepLabel: "01 — The Forest Community",
        overviewHeading: "Los Cedros Area of Influence",
        overviewBody: "The Los Cedros Protected Forest sits within the area of influence of 10 rural communities, all part of the García Moreno parish in Cotacachi canton: Brillasol, Magdalena Alto, Chontal, San José de Magdalena, El Paraíso, Río Verde, El Corazón, Pueblo Unido, Cielo Verde, and Santa Rosa de Manduriaco. The 10 communities form the Forest Co-Administration Committee, with two representatives elected from each community every 5 years. The communities are home to around 700 families, roughly 2,800 people. The economy is mainly agricultural, centered on growing plantains, corn, and fruit, and raising livestock.",
        boundaryStepLabel: "02 — Los Cedros Boundary",
        boundaryHeading: "The protected boundary",
        stationStepLabel: "03 — Scientific Station"
    },
    es: {
        eyebrow: "Estación Científica Los Cedros",
        title: "Los Cedros Área de Influencia",
        dek: "Desplázate para recorrer cada comunidad vecina — el mapa te acompaña en cada sección.",
        legend: "Leyenda",
        overviewStepLabel: "01 — La Comunidad del Bosque",
        overviewHeading: "Los Cedros Área de Influencia",
        overviewBody: "El Bosque Protector Los Cedros se encuentra en área de influencia de 10 comunidades campesinas, todas pertenecientes a la parroquia García Moreno del cantón Cotacachi: Brillasol, Magdalena Alto, Chontal, San José de Magdalena, El Paraíso, Río Verde, El Corazón, Pueblo Unido, Cielo Verde y Santa Rosa de Manduriacos. Las 10 comunidades forman parte del Comité de Coadministración del Bosque Protector, con dos representantes por cada una, elegidos cada 5 años. La población de las comunidades asciende a alrededor de 700 familias, unas 2800 personas. La economía es principalmente campesina que dedican al cultivo de plátano, maíz, frutas y a la cría de ganado.",
        boundaryStepLabel: "02 — Límite de Los Cedros",
        boundaryHeading: "El límite protegido",
        stationStepLabel: "03 — Estación Científica"
    }
};

// Detect a starting language: remembered choice > browser language > English.
function detectLanguage() {
    try {
        var saved = localStorage.getItem('lang');
        if (saved === 'en' || saved === 'es') return saved;
    } catch (e) { /* localStorage unavailable (private mode, etc.) — ignore */ }
    var browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    return browserLang.indexOf('es') === 0 ? 'es' : 'en';
}

var CURRENT_LANG = detectLanguage();

// Resolves a bilingual data field ({ en, es }) to a plain string for the
// current language, falling back to whichever language IS filled in.
// Safe to call with a plain string too (returns it unchanged) or with
// null/undefined (returns '').
function pickLang(field) {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[CURRENT_LANG] || field.es || field.en || '';
}
