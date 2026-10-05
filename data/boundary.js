/*
 * Single source of truth for the Los Cedros reserve boundary outline.
 * Mirrors data/communities.js and data/station.js: the map pin/line data
 * in layers/LosCedros_BoundaryLos_Cedros_boundary_1.js, the story section
 * description, and (in the future) the boundary's fly-to waypoint are all
 * generated from this one object instead of being hand-duplicated.
 *
 * To rename the boundary, rewrite its description, or update its
 * outline, edit ONLY this file.
 *
 * coordinates: an ordered array of [longitude, latitude] vertices
 * (EPSG:4326 / WGS84) tracing the boundary line. Order matters — these
 * connect in sequence to form the outline. Typically re-exported wholesale
 * from QGIS rather than hand-edited one vertex at a time; see IMPORT.md.
 *
 * shortDescription / description: bilingual objects, { en: "...", es: "..." }.
 * `name` stays a plain string (not translated). See data/i18n.js for how
 * these are resolved to the visitor's current language (pickLang()) and
 * README.md for editing guidance.
 */
var boundary = {
    id: 1, // unique id number
    name: "Reserve outline", // display name (map popup title)
    // one line — shown in the map's click popup — { en, es }
    shortDescription: {
        en: "Los Cedros spans 6,400 hectares",
        es: "Los Cedros tiene un área de 6400 hectáreas"
    },
    // full text — shown in the "Los Cedros Boundary" story section — { en, es }
    description: {
        en: "Founded in 1988 by Josef Decoux and a team of scientists, researchers, and philanthropists from Ecuador and around the world. It spans 6,000 hectares of premontane rainforest and cloud forest. Of that, 200 hectares are former colonized land, while the rest is primary forest. It forms part of the southern buffer zone of the 220,000-hectare Cotacachi-Cayapas National Park. We sit within the Chocó and Tropical Andes phytogeographic region — among the most biologically diverse and highly endemic habitats on Earth.",
        es: "Fundada en 1988 por Josef Decoux y un equipo de científicos, investigadores y filántropos de Ecuador y varias partes del mundo. Consta de 6.000 hectáreas de selva tropical premontana y bosque nuboso. De ellas, 200 hectáreas son antiguas tierras colonizadas, mientras que el resto es bosque primario. Forma parte de la zona de amortiguación meridional del Parque Nacional Cotocachi-Cayapas, de 220 mil hectáreas. Nos encontramos en la Región Fitogeográfica del Chocó y los Andes Tropicales. Los hábitats biológicamente más diversos y altamente endémicos de la Tierra."
    },
    // ordered list of [longitude, latitude] vertices in decimal degrees (WGS84), tracing the outline in sequence
    coordinates: [
        [-78.817546, 0.386098], [-78.816491, 0.38648], [-78.812313, 0.384602], [-78.811301, 0.382935],
        [-78.809225, 0.383441], [-78.807877, 0.383335], [-78.805978, 0.382738], [-78.803915, 0.383087],
        [-78.803075, 0.382635], [-78.803133, 0.380196], [-78.802447, 0.38033], [-78.802283, 0.37837],
        [-78.80144, 0.37729], [-78.80036, 0.376606], [-78.800805, 0.375792], [-78.800022, 0.374268],
        [-78.800287, 0.372781], [-78.801356, 0.371718], [-78.801719, 0.36909], [-78.8028, 0.368401],
        [-78.803659, 0.368096], [-78.804532, 0.368562], [-78.805179, 0.36764], [-78.805774, 0.366358],
        [-78.807244, 0.365622], [-78.807106, 0.364382], [-78.80808, 0.364742], [-78.809385, 0.363345],
        [-78.809942, 0.363343], [-78.81046, 0.362595], [-78.811566, 0.3626], [-78.81251, 0.361799],
        [-78.811808, 0.360597], [-78.809799, 0.360367], [-78.804918, 0.358251], [-78.80355, 0.357526],
        [-78.802131, 0.357428], [-78.79792, 0.35201], [-78.796928, 0.35013], [-78.794959, 0.347942],
        [-78.793419, 0.345727], [-78.792481, 0.344236], [-78.792032, 0.342361], [-78.789445, 0.33921],
        [-78.789124, 0.337766], [-78.786016, 0.33552], [-78.785215, 0.335723], [-78.784041, 0.333952],
        [-78.781581, 0.329999], [-78.780443, 0.32791], [-78.780536, 0.326246], [-78.780242, 0.323049],
        [-78.777955, 0.319547], [-78.778052, 0.318229], [-78.777221, 0.317091], [-78.773822, 0.316962],
        [-78.772616, 0.315144], [-78.772937, 0.313065], [-78.772566, 0.312187], [-78.77217, 0.310985],
        [-78.770876, 0.311031], [-78.769403, 0.309953], [-78.768497, 0.308766], [-78.766977, 0.30805],
        [-78.766003, 0.305093], [-78.76667, 0.303801], [-78.766578, 0.301853], [-78.766281, 0.300548],
        [-78.766301, 0.299095], [-78.76505, 0.29799], [-78.76568, 0.295272], [-78.766231, 0.294884],
        [-78.766641, 0.294164], [-78.767457, 0.294708], [-78.768035, 0.293683], [-78.769785, 0.294215],
        [-78.771284, 0.29222], [-78.771644, 0.291028], [-78.772591, 0.289524], [-78.772709, 0.288563],
        [-78.77429, 0.286468], [-78.77626, 0.28541], [-78.778561, 0.286421], [-78.779709, 0.2868],
        [-78.782728, 0.288817], [-78.784706, 0.288709], [-78.787363, 0.290667], [-78.788663, 0.292308],
        [-78.789641, 0.292714], [-78.79098, 0.294603], [-78.793651, 0.296329], [-78.795739, 0.297944],
        [-78.797758, 0.297688], [-78.7985, 0.298723], [-78.799743, 0.298832], [-78.800817, 0.299424],
        [-78.801639, 0.299204], [-78.802408, 0.299962], [-78.803606, 0.300582], [-78.806409, 0.30175],
        [-78.808755, 0.300438], [-78.810028, 0.300317], [-78.811555, 0.299772], [-78.812477, 0.299374],
        [-78.814271, 0.299423], [-78.815304, 0.299127], [-78.819016, 0.298971], [-78.820589, 0.299603],
        [-78.822032, 0.299687], [-78.825008, 0.296938], [-78.82706, 0.294942], [-78.827526, 0.293844],
        [-78.831511, 0.292602], [-78.833153, 0.291627], [-78.833575, 0.293252], [-78.8334, 0.294361],
        [-78.83396, 0.295462], [-78.833297, 0.296241], [-78.833235, 0.300278], [-78.834842, 0.303455],
        [-78.834573, 0.306229], [-78.834945, 0.307629], [-78.836176, 0.3091], [-78.836537, 0.310422],
        [-78.836502, 0.311627], [-78.837218, 0.313449], [-78.839022, 0.313519], [-78.841277, 0.314768],
        [-78.842076, 0.315011], [-78.844613, 0.317238], [-78.846429, 0.316894], [-78.84833, 0.317021],
        [-78.849888, 0.318457], [-78.848796, 0.319541], [-78.848309, 0.321332], [-78.847258, 0.322369],
        [-78.846957, 0.325365], [-78.847289, 0.327287], [-78.84733, 0.327548], [-78.846955, 0.329317],
        [-78.845225, 0.331767], [-78.844873, 0.333939], [-78.844234, 0.336232], [-78.841823, 0.338658],
        [-78.837876, 0.344652], [-78.837666, 0.347771], [-78.83755, 0.347932], [-78.836072, 0.350831],
        [-78.837023, 0.35196], [-78.836641, 0.352912], [-78.836239, 0.355283], [-78.833749, 0.360312],
        [-78.833292, 0.362604], [-78.832268, 0.365066], [-78.828935, 0.3685], [-78.826746, 0.370926],
        [-78.827126, 0.372418], [-78.827731, 0.374565], [-78.826598, 0.373371], [-78.823393, 0.37358],
        [-78.822969, 0.373404], [-78.822319, 0.374293], [-78.82312, 0.375286], [-78.822501, 0.375949],
        [-78.822494, 0.376594], [-78.821672, 0.377365], [-78.821904, 0.378127], [-78.821767, 0.378811],
        [-78.822598, 0.379397], [-78.822093, 0.381398], [-78.821599, 0.387376], [-78.817764, 0.38605]
    ]
};
