// ════════════════════════════════════════════════════════════
// READING COMPLEXITY SCORER (Flesch-Kincaid approximation)
// ════════════════════════════════════════════════════════════
function scoreComplexity(text) {
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 3);
  if (!words.length || !sentences.length) return { score: 0, label: 'Unknown', level: '', className: '' };

  function syllables(word) {
    word = word.toLowerCase().replace(/[^a-z]/g, '');
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const matches = word.match(/[aeiouy]{1,2}/g);
    return matches ? matches.length : 1;
  }

  const totalSyllables = words.reduce((sum, w) => sum + syllables(w), 0);
  const avgSentLen = words.length / sentences.length;
  const avgSyllables = totalSyllables / words.length;
  const score = Math.round(206.835 - 1.015 * avgSentLen - 84.6 * avgSyllables);
  const clamped = Math.max(0, Math.min(100, score));

  if (clamped >= 70) return { score: clamped, label: `Readable (${clamped}/100)`, level: 'easy', className: 'level-easy' };
  if (clamped >= 45) return { score: clamped, label: `Moderate (${clamped}/100)`, level: 'medium', className: 'level-medium' };
  return { score: clamped, label: `Dense (${clamped}/100)`, level: 'hard', className: 'level-hard' };
}

// ════════════════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════════════════
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function stripHtml(text) {
  return String(text || '').replace(/<[^>]*>/g, ' ');
}

function getPlainSentences(text) {
  return stripHtml(text)
    .replace(/\s+/g, ' ')
    .trim()
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean);
}

function getParagraphs(text) {
  return text.split(/\n{2,}/).map(p => p.trim()).filter(Boolean);
}

function countHits(text, patterns) {
  return patterns.reduce((sum, pattern) => {
    const matches = text.match(pattern);
    return sum + (matches ? matches.length : 0);
  }, 0);
}

// ════════════════════════════════════════════════════════════
// CONTENT MIX / ROUTING
// ════════════════════════════════════════════════════════════
const CONTENT_SIGNALS = {
  legal: [
    /\bagreement\b/gi, /\bparty\b/gi, /\bshall\b/gi, /\bhereby\b/gi, /\bwhereas\b/gi,
    /\bliability\b/gi, /\bindemnif/i, /\bgoverning law\b/gi, /\bjurisdiction\b/gi,
    /\bbreach\b/gi, /\btermination\b/gi, /\bnotice\b/gi
  ],
  privacy: [
    /\bprivacy\b/gi, /\bpersonal data\b/gi, /\bpersonal information\b/gi, /\bcookies?\b/gi,
    /\btracking\b/gi, /\bdata controller\b/gi, /\bprocessor\b/gi, /\bgdpr\b/gi
  ],
  financial: [
    /\bapr\b/gi, /\binterest rate\b/gi, /\bloan\b/gi, /\bcollateral\b/gi, /\bcredit\b/gi,
    /\brepayment\b/gi, /\bamortization\b/gi, /\bprincipal\b/gi
  ],
  rental: [
    /\blandlord\b/gi, /\btenant\b/gi, /\blease\b/gi, /\brent\b/gi, /\bsecurity deposit\b/gi,
    /\bpremises\b/gi
  ],
  employment: [
    /\bemployer\b/gi, /\bemployee\b/gi, /\bsalary\b/gi, /\bcompensation\b/gi,
    /\bat-will\b/gi, /\bnon-compete\b/gi
  ],
  technical: [
    /\bapi\b/gi, /\bdeveloper\b/gi, /\bintegration\b/gi, /\bplatform\b/gi, /\bsdk\b/gi,
    /\bendpoint\b/gi, /\bauthentication\b/gi, /\bjson\b/gi, /\bserver\b/gi
  ],
  science: [
    /\bmitochondria\b/gi, /\bcell\b/gi, /\bchromosome\b/gi, /\bphotosynthesis\b/gi,
    /\btaxonomy\b/gi, /\bmetabolism\b/gi, /\bneurotransmitter\b/gi
  ],
  code: [
    /<([a-z][a-z0-9-]*)(\s+[^>\n]*)?>/gi, /\bfunction\s+\w+\s*\(/gi, /\bconst\s+\w+\s*=/gi,
    /\blet\s+\w+\s*=/gi, /\bclass\s+\w+\b/gi, /\bimport\s+.+?\s+from\b/gi,
    /\bfrom\s+\w+\s+import\b/gi, /=>\s*[{(]/g
  ]
};


function getLineStats(text) {
  const lines = String(text || '').split('\n');
  const nonEmpty = lines.filter(line => line.trim());
  const indented = nonEmpty.filter(line => /^\s{2,}\S/.test(line)).length;
  const punctuated = nonEmpty.filter(line => /[{};<>]/.test(line)).length;
  const commentish = nonEmpty.filter(line => /^\s*(\/\/|#|\/\*|\* )/.test(line)).length;
  return {
    total: nonEmpty.length,
    indentedRatio: nonEmpty.length ? indented / nonEmpty.length : 0,
    punctuatedRatio: nonEmpty.length ? punctuated / nonEmpty.length : 0,
    commentRatio: nonEmpty.length ? commentish / nonEmpty.length : 0
  };
}

function shouldRouteToCode(text, profile, forcedCat = 'auto') {
  const lineStats = getLineStats(text);
  const code = profile.normalized.code || 0;
  const technical = profile.normalized.technical || 0;
  const legal = profile.normalized.legal || 0;
  const privacy = profile.normalized.privacy || 0;
  const science = profile.normalized.science || 0;
  const academic = profile.normalized.academic || 0;

  const proseGuard = /(terms of service|privacy policy|agreement|lease|policy|notice|employment agreement|loan agreement|insurance policy|official notice|consent form)/i.test(text);
  const hasExplicitCodeSyntax =
    /function\s+\w+\s*\(|const\s+\w+\s*=|let\s+\w+\s*=|class\s+\w+\b|import\s+.+?\s+from\b|from\s+\w+\s+import\b|=>\s*[{(]|console\.(log|error|warn)\s*\(|<([a-z][a-z0-9-]*)(\s+[^>\n]*)?>/i.test(text);
  const likelyCodeBlock =
    lineStats.indentedRatio >= 0.24 ||
    lineStats.punctuatedRatio >= 0.34 ||
    lineStats.commentRatio >= 0.2;

  const explicitCodeCat = forcedCat === 'code';
  const academicGuard = forcedCat === 'academic' && hasExplicitCodeSyntax && likelyCodeBlock;

  if (explicitCodeCat) return true;
  if (academicGuard) return true;

  if (proseGuard && !hasExplicitCodeSyntax) return false;

  return (
    ((code >= 1.45 && hasExplicitCodeSyntax) || (code >= 1.05 && likelyCodeBlock && hasExplicitCodeSyntax)) &&
    legal < 1.15 &&
    privacy < 0.95 &&
    science < 1.25
  ) || (
    technical >= 1.6 &&
    code >= 1.0 &&
    likelyCodeBlock &&
    hasExplicitCodeSyntax &&
    academic < 1.8 &&
    !proseGuard
  );
}

function shouldRouteToScience(text, profile, forcedCat = 'auto') {
  const science = profile.normalized.science || 0;
  const code = profile.normalized.code || 0;
  const legal = profile.normalized.legal || 0;
  return forcedCat === 'science' || (science >= 1.1 && code < 0.95 && legal < 1.1);
}


function getContentProfile(text) {
  const value = String(text || '');
  const raw = {};
  Object.entries(CONTENT_SIGNALS).forEach(([key, patterns]) => {
    raw[key] = countHits(value, patterns);
  });

  const wordCount = value.trim().split(/\s+/).filter(Boolean).length || 1;
  const normalized = {};
  Object.entries(raw).forEach(([key, score]) => {
    normalized[key] = Number((score / Math.max(1, Math.ceil(wordCount / 40))).toFixed(2));
  });

  return {
    raw,
    normalized,
    dominant: Object.entries(normalized).sort((a, b) => b[1] - a[1])[0]?.[0] || 'general'
  };
}

// ════════════════════════════════════════════════════════════
// DOCUMENT TYPE CLASSIFIER
// ════════════════════════════════════════════════════════════
function detectDocType(text, forcedCat) {
  if (forcedCat && forcedCat !== 'auto') {
    const profile = getContentProfile(text);
    if (forcedCat === 'academic' && shouldRouteToCode(text, profile, forcedCat)) {
      return {
        id: 'code',
        label: 'Code / Technical Snippet',
        confidence: 'High',
        confidenceScore: 0.94,
        hybrid: true,
        secondary: { id: 'academic', label: 'Academic', score: 1 },
        breakdown: [{ label: 'Code / Technical Snippet', score: 3 }, { label: 'Academic', score: 1 }]
      };
    }
    const forced = DOC_TYPES.find(d => d.id === forcedCat);
    if (forced) {
      return {
        id: forced.id,
        label: forced.label,
        confidence: 'High',
        confidenceScore: 0.96,
        hybrid: false,
        secondary: null,
        breakdown: [{ label: forced.label, score: 1 }]
      };
    }
  }

  const profile = getContentProfile(text);
  const scored = DOC_TYPES.map(dt => {
    const score = dt.patterns.reduce((sum, p) => {
      const matches = text.match(p);
      return sum + (matches ? matches.length * 2 : 0);
    }, 0);
    return { ...dt, score };
  }).sort((a, b) => b.score - a.score);

  const top = scored[0];
  const second = scored[1];
  const total = scored.reduce((sum, item) => sum + item.score, 0);

  if (!top || top.score === 0) {
    return {
      id: 'general',
      label: profile.normalized.technical > 1.2 ? 'Technical Document' : 'General Document',
      confidence: profile.normalized.technical > 1.2 ? 'Medium' : 'Low',
      confidenceScore: profile.normalized.technical > 1.2 ? 0.66 : 0.4,
      hybrid: false,
      secondary: null,
      breakdown: []
    };
  }

  const topShare = total ? top.score / total : 1;
  const isHybrid = second && second.score > 0 && (second.score / Math.max(1, top.score)) >= 0.55;

  let confidenceScore = 0.45 + Math.min(0.45, topShare);
  if (top.score >= 6) confidenceScore += 0.08;
  confidenceScore = Math.min(0.98, confidenceScore);

  return {
    id: top.id,
    label: isHybrid ? `${top.label} + ${second.label}` : top.label,
    confidence: confidenceScore >= 0.82 ? 'High' : confidenceScore >= 0.62 ? 'Medium' : 'Low',
    confidenceScore,
    hybrid: isHybrid,
    secondary: isHybrid ? { id: second.id, label: second.label, score: second.score } : null,
    breakdown: scored.filter(item => item.score > 0).slice(0, 4).map(item => ({
      id: item.id,
      label: item.label,
      score: item.score
    }))
  };
}

// ════════════════════════════════════════════════════════════
// CLAUSE SEGMENTATION
// ════════════════════════════════════════════════════════════
const CLAUSE_TYPES = [
  { id: 'payment', label: 'Payment / Fees', patterns: [/\bfee(s)?\b/i, /\bpayment\b/i, /\bcharge(s|d)?\b/i, /\bprice\b/i, /\bsubscription\b/i, /\bbilling\b/i] },
  { id: 'termination', label: 'Termination / Suspension', patterns: [/\bterminate\b/i, /\bsuspend\b/i, /\bcancel\b/i, /\bend this agreement\b/i] },
  { id: 'liability', label: 'Liability / Damages', patterns: [/\bliability\b/i, /\bdamages\b/i, /\bnot liable\b/i, /\blimit(ed|ation)\b/i] },
  { id: 'privacy', label: 'Privacy / Data Use', patterns: [/\bpersonal data\b/i, /\bpersonal information\b/i, /\bcookies?\b/i, /\btrack(?:ing)?\b/i] },
  { id: 'disputes', label: 'Disputes / Governing Law', patterns: [/\barbitration\b/i, /\bgoverning law\b/i, /\bjurisdiction\b/i, /\bclass action\b/i] },
  { id: 'license', label: 'Rights / License', patterns: [/\blicense\b/i, /\bintellectual property\b/i, /\broyalty[- ]free\b/i, /\birrevocable\b/i, /\bperpetual\b/i] },
  { id: 'employment', label: 'Employment Terms', patterns: [/\bemployer\b/i, /\bemployee\b/i, /\bsalary\b/i, /\bcompensation\b/i, /\bat-will\b/i] },
  { id: 'housing', label: 'Rental / Premises', patterns: [/\blandlord\b/i, /\btenant\b/i, /\blease\b/i, /\bpremises\b/i, /\bsecurity deposit\b/i] },
  { id: 'medical', label: 'Medical / Consent', patterns: [/\bconsent\b/i, /\bprocedure\b/i, /\bpatient\b/i, /\bclinical\b/i, /\btreatment\b/i] }
];

function classifyClauseType(text) {
  let best = { id: 'general', label: 'General Clause', score: 0 };
  CLAUSE_TYPES.forEach(type => {
    const score = type.patterns.reduce((sum, p) => sum + (p.test(text) ? 1 : 0), 0);
    if (score > best.score) best = { id: type.id, label: type.label, score };
  });
  return { id: best.id, label: best.label };
}

function segmentClauses(text) {
  const blocks = getParagraphs(text);
  const source = blocks.length ? blocks : getPlainSentences(text);

  return source.map((block, index) => {
    const heading = block.split('\n')[0].trim().slice(0, 72);
    return {
      id: `clause-${index + 1}`,
      index: index + 1,
      heading: heading.length > 56 ? heading.slice(0, 56).trim() + '…' : heading,
      text: block.trim(),
      type: classifyClauseType(block)
    };
  });
}

// ════════════════════════════════════════════════════════════
// JARGON REPLACER
// ════════════════════════════════════════════════════════════
function replaceJargon(text) {
  let result = text;
  const replacements = [];
  const sorted = [...JARGON].sort((a, b) => b[0].length - a[0].length);

  sorted.forEach(([original, plain, note]) => {
    const escaped = escapeRegExp(original);
    const flexed = escaped.replace(/\s+/g, '[\\s\\n\\r]+');
    const regex = new RegExp(`(?<![\\w>])${flexed}(?![\\w<])`, 'gi');

    if (regex.test(result)) {
      replacements.push({ original, plain, note });
      result = result.replace(regex, (match) => {
        const tooltip = note ? `${plain} — ${note}` : plain;
        return `<span class="replaced" title="${original}">${plain}<span class="tooltip">🔍 Original: "${match}"<br>${tooltip}</span></span>`;
      });
    }
  });

  return { text: result, count: replacements.length, replacements };
}

// ════════════════════════════════════════════════════════════
// SENTENCE HIGHLIGHTER
// ════════════════════════════════════════════════════════════
function highlightSentences(text) {
  const chunks = text.match(/[^.!?\n]+[.!?\n]*/g) || [text];
  return chunks.map(sentence => {
    for (const [pattern, severity] of RED_FLAGS) {
      if (pattern.test(stripHtml(sentence))) {
        return `<span class="sent-${severity === 'red' ? 'redflag' : 'watch'}">${sentence}</span>`;
      }
    }
    return sentence;
  }).join('');
}

// ════════════════════════════════════════════════════════════
// FLAG DETECTOR
// ════════════════════════════════════════════════════════════
function detectFlags(text) {
  const clauses = segmentClauses(text);
  const found = [];
  const seen = new Set();

  clauses.forEach(clause => {
    RED_FLAGS.forEach(([pattern, severity, title, explanation]) => {
      const clean = stripHtml(clause.text);
      if (!pattern.test(clean)) return;

      const match = clean.match(pattern)?.[0] || clean.slice(0, 140);
      const key = `${title}-${clause.index}-${match.toLowerCase()}`;
      if (seen.has(key)) return;
      seen.add(key);
      const confidenceScore = Math.min(0.96, 0.58 + (severity === 'red' ? 0.16 : 0.1) + (match.length > 20 ? 0.06 : 0));
      found.push({
        severity,
        title,
        label: title.replace(/^[^A-Za-z]+/, ''),
        explanation,
        match,
        clauseType: clause.type.label,
        clauseId: clause.id,
        clauseIndex: clause.index,
        clauseHeading: clause.heading,
        snippet: clean.length > 220 ? clean.slice(0, 220).trim() + '…' : clean,
        confidence: confidenceScore >= 0.82 ? 'High' : confidenceScore >= 0.68 ? 'Medium' : 'Low',
        confidenceScore
      });
    });
  });


  const collapsed = [];
  const seenPerClause = new Set();
  found.forEach(item => {
    const key = `${item.clauseIndex}-${item.label}`;
    if (seenPerClause.has(key)) return;
    seenPerClause.add(key);
    collapsed.push(item);
  });

  return collapsed.sort((a, b) => b.confidenceScore - a.confidenceScore);

}

// ════════════════════════════════════════════════════════════
// VERDICT GENERATOR
// ════════════════════════════════════════════════════════════
function generateVerdict(flags, complexity, docType, profile) {
  const redCount = flags.filter(f => f.severity === 'red').length;
  const amberCount = flags.filter(f => f.severity === 'amber').length;
  const total = redCount + amberCount;

  let risk = 'LOW RISK';
  let riskClass = 'risk-low';
  let text = 'No major red flags were detected in this pass. That does not make the document harmless; it means no strong pattern matches fired.';

  if (redCount >= 3) {
    risk = 'HIGH RISK';
    riskClass = 'risk-high';
    text = 'This document has multiple clauses that could seriously limit rights, refunds, or legal options. Treat the flagged sections as decision points, not background noise.';
  } else if (redCount >= 1) {
    risk = 'MODERATE RISK';
    riskClass = 'risk-moderate';
    text = 'At least one clause has strong downside potential. Read the flagged sections closely before agreeing, especially anything about disputes, data, liability, or automatic payments.';
  } else if (amberCount >= 3) {
    risk = 'WORTH REVIEWING';
    riskClass = 'risk-moderate';
    text = 'Nothing looked deeply aggressive, but several clauses still deserve attention. This is the kind of document that becomes dangerous only when skimmed.';
  } else if (total > 0) {
    risk = 'LOW RISK';
    riskClass = 'risk-low';
    text = 'A few watch-outs were found, but nothing unusually severe. You still want to read the highlighted sections so you know what you are accepting.';
  }

  const mix = Object.entries(profile.normalized)
    .filter(([, value]) => value >= 0.6)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key, value]) => `${key}: ${value}`)
    .join(' · ');

  return {
    risk,
    riskClass,
    text,
    note: `Classifier confidence: ${docType.confidence}.${mix ? ` Content mix: ${mix}.` : ''}`
  };
}

// ════════════════════════════════════════════════════════════
// FULL ANALYSIS
// ════════════════════════════════════════════════════════════
function analyzeDocument(text, forcedCat = 'auto') {
  const profile = getContentProfile(text);
  const docType = detectDocType(text, forcedCat);
  const complexity = scoreComplexity(text);
  const flags = detectFlags(text);
  const jargon = replaceJargon(text);
  const highlighted = highlightSentences(jargon.text);
  const clauses = segmentClauses(text);
  const verdict = generateVerdict(flags, complexity, docType, profile);

  return {
    profile,
    docType,
    complexity,
    flags,
    clauses,
    replacedCount: jargon.count,
    replacements: jargon.replacements,
    highlighted,
    verdict
  };
}
