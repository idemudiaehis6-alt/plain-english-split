
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const base = __dirname;
const context = { console };
vm.createContext(context);

function runFile(relPath, exposeNames = []) {
  let code = fs.readFileSync(path.join(base, relPath), 'utf8');
  if (exposeNames.length) {
    code += `\nthis.__exposed = Object.assign(this.__exposed || {}, { ${exposeNames.join(', ')} });`;
  }
  vm.runInContext(code, context, { filename: relPath });
}

runFile('js/data/jargon.js', ['JARGON']);
runFile('js/data/redFlags.js', ['RED_FLAGS']);
runFile('js/data/docTypes.js', ['DOC_TYPES']);
runFile('js/engines/general.js', ['analyzeDocument', 'getContentProfile', 'shouldRouteToCode', 'detectDocType']);

for (const file of ['01_terms_of_service.txt', '09_api_reference.txt']) {
  const raw = fs.readFileSync(path.join(base, 'test-data', file), 'utf8');
  const profile = context.__exposed.getContentProfile(raw);
  const routeToCode = context.__exposed.shouldRouteToCode(raw, profile, 'auto');
  const docType = context.__exposed.detectDocType(raw, 'auto');
  const analysis = context.__exposed.analyzeDocument(raw, 'auto');
  console.log(JSON.stringify({
    file,
    routeToCode,
    dominant: profile.dominant,
    normalized: profile.normalized,
    docType: docType.label,
    flags: analysis.flags.map(f => ({label: f.label, match: f.match}))
  }, null, 2));
}
