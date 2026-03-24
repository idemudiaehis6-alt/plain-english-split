
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
runFile('js/engines/general.js', ['getContentProfile','shouldRouteToCode','detectDocType','analyzeDocument']);

function inspect(file) {
  const raw = fs.readFileSync(path.join(base, 'test-data', file), 'utf8');
  const profile = context.__exposed.getContentProfile(raw);
  const analysis = context.__exposed.analyzeDocument(raw, 'auto');
  return {
    file,
    normalized: profile.normalized,
    routeToCode: context.__exposed.shouldRouteToCode(raw, profile, 'auto'),
    docType: analysis.docType.label,
    confidence: analysis.docType.confidence,
    flags: analysis.flags.map(f => ({label:f.label, match:f.match}))
  };
}

console.log(JSON.stringify({
  tos: inspect('01_terms_of_service.txt'),
  api: inspect('09_api_reference.txt'),
  redFlagPatterns: context.__exposed.RED_FLAGS ? context.__exposed.RED_FLAGS.length : null
}, null, 2));
