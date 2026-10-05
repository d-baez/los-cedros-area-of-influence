#!/usr/bin/env node
/*
 * scripts/sync-communities-from-geojson.js
 *
 * Pulls updated coordinates out of a freshly re-exported QGIS communities
 * layer and patches them into data/communities.js — WITHOUT touching the
 * hand-written name/description/zoom/duration for communities that already
 * exist there, and WITHOUT reformatting the file.
 *
 * Usage:
 *   node scripts/sync-communities-from-geojson.js <path-to-new-export>
 *
 * <path-to-new-export> can be either:
 *   - a plain .geojson file (a FeatureCollection of points), or
 *   - a qgis2web-exported layer .js file, i.e. one line of
 *     `var json_Whatever = { ...FeatureCollection... };`
 *     (this is what QGIS + the qgis2web plugin produce)
 *
 * Matching rule: each incoming feature is matched to an existing
 * data/communities.js entry by comparing its name property
 * (tries "Community", "name", "Name", "NAME" in that order) against the
 * `name` field already in data/communities.js, case-insensitively and
 * trimmed. This means renaming a community in data/communities.js first
 * will break the match for that one — rename AFTER syncing, or sync by id
 * order instead if the QGIS attribute table doesn't carry names.
 *
 *   - Matched communities: only `coordinates` is updated in place.
 *   - Unmatched incoming features: appended as NEW community entries
 *     (next available id, name/description left as TODO placeholders —
 *     fill those in by hand).
 *   - Existing communities.js entries with no match in the new export:
 *     left completely untouched, but reported so you can confirm whether
 *     that community was dropped intentionally.
 *
 * This is a dry-run-first tool: it always prints a summary before writing.
 * Pass --dry-run to only print the summary without writing the file.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const inputPath = args.find(function (a) { return !a.startsWith('--'); });

if (!inputPath) {
    console.error('Usage: node scripts/sync-communities-from-geojson.js <path-to-new-export> [--dry-run]');
    process.exit(1);
}

function extractFeatureCollection(text) {
    const trimmed = text.trim();
    if (trimmed.startsWith('{')) {
        return JSON.parse(trimmed);
    }
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start === -1 || end === -1) {
        throw new Error('Could not find a JSON object in ' + inputPath);
    }
    return JSON.parse(text.slice(start, end + 1));
}

function readCommunityName(props) {
    const candidates = ['Community', 'name', 'Name', 'NAME'];
    for (const key of candidates) {
        if (props && typeof props[key] === 'string' && props[key].trim()) {
            return props[key].trim();
        }
    }
    return null;
}

const raw = fs.readFileSync(inputPath, 'utf8');
const fc = extractFeatureCollection(raw);
if (!fc || fc.type !== 'FeatureCollection' || !Array.isArray(fc.features)) {
    throw new Error('Expected a GeoJSON FeatureCollection, got something else from ' + inputPath);
}

const incoming = fc.features
    .filter(function (f) { return f.geometry && f.geometry.type === 'Point'; })
    .map(function (f) {
        return { name: readCommunityName(f.properties), coordinates: f.geometry.coordinates };
    });

const communitiesPath = path.join(__dirname, '..', 'data', 'communities.js');
let src = fs.readFileSync(communitiesPath, 'utf8');

const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(src, sandbox, { filename: communitiesPath });
const communities = sandbox.communities;
if (!Array.isArray(communities)) {
    throw new Error('data/communities.js did not define a `communities` array as expected');
}

const matchedIds = new Set();
const updates = []; // { id, name, oldCoordinates, newCoordinates }
const unmatchedIncoming = [];

incoming.forEach(function (item) {
    if (!item.name) {
        unmatchedIncoming.push(item);
        return;
    }
    const existing = communities.find(function (c) {
        return c.name.trim().toLowerCase() === item.name.toLowerCase();
    });
    if (existing) {
        matchedIds.add(existing.id);
        const changed = JSON.stringify(existing.coordinates) !== JSON.stringify(item.coordinates);
        if (changed) {
            updates.push({
                id: existing.id,
                name: existing.name,
                oldCoordinates: existing.coordinates,
                newCoordinates: item.coordinates
            });
        }
    } else {
        unmatchedIncoming.push(item);
    }
});

const droppedExisting = communities.filter(function (c) {
    return !matchedIds.has(c.id);
});

// --- Apply coordinate updates in place, preserving formatting/comments ---
updates.forEach(function (u) {
    const idBlockRe = new RegExp(
        '(id:\\s*' + u.id + ',[\\s\\S]*?coordinates:\\s*)(null|\\[[^\\]]*\\])',
        'm'
    );
    const newCoordsLiteral = JSON.stringify(u.newCoordinates);
    if (!idBlockRe.test(src)) {
        console.warn('Could not locate id: ' + u.id + ' block in data/communities.js — skipped patching it.');
        return;
    }
    src = src.replace(idBlockRe, function (_, prefix) {
        return prefix + newCoordsLiteral;
    });
});

// --- Append brand-new communities found in the export but not yet tracked ---
if (unmatchedIncoming.length) {
    const maxId = communities.reduce(function (max, c) { return Math.max(max, c.id); }, 0);
    const newEntries = unmatchedIncoming.map(function (item, i) {
        const id = maxId + i + 1;
        const name = item.name || ('Community ' + id);
        return [
            '    {',
            '        id: ' + id + ',',
            '        name: ' + JSON.stringify(name) + ', // TODO: confirm real community name',
            '        coordinates: ' + JSON.stringify(item.coordinates) + ',',
            '        zoom: 16,',
            '        duration: 1200,',
            '        // one line — shown in the map\'s click popup — { en, es } — TODO: fill in',
            '        shortDescription: { en: "", es: "" },',
            '        // full text — shown in the story section — { en, es } — TODO: fill in',
            '        description: { en: "", es: "" }',
            '    }'
        ].join('\n');
    });
    const insertion = ',\n' + newEntries.join(',\n');
    const closingArrayRe = /\n\];\s*$/;
    if (closingArrayRe.test(src)) {
        src = src.replace(closingArrayRe, insertion + '\n];\n');
    } else {
        console.warn('Could not find the closing "];" of the communities array — new entries were NOT appended. Add them manually:\n' + newEntries.join(',\n'));
    }
}

// --- Report ---
console.log('--- sync-communities-from-geojson report ---');
console.log('Incoming features:', incoming.length);
console.log('Updated coordinates:', updates.length);
updates.forEach(function (u) {
    console.log('  #' + u.id, u.name, JSON.stringify(u.oldCoordinates), '->', JSON.stringify(u.newCoordinates));
});
console.log('New communities appended:', unmatchedIncoming.length);
unmatchedIncoming.forEach(function (item) {
    console.log('  +', item.name || '(unnamed feature)', JSON.stringify(item.coordinates), '— fill in name/description manually');
});
console.log('Existing communities NOT present in this export (left untouched):', droppedExisting.length);
droppedExisting.forEach(function (c) {
    console.log('  ?', c.name, '(id ' + c.id + ')');
});

if (dryRun) {
    console.log('\n--dry-run passed — data/communities.js was NOT written.');
} else if (!updates.length && !unmatchedIncoming.length) {
    console.log('\nNothing changed — data/communities.js was not rewritten.');
} else {
    fs.writeFileSync(communitiesPath, src);
    console.log('\ndata/communities.js updated.');
}
