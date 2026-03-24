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
runFile('js/engines/general.js', ['analyzeDocument']);

const expected = JSON.parse(fs.readFileSync(path.join(base, 'test-data/expected-results.json'), 'utf8'));

function expectedTypePass(actual, expectedText) {
  const a = String(actual).toLowerCase();
  const e = String(expectedText).toLowerCase();
  if (e.includes(' or ')) return e.split(' or ').some(part => a.includes(part.trim()));
  if (e.includes('hybrid')) return a.includes('terms') || a.includes('api') || a.includes('technical') || a.includes('code');
  return a.includes(e);
}

const results = [];
let passed = 0;

for (const [file, exp] of Object.entries(expected)) {
  const raw = fs.readFileSync(path.join(base, 'test-data', file), 'utf8');
  const analysis = context.__exposed.analyzeDocument(raw, 'auto');
  const flags = analysis.flags.map(f => f.label);
  const missingFlags = (exp.expected_flags_contains || []).filter(label =>
    !flags.some(found => String(found).toLowerCase().includes(String(label).toLowerCase()))
  );
  const typePass = expectedTypePass(analysis.docType.label, exp.expected_doc_type);
  const pass = typePass && missingFlags.length === 0;
  if (pass) passed += 1;
  results.push({
    file,
    pass,
    expected_type: exp.expected_doc_type,
    actual_type: analysis.docType.label,
    confidence: analysis.docType.confidence,
    missing_flags: missingFlags,
    found_flags: flags
  });
}

const summary = { passed, total: results.length, failed: results.length - passed, results };
fs.writeFileSync(path.join(base, 'REGRESSION-RESULTS.json'), JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
