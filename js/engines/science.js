// ════════════════════════════════════════════════════════════
// SCIENTIFIC NAMING ENGINE
// ════════════════════════════════════════════════════════════
const SCI_KNOWN = {
  'homo sapiens':{plain:'Modern human being',bd:'Homo (Latin: "same / man" — human genus) + sapiens (Latin: "wise, knowing")'},
  'homo erectus':{plain:'An extinct early human ancestor who walked upright',bd:'Homo (human genus) + erectus (Latin: "upright, standing")'},
  'homo habilis':{plain:'An early human ancestor known for using tools',bd:'Homo (human genus) + habilis (Latin: "able, handy, skillful")'},
  'canis lupus familiaris':{plain:'Domestic dog',bd:'Canis (Latin: "dog") + lupus (Latin: "wolf") + familiaris (Latin: "of the household")'},
  'canis lupus':{plain:'Grey wolf',bd:'Canis (Latin: "dog") + lupus (Latin: "wolf")'},
  'felis catus':{plain:'Domestic cat',bd:'Felis (Latin: "cat") + catus (Latin: "clever, knowing")'},
  'felis silvestris':{plain:'European wildcat',bd:'Felis (cat) + silvestris (Latin: "of the forest, wild")'},
  'mus musculus':{plain:'House mouse — the most common lab mouse',bd:'Mus (Latin: "mouse") + musculus (Latin: "little mouse")'},
  'rattus norvegicus':{plain:'Norway rat — the common lab rat',bd:'Rattus (rat) + norvegicus (Latin: "of Norway")'},
  'drosophila melanogaster':{plain:'Common fruit fly — a cornerstone of genetics research',bd:'Droso (Greek: "dew, moisture") + phila (Greek: "loving") + melano (Greek: "black") + gaster (Greek: "belly, stomach")'},
  'escherichia coli':{plain:'E. coli — bacteria found in the gut; also a key research organism',bd:'Escherichia (named after scientist Theodor Escherich) + coli (Latin: "of the colon")'},
  'pan troglodytes':{plain:'Chimpanzee — our closest living relative',bd:'Pan (Greek deity / Greek: "all") + troglodytes (Greek: "cave dweller")'},
  'pan paniscus':{plain:'Bonobo — also a close human relative, known for social intelligence',bd:'Pan (Greek: "all/deity") + paniscus (Latin: "small Pan/faun")'},
  'gorilla gorilla':{plain:'Western gorilla — largest living primate',bd:'Gorilla × 2 — from Ancient Greek "Gorillai", a tribe of hairy beings in ancient records'},
  'panthera leo':{plain:'Lion',bd:'Panthera (Greek: "all beast, large cat") + leo (Latin and Greek: "lion")'},
  'panthera tigris':{plain:'Tiger',bd:'Panthera (all beast) + tigris (Greek/Old Persian: "tiger")'},
  'panthera pardus':{plain:'Leopard',bd:'Panthera (all beast) + pardus (Greek: "leopard, spotted cat")'},
  'panthera onca':{plain:'Jaguar',bd:'Panthera (all beast) + onca (Portuguese: "lynx")'},
  'elephas maximus':{plain:'Asian elephant',bd:'Elephas (Greek and Latin: "elephant") + maximus (Latin: "the greatest, largest")'},
  'loxodonta africana':{plain:'African savanna elephant — the largest land animal',bd:'Loxo (Greek: "oblique, slanted") + odonta (Greek: "teeth") + africana (of Africa) — named for the slanted ridges on their teeth'},
  'apis mellifera':{plain:'Western honey bee',bd:'Apis (Latin: "bee") + melli (Latin: "honey") + fera (Latin: "wild, bearer")'},
  'aedes aegypti':{plain:'Yellow fever mosquito — also spreads dengue and Zika',bd:'Aedes (Greek: "unpleasant, hateful") + aegypti (Latin: "of Egypt")'},
  'anopheles gambiae':{plain:'Malaria-transmitting mosquito — the main vector in Africa',bd:'Anopheles (Greek: "harmful, useless") + gambiae (of Gambia, West Africa)'},
  'saccharomyces cerevisiae':{plain:'Baker\'s yeast / brewer\'s yeast — used in bread and beer',bd:'Saccharo (Greek: "sugar") + myces (Greek: "fungus") + cerevisiae (Latin: "of beer, of ale")'},
  'zea mays':{plain:'Maize (corn)',bd:'Zea (Greek grain plant) + mays (from Taíno "mahiz" — the indigenous name for corn)'},
  'solanum lycopersicum':{plain:'Tomato',bd:'Solanum (Latin: "soothing plant") + lyco (Greek: "wolf") + persicum (Latin: "peach") — historically called "wolf peach"'},
  'solanum tuberosum':{plain:'Potato',bd:'Solanum (soothing plant) + tuberosum (Latin: "full of bumps, tuberous")'},
  'coffea arabica':{plain:'Arabica coffee plant',bd:'Coffea (from Arabic "qahwa") + arabica (Latin: "of Arabia")'},
  'camellia sinensis':{plain:'Tea plant — source of green, black, and white tea',bd:'Camellia (named after botanist Georg Kamel) + sinensis (Latin: "of China")'},
  'mycobacterium tuberculosis':{plain:'The bacterium that causes tuberculosis (TB)',bd:'Myco (Greek: "fungus" — because it grows like a fungus) + bacterium + tuberculum (Latin: "small lump") — named for the lumps it forms in the lungs'},
  'staphylococcus aureus':{plain:'Staph bacteria — a common cause of skin infections',bd:'Staphylo (Greek: "bunch of grapes" — its clustered shape) + coccus (Greek: "berry, sphere") + aureus (Latin: "golden") — golden-yellow when grown in a lab'},
  'streptococcus pyogenes':{plain:'Strep bacteria — causes strep throat and scarlet fever',bd:'Strepto (Greek: "twisted, chain-like") + coccus (sphere) + pyogenes (Greek: "pus-producing")'},
  'yersinia pestis':{plain:'The bacterium that caused the Black Death (bubonic plague)',bd:'Yersinia (named after Alexandre Yersin, who discovered it) + pestis (Latin: "plague, pestilence")'},
  'plasmodium falciparum':{plain:'The most dangerous malaria-causing parasite',bd:'Plasma (Greek: "something formed, molded") + falci (Latin: "sickle") + parum (Latin: "little") — named for its sickle shape in red blood cells'},
  // Chemicals
  'h2o':{plain:'Water',bd:'H (hydrogen, 2 atoms) + O (oxygen, 1 atom) — two hydrogen atoms bonded to one oxygen'},
  'co2':{plain:'Carbon dioxide — the gas exhaled in breathing, and a greenhouse gas',bd:'C (carbon, 1 atom) + O2 (oxygen, 2 atoms)'},
  'o2':{plain:'Oxygen gas — what we breathe to survive',bd:'O (oxygen) × 2 atoms bonded together as a molecule'},
  'n2':{plain:'Nitrogen gas — makes up 78% of the air we breathe',bd:'N (nitrogen) × 2 atoms bonded together'},
  'nacl':{plain:'Table salt — sodium chloride',bd:'Na (sodium, from Latin "natrium") + Cl (chlorine)'},
  'c6h12o6':{plain:'Glucose — the primary sugar your cells use for energy',bd:'C (carbon ×6) + H (hydrogen ×12) + O (oxygen ×6) — all living things use this for fuel'},
  'ch4':{plain:'Methane — the main component of natural gas',bd:'C (carbon ×1) + H (hydrogen ×4)'},
  'c2h5oh':{plain:'Ethanol — the alcohol in drinks',bd:'C (carbon ×2) + H (hydrogen ×5) + OH (hydroxyl group — the "alcohol" part)'},
  'nh3':{plain:'Ammonia — used in cleaning products and fertilizers',bd:'N (nitrogen ×1) + H (hydrogen ×3)'},
  'h2so4':{plain:'Sulfuric acid — a very corrosive industrial acid',bd:'H (hydrogen ×2) + S (sulfur ×1) + O (oxygen ×4)'},
  'hcl':{plain:'Hydrochloric acid — also found in your stomach helping digest food',bd:'H (hydrogen ×1) + Cl (chlorine ×1)'},
  'naoh':{plain:'Sodium hydroxide — also called lye or caustic soda',bd:'Na (sodium) + O (oxygen) + H (hydrogen)'},
  'caco3':{plain:'Calcium carbonate — the main component of chalk, limestone, and seashells',bd:'Ca (calcium) + C (carbon) + O3 (oxygen ×3)'},
  'fe2o3':{plain:'Iron(III) oxide — rust',bd:'Fe (iron, from Latin "ferrum" ×2) + O (oxygen ×3)'},
  'sio2':{plain:'Silicon dioxide — the main ingredient of sand and glass',bd:'Si (silicon ×1) + O (oxygen ×2)'},
  // Acronyms
  'dna':{plain:'Deoxyribonucleic acid — the molecule that stores your genetic information',bd:'Deoxy (missing one oxygen compared to RNA) + ribo (ribose sugar) + nucleic (found in the nucleus) + acid'},
  'rna':{plain:'Ribonucleic acid — reads DNA and helps make proteins',bd:'Ribo (ribose sugar) + nucleic (in the nucleus) + acid — similar to DNA but single-stranded'},
  'atp':{plain:'Adenosine triphosphate — the universal energy currency of living cells',bd:'Adenosine (a nucleoside) + tri (three) + phosphate (a phosphorus-oxygen group) — releasing one phosphate releases energy'},
  'mrna':{plain:'Messenger RNA — carries protein-building instructions from DNA to ribosomes',bd:'Messenger + RNA (ribonucleic acid) — "reads" the gene and takes the message to where proteins are made'},
  'pcr':{plain:'Polymerase Chain Reaction — a technique to copy a specific piece of DNA millions of times',bd:'Polymerase (the enzyme that copies DNA) + Chain (the process repeats in cycles) + Reaction (a chemical process)'},
  'bmi':{plain:'Body Mass Index — a rough measure of body size relative to height',bd:'Body weight (in kg) divided by height (in meters) squared — widely used but criticized for ignoring body composition'},
  'iq':{plain:'Intelligence Quotient — a score from standardized cognitive tests',bd:'Intelligence (mental ability) + Quotient (the result of dividing one number by another) — originally: mental age ÷ chronological age × 100'},
  'hiv':{plain:'Human Immunodeficiency Virus — the virus that causes AIDS',bd:'Human (affects humans) + Immuno (immune system) + Deficiency (weakening) + Virus'},
  'covid':{plain:'Coronavirus disease — specifically COVID-19 caused by SARS-CoV-2',bd:'CO (corona) + VI (virus) + D (disease) + 19 (first identified in 2019)'},
};

const SCI_PREFIXES_LIST = [
  ['anthropo','relating to humans'],['pharmaco','drug or medicine'],['cardio','heart'],
  ['gastro','stomach'],['hepato','liver'],['nephro','kidney'],['electro','electricity'],
  ['neuro','nerve or nervous system'],['pneumo','lung or air'],['physio','natural function'],
  ['immuno','immune system'],['onco','tumor or cancer'],['ophthalmo','eye'],
  ['osteo','bone'],['micro','very small'],['macro','large'],['hydro','water'],
  ['photo','light'],['thermo','heat'],['chron','time'],['crypto','hidden'],
  ['cyto','cell'],['dermato','skin'],['dermo','skin'],['erythro','red'],
  ['leuko','white'],['melano','black or dark pigment'],['broncho','airways'],
  ['cerebro','brain'],['cephalo','head'],['geno','gene or origin'],
  ['morpho','form or shape'],['psycho','mind'],['patho','disease'],
  ['sarco','flesh or muscle'],['litho','stone'],['myco','fungus'],
  ['pseudo','false or fake'],['retro','backward'],['sapro','decaying matter'],
  ['spleno','spleen'],['tachy','fast'],['brady','slow'],
  ['hyper','over, above, excessive'],['hypo','under, below, deficient'],
  ['homo','same/similar, or human genus'],['hetero','different'],['auto','self'],
  ['anti','against'],['poly','many'],['mono','one, single'],['multi','many'],
  ['nano','very small, one billionth'],['mega','large, great'],['bio','life'],
  ['geo','earth'],['neo','new'],['myo','muscle'],['endo','inside'],
  ['exo','outside'],['epi','upon, above'],['peri','around'],
  ['para','beside or abnormal'],['meta','beyond or after'],['pre','before'],
  ['post','after'],['sub','under'],['super','above'],['trans','across'],
  ['inter','between'],['intra','within'],['extra','outside beyond'],
  ['semi','half'],['uni','one'],['bi','two'],['tri','three'],
  ['lipo','fat'],['angio','blood vessel'],['histo','tissue'],
  ['iso','equal, same'],['tele','distant, far'],['pyro','fire or fever'],
  ['zoo','animal'],['phyto','plant'],['aero','air or gas'],['aqua','water'],
  ['chromo','color'],['fibro','fiber or connective tissue'],['hemo','blood'],
  ['haemo','blood'],['gluco','sugar, glucose'],['glyco','sugar'],
  ['dendro','tree'],['ecto','outer'],['eu','good, true, well'],
  ['dys','bad, difficult, painful'],['a','without (when before consonant)'],
  ['an','without (when before vowel)'],
];

const SCI_SUFFIXES_LIST = [
  ['-ology','the study of'],['ology','the study of'],
  ['-itis','inflammation of'],['itis','inflammation of'],
  ['-ectomy','surgical removal of'],['ectomy','surgical removal of'],
  ['-otomy','incision into'],['otomy','incision into'],
  ['-plasty','surgical repair of'],['plasty','surgical repair of'],
  ['-graphy','process of imaging or recording'],['graphy','process of imaging or recording'],
  ['-scopy','visual examination with a scope'],['scopy','visual examination with a scope'],
  ['-genesis','origin or formation of'],['genesis','origin or formation of'],
  ['-philia','attraction to or love of'],['philia','attraction to'],
  ['-phobia','irrational fear of'],['phobia','fear of'],
  ['-pathy','disease of'],['pathy','disease or disorder of'],
  ['-osis','a condition or process'],['osis','a process or condition'],
  ['-emia','a blood condition'],['emia','blood condition'],
  ['-algia','pain in'],['algia','pain in'],
  ['-megaly','abnormal enlargement of'],['megaly','enlargement of'],
  ['-trophy','nourishment or growth'],['trophy','growth or nourishment'],
  ['-lysis','breakdown of'],['lysis','breakdown or destruction of'],
  ['-oma','tumor or mass'],['oma','tumor or growth'],
  ['-cyte','cell'],['cyte','cell type'],
  ['-blast','immature or developing cell'],['blast','developing cell'],
  ['-phage','something that eats or engulfs'],['phage','eater of'],
  ['-pnea','breathing'],['pnea','breathing'],
  ['-cardia','heart condition'],['cardia','heart condition'],
  ['-plegia','paralysis'],['plegia','paralysis'],
  ['-uria','urine condition'],['uria','urine condition'],
  ['-gram','a recorded image or measurement'],['gram','recorded image'],
  ['-scope','viewing instrument'],['scope','viewing instrument'],
  ['-meter','measuring instrument'],['meter','measurement of'],
  ['-ase','an enzyme'],['ase','an enzyme that catalyzes'],
  ['-cide','something that kills'],['cide','killer of'],
  ['-oid','resembling'],['oid','resembling or like'],
  ['-metry','science of measuring'],['metry','process of measuring'],
];

function decodeScientific(raw) {
  const results = [];
  const seen = new Set();

  // 1. Check known full terms (longest first)
  const sorted = Object.keys(SCI_KNOWN).sort((a,b) => b.length - a.length);
  sorted.forEach(term => {
    const re = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}\\b`, 'gi');
    const matches = raw.match(re);
    if (matches && !seen.has(term)) {
      seen.add(term);
      const info = SCI_KNOWN[term];
      results.push({ term: matches[0], plain: info.plain, breakdown: info.bd, parts: [] });
    }
  });

  // 2. Try to decode words by prefix+suffix (for terms not in the dictionary)
  const words = raw.match(/\b[A-Z][a-z]{4,}|[a-z]{5,}/g) || [];
  words.forEach(word => {
    const w = word.toLowerCase();
    // Skip if already decoded as part of a known term
    if ([...seen].some(s => s.includes(w))) return;
    if (seen.has(w)) return;

    const foundParts = [];
    let remaining = w;

    // Check prefixes
    const sortedPfx = [...SCI_PREFIXES_LIST].sort((a,b) => b[0].length - a[0].length);
    for (const [pfx, meaning] of sortedPfx) {
      if (remaining.startsWith(pfx) && remaining.length > pfx.length + 2) {
        foundParts.push({ part: pfx + '-', meaning });
        remaining = remaining.slice(pfx.length);
        break;
      }
    }

    // Check suffixes
    const sortedSfx = [...SCI_SUFFIXES_LIST].sort((a,b) => b[0].replace('-','').length - a[0].replace('-','').length);
    for (const [sfx, meaning] of sortedSfx) {
      const cleanSfx = sfx.replace('-','');
      if (remaining.endsWith(cleanSfx) && remaining.length > cleanSfx.length) {
        foundParts.push({ part: '-' + cleanSfx, meaning });
        const root = remaining.slice(0, remaining.length - cleanSfx.length);
        if (root.length > 2) foundParts.unshift({ part: root, meaning: 'root word' });
        remaining = '';
        break;
      }
    }

    if (foundParts.length >= 2) {
      seen.add(w);
      const combined = foundParts.map(p => p.meaning).filter(m => m !== 'root word').join(' + ');
      results.push({ term: word, plain: combined.charAt(0).toUpperCase() + combined.slice(1), breakdown: foundParts.map(p => `${p.part} = ${p.meaning}`).join(' | '), parts: foundParts });
    }
  });

  return results;
}

function renderScience(raw) {
  const results = decodeScientific(raw);
  let html = `<div class="lang-badge" style="border:1px solid rgba(91,156,246,0.4);color:var(--blue);background:var(--blue-bg)">🔬 Scientific Name Decoder</div>`;

  if (!results.length) {
    html += `<div class="verdict-box"><div class="verdict-label">Nothing decoded</div><div class="verdict-text">No recognized scientific names, chemical formulas, or Latin/Greek medical terms found. Try pasting a scientific paper, a species name like "Homo sapiens", a formula like "H2O", or a medical term like "hepatocyte".</div></div>`;
    return html;
  }

  html += `<div class="summary-grid">
    <div class="summary-card sc-blue"><div class="sc-value">${results.length}</div><div class="sc-label">Terms decoded</div></div>
    <div class="summary-card sc-blue"><div class="sc-value">${results.filter(r=>r.parts.length===0).length}</div><div class="sc-label">Known terms</div></div>
    <div class="summary-card sc-blue"><div class="sc-value">${results.filter(r=>r.parts.length>0).length}</div><div class="sc-label">Decoded by parts</div></div>
  </div>`;

  html += `<div class="section-label" style="margin-bottom:0.75rem">Decoded Terms</div>`;
  results.forEach(r => {
    html += `<div class="sci-card">
      <div class="sci-term">${escapeHtml(r.term)}</div>
      <div class="sci-plain">= ${escapeHtml(r.plain)}</div>
      <div class="sci-breakdown">${escapeHtml(r.breakdown)}</div>
      ${r.parts.length ? `<div class="sci-parts">${r.parts.map(p => `<span class="sci-part">${escapeHtml(p.part)}</span><span class="sci-part-meaning">${escapeHtml(p.meaning)}</span>`).join('')}</div>` : ''}
    </div>`;
  });

  html += `<div style="font-family:'IBM Plex Mono',monospace;font-size:0.65rem;color:var(--muted);padding:0.75rem;border-top:1px solid var(--border);line-height:1.5;margin-top:0.5rem">Decoding is based on Latin and Greek word roots. For rare or highly specialized terms, consult a domain-specific reference.</div>`;
  return html;
}
