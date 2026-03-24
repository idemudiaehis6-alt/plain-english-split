// ════════════════════════════════════════════════════════════
// TAB STATE
// ════════════════════════════════════════════════════════════
const outputState = {
  activeTab: 'summary',
  flagFilter: 'all',
  flags: [],
  clauses: [],
  copy: {
    summary: '',
    plain: '',
    flags: '',
    terms: '',
    compare: ''
  }
};

const STORAGE_KEYS = {
  draft: 'plainEnglish.currentDraft.v1',
  history: 'plainEnglish.history.v1'
};

function getHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.history);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (_) {
    return [];
  }
}

function setHistory(items) {
  localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(items.slice(0, 12)));
  renderHistory();
  updateSessionStatus();
}

function saveDraft() {
  const payload = {
    input: document.getElementById('inputText').value || '',
    activeCategory: document.querySelector('.cat-btn.active')?.dataset.cat || 'auto',
    activeTab: outputState.activeTab || 'summary',
    flagFilter: outputState.flagFilter || 'all',
    copy: outputState.copy,
    savedAt: Date.now()
  };
  localStorage.setItem(STORAGE_KEYS.draft, JSON.stringify(payload));
  updateSessionStatus();
}

function loadDraft() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.draft);
    if (!raw) return;
    const draft = JSON.parse(raw);
    if (draft.input) {
      document.getElementById('inputText').value = draft.input;
      document.getElementById('inputText').dispatchEvent(new Event('input'));
    }
    if (draft.activeCategory) {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.toggle('active', b.dataset.cat === draft.activeCategory));
    }
    if (draft.input && draft.input.trim()) {
      convert();
      setTab(draft.activeTab || 'summary');
    }
    setFlagFilter(draft.flagFilter || 'all');
  } catch (_) {}
  updateSessionStatus();
}

function updateSessionStatus() {
  const status = document.getElementById('sessionStatus');
  if (!status) return;
  const draftExists = !!localStorage.getItem(STORAGE_KEYS.draft);
  const count = getHistory().length;
  if (!draftExists && count === 0) {
    status.textContent = 'Session memory off';
    return;
  }
  status.textContent = draftExists ? `Session saved · ${count} item${count === 1 ? '' : 's'}` : `${count} saved item${count === 1 ? '' : 's'}`;
}

function truncateText(text, limit = 170) {
  const clean = (text || '').replace(/\s+/g, ' ').trim();
  return clean.length > limit ? clean.slice(0, limit).trim() + '…' : clean;
}

function saveCurrentToHistory() {
  const input = document.getElementById('inputText').value.trim();
  if (!input) {
    shake(document.getElementById('historyBtn') || document.getElementById('convertBtn'));
    return;
  }
  const item = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: Date.now(),
    category: document.querySelector('.cat-btn.active')?.dataset.cat || 'auto',
    activeTab: outputState.activeTab || 'summary',
    complexity: document.getElementById('complexityBadge')?.textContent || '',
    input,
    copy: outputState.copy,
    preview: truncateText(input, 190)
  };
  const history = getHistory().filter(x => x.input !== item.input);
  history.unshift(item);
  setHistory(history);
  saveDraft();
}

function formatHistoryDate(ts) {
  try {
    return new Date(ts).toLocaleString([], {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: 'numeric', minute: '2-digit'
    });
  } catch (_) {
    return 'Saved session';
  }
}

function renderHistory() {
  const list = document.getElementById('historyList');
  if (!list) return;
  const history = getHistory();

  if (!history.length) {
    list.innerHTML = `
      <div class="history-empty">
        <div class="empty-icon">🗂️</div>
        <p>No saved sessions yet.</p>
      </div>
    `;
    return;
  }

  list.innerHTML = history.map(item => `
    <article class="history-item" data-id="${item.id}">
      <div class="history-item-top">
        <span class="history-chip">${item.category}</span>
        <span class="history-date">${formatHistoryDate(item.createdAt)}</span>
      </div>
      <p class="history-preview">${escapeHtml(item.preview)}</p>
      <div class="history-item-bottom">
        <button class="icon-btn history-load-btn" data-id="${item.id}" type="button">Load</button>
        <button class="icon-btn history-delete-btn" data-id="${item.id}" type="button">Delete</button>
      </div>
    </article>
  `).join('');
}

function loadHistoryItem(id) {
  const item = getHistory().find(x => x.id === id);
  if (!item) return;
  document.getElementById('inputText').value = item.input || '';
  document.getElementById('inputText').dispatchEvent(new Event('input'));
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.toggle('active', b.dataset.cat === (item.category || 'auto')));
  convert();
  setTab(item.activeTab || 'summary');
  saveDraft();
  closeHistory();
}

function deleteHistoryItem(id) {
  setHistory(getHistory().filter(x => x.id !== id));
}

function clearHistory() {
  localStorage.removeItem(STORAGE_KEYS.history);
  renderHistory();
  updateSessionStatus();
}

function openHistory() {
  const drawer = document.getElementById('historyDrawer');
  if (!drawer) return;
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
}

function closeHistory() {
  const drawer = document.getElementById('historyDrawer');
  if (!drawer) return;
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
}

function emptyState(icon, text) {
  return `
    <div class="empty-state">
      <div class="empty-icon">${icon}</div>
      <p>${text}</p>
    </div>
  `;
}

function setTab(tabName) {
  outputState.activeTab = tabName;
  document.querySelectorAll('.output-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `tab-${tabName}`);
  });
  saveDraft();
}

function applyOutputs(parts) {
  document.getElementById('outputSummary').innerHTML = parts.summaryHtml;
  document.getElementById('outputPlain').innerHTML = parts.plainHtml;
  document.getElementById('outputTerms').innerHTML = parts.termsHtml;
  document.getElementById('outputCompare').innerHTML = parts.compareHtml;

  outputState.flags = parts.flags || [];
  outputState.clauses = parts.clauses || [];
  outputState.copy.summary = parts.summaryText || '';
  outputState.copy.plain = parts.plainText || '';
  outputState.copy.flags = parts.flagsText || '';
  outputState.copy.terms = parts.termsText || '';
  outputState.copy.compare = parts.compareText || '';
  renderFlagView();
  saveDraft();
}

function escapeHtml(text) {
  return String(text || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function sentenceSplit(text) {
  return String(text || '')
    .replace(/\s+/g, ' ')
    .trim()
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean);
}


function setFlagFilter(filterName) {
  outputState.flagFilter = filterName;
  document.querySelectorAll('.filter-chip').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filterName);
  });
  renderFlagView();
  saveDraft();
}

function filterFlags(flags, filterName) {
  if (filterName === 'red') return flags.filter(flag => flag.severity === 'red');
  if (filterName === 'amber') return flags.filter(flag => flag.severity === 'amber');
  if (filterName === 'high') return flags.filter(flag => flag.confidence === 'High');
  return flags;
}

function renderClauseNavigator(flags) {
  const nav = document.getElementById('clauseNavigator');
  if (!nav) return;
  if (!flags.length) {
    nav.innerHTML = `<div class="clause-nav-empty">No flagged clauses match this filter.</div>`;
    return;
  }

  nav.innerHTML = `
    <div class="clause-nav-head">
      <div class="tab-card-title">Jump to clause</div>
      <div class="clause-nav-count">${flags.length}</div>
    </div>
    <div class="clause-nav-list">
      ${flags.map((flag, index) => `
        <button class="clause-link ${flag.severity === 'red' ? 'is-red' : 'is-amber'}" data-target="${flag.clauseId}" type="button">
          <span class="clause-link-kicker">${flag.severity === 'red' ? 'Red flag' : 'Watch out'}</span>
          <strong>${escapeHtml(flag.clauseHeading || `Clause ${flag.clauseIndex}`)}</strong>
          <span class="clause-link-meta">${escapeHtml(flag.clauseType)} · ${flag.confidence}</span>
        </button>
      `).join('')}
    </div>
  `;
}

function renderFlagView() {
  const filtered = filterFlags(outputState.flags || [], outputState.flagFilter);
  document.getElementById('outputFlags').innerHTML = buildFlagsTab(filtered, outputState.clauses || []);
  renderClauseNavigator(filtered);
}


function summarizeDocument(text, analysis, wordCount) {
  const preview = sentenceSplit(text).slice(0, 3);
  const strongSignals = Object.entries(analysis.profile.normalized)
    .filter(([, value]) => value >= 0.6)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([label, value]) => ({ label, value }));

  return {
    bullets: [
      `Document type: ${analysis.docType.label}`,
      `Classifier confidence: ${analysis.docType.confidence}`,
      `Complexity: ${analysis.complexity.label}`,
      `${analysis.flags.length} flagged clause${analysis.flags.length === 1 ? '' : 's'} found`,
      `${analysis.replacedCount} term${analysis.replacedCount === 1 ? '' : 's'} decoded`,
      `${analysis.clauses.length} clause block${analysis.clauses.length === 1 ? '' : 's'} segmented`,
      `${wordCount} words scanned`
    ],
    preview,
    strongSignals,
    breakdown: analysis.docType.breakdown || []
  };
}

function buildSummaryTab(summary, verdict, analysis) {
  const bullets = summary.bullets.map(item => `<li>${item}</li>`).join('');
  const preview = summary.preview.length
    ? summary.preview.map(line => `<p class="summary-preview-line">${escapeHtml(line)}</p>`).join('')
    : `<p class="summary-preview-line">No document preview available.</p>`;

  const chips = summary.strongSignals.length
    ? summary.strongSignals.map(item => `<span class="signal-chip">${item.label} ${item.value}</span>`).join('')
    : `<span class="signal-chip">general</span>`;

  const breakdown = summary.breakdown.length
    ? summary.breakdown.map(item => `
        <div class="breakdown-row">
          <span>${item.label}</span>
          <strong>${item.score}</strong>
        </div>
      `).join('')
    : `<p class="summary-preview-line">No strong category pattern won decisively, so this was treated as a broad document.</p>`;

  return `
    <div class="stack-block">
      <div class="verdict-card ${verdict.riskClass}">
        <div class="verdict-top">
          <div>
            <div class="verdict-risk">${verdict.risk}</div>
            <div class="verdict-note">${escapeHtml(verdict.note || '')}</div>
          </div>
          <div class="confidence-pill">${analysis.docType.confidence}</div>
        </div>
        <p>${escapeHtml(verdict.text)}</p>
      </div>
    </div>
    <div class="stack-block tab-card">
      <div class="tab-card-title">Quick read</div>
      <ul class="summary-list">${bullets}</ul>
    </div>
    <div class="stack-block tab-card">
      <div class="tab-card-title">Signal mix</div>
      <div class="signal-chip-row">${chips}</div>
    </div>
    <div class="stack-block tab-card">
      <div class="tab-card-title">Why this classification won</div>
      <div class="breakdown-list">${breakdown}</div>
    </div>
    <div class="stack-block tab-card">
      <div class="tab-card-title">First lines in plain terms</div>
      <div class="summary-preview">${preview}</div>
    </div>
  `;
}

function buildFlagsTab(flags, clauses) {
  if (!flags.length) {
    return emptyState('✅', 'No obvious red-flag or watch-out clauses were detected in this pass.');
  }

  const clauseMap = new Map(clauses.map(clause => [clause.id, clause]));
  return flags.map(flag => {
    const source = clauseMap.get(flag.clauseId);
    return `
      <div class="flag-card ${flag.severity === 'red' ? 'flag-red' : 'flag-amber'}" id="${flag.clauseId}">
        <div class="flag-top">
          <span class="flag-level">${flag.severity === 'red' ? 'Red flag' : 'Watch out'}</span>
          <span class="flag-label">${escapeHtml(flag.label)}</span>
          <span class="mini-pill">${flag.confidence} confidence</span>
        </div>
        <div class="meta-line">
          <span>${escapeHtml(flag.clauseType)}</span>
          <span>Clause ${flag.clauseIndex}</span>
        </div>
        <p class="flag-text">${escapeHtml(flag.match)}</p>
        <p class="flag-meaning">${escapeHtml(flag.explanation)}</p>
        <div class="flag-source">
          <div class="flag-source-title">${escapeHtml(source?.heading || 'Source clause')}</div>
          <p>${escapeHtml(flag.snippet)}</p>
        </div>
      </div>
    `;
  }).join('');
}

function collectReplacedTerms(original) {
  const found = [];
  const seen = new Set();

  (window.JARGON || []).forEach(([term, plain, why]) => {
    const re = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (re.test(original) && !seen.has(term.toLowerCase())) {
      seen.add(term.toLowerCase());
      found.push({ term, plain, why });
    }
  });

  return found.sort((a, b) => a.term.localeCompare(b.term));
}

function buildTermsTab(terms) {
  if (!terms.length) {
    return emptyState('🧩', 'No known jargon replacements were triggered for this document.');
  }
  return terms.map(item => `
    <div class="term-card">
      <div class="term-head">
        <span class="term-original">${escapeHtml(item.term)}</span>
        <span class="term-arrow">→</span>
        <span class="term-plain">${escapeHtml(item.plain)}</span>
      </div>
      <p class="term-note">${escapeHtml(item.why || 'This term was rewritten in simpler language.')}</p>
    </div>
  `).join('');
}

function buildCompareTab(original, simplifiedHtml) {
  const originalLines = sentenceSplit(original);
  const simplifiedLines = sentenceSplit(String(simplifiedHtml || '').replace(/<[^>]+>/g, ' '));
  const rows = [];
  const max = Math.max(originalLines.length, simplifiedLines.length);

  for (let i = 0; i < max; i++) {
    rows.push(`
      <div class="compare-row">
        <div class="compare-col">
          <div class="compare-label">Original</div>
          <p>${escapeHtml(originalLines[i] || '')}</p>
        </div>
        <div class="compare-col">
          <div class="compare-label">Simplified</div>
          <p>${escapeHtml(simplifiedLines[i] || '')}</p>
        </div>
      </div>
    `);
  }

  return rows.join('') || emptyState('↔️', 'Nothing to compare yet.');
}

function buildDocumentOutputs({ raw, analysis, wordCount }) {
  const summary = summarizeDocument(raw, analysis, wordCount);
  const terms = collectReplacedTerms(raw);

  const summaryHtml = buildSummaryTab(summary, analysis.verdict, analysis);
  const plainHtml = analysis.highlighted;
  const flagsHtml = buildFlagsTab(analysis.flags, analysis.clauses);
  const termsHtml = buildTermsTab(terms);
  const compareHtml = buildCompareTab(raw, analysis.highlighted);

  const plainText = String(analysis.highlighted || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const flagsText = analysis.flags.map(f =>
    `${f.severity === 'red' ? 'RED FLAG' : 'WATCH OUT'} — ${f.label}\nConfidence: ${f.confidence}\nClause type: ${f.clauseType}\nMatched text: ${f.match}\nWhy it matters: ${f.explanation}\nSource: ${f.snippet}`
  ).join('\n\n');
  const termsText = terms.map(t => `${t.term} → ${t.plain}${t.why ? `\n${t.why}` : ''}`).join('\n\n');
  const compareText = sentenceSplit(raw).map((line, i) => {
    const simp = sentenceSplit(plainText)[i] || '';
    return `Original: ${line}\nSimplified: ${simp}`;
  }).join('\n\n');
  const summaryText = [
    ...summary.bullets,
    '',
    'Signal mix:',
    ...summary.strongSignals.map(item => `${item.label}: ${item.value}`),
    '',
    'Preview:',
    ...summary.preview
  ].join('\n');

  return { summaryHtml, plainHtml, flagsHtml, termsHtml, compareHtml, plainText, flagsText, termsText, compareText, summaryText, flags: analysis.flags, clauses: analysis.clauses };
}

function buildSingleModeOutput(title, bodyHtml, copyTextValue, emptyFlagsMessage = '') {
  return {
    summaryHtml: `
      <div class="stack-block tab-card">
        <div class="tab-card-title">${title}</div>
        <p class="mode-note">This input was routed into a specialist mode, so the document-risk tabs stay minimal.</p>
      </div>
    `,
    plainHtml: bodyHtml,
    flagsHtml: emptyState('ℹ️', emptyFlagsMessage || 'No clause-level risk analysis is shown for this mode.'),
    termsHtml: emptyState('ℹ️', 'No jargon term table is generated for this mode.'),
    compareHtml: emptyState('ℹ️', 'Original-versus-simplified comparison is only available for full document decoding.'),
    summaryText: title,
    plainText: copyTextValue,
    flagsText: '',
    termsText: '',
    compareText: '',
    flags: [],
    clauses: []
  };
}

// ════════════════════════════════════════════════════════════
// MAIN CONVERTER
// ════════════════════════════════════════════════════════════
function convert() {
  const raw = document.getElementById('inputText').value.trim();
  if (!raw) {
    shake(document.getElementById('convertBtn'));
    return;
  }

  const cat = document.querySelector('.cat-btn.active')?.dataset.cat || 'auto';
  const profile = typeof getContentProfile === 'function' ? getContentProfile(raw) : { normalized: {} };
  const routeToCode = typeof shouldRouteToCode === 'function' ? shouldRouteToCode(raw, profile, cat) : (cat === 'code');
  const routeToScience = typeof shouldRouteToScience === 'function' ? shouldRouteToScience(raw, profile, cat) : (cat === 'science');

  if (routeToCode) {
    document.getElementById('complexityBadge').textContent = '💻 Code';
    document.getElementById('complexityBadge').className = 'complexity-badge level-easy';
    const title = cat === 'academic' ? 'Code detected inside academic text' : 'Code explainer';
    applyOutputs(buildSingleModeOutput(title, renderCode(raw), 'Code explanation — see active tab.', 'No clause-level risk analysis for code mode.'));
    setTab('plain');
    return;
  }

  if (routeToScience && cat !== 'academic') {
    document.getElementById('complexityBadge').textContent = '🔬 Scientific';
    document.getElementById('complexityBadge').className = 'complexity-badge level-medium';
    applyOutputs(buildSingleModeOutput('Science decoder', renderScience(raw), 'Scientific name decoding — see active tab.', 'No clause-level risk analysis for science mode.'));
    setTab('plain');
    return;
  }

  const analysis = analyzeDocument(raw, cat);
  const wordCount = raw.split(/\s+/).filter(Boolean).length;
  const badge = document.getElementById('complexityBadge');

  badge.textContent = `${analysis.docType.label} · ${analysis.docType.confidence}`;
  badge.className = 'complexity-badge ' + (analysis.complexity.className || 'level-medium');

  applyOutputs(buildDocumentOutputs({ raw, analysis, wordCount }));
  setTab('summary');
}

// Character count
document.getElementById('inputText').addEventListener('input', () => {
  const val = document.getElementById('inputText').value;
  const chars = val.length;
  const words = val.trim() ? val.trim().split(/\s+/).length : 0;
  document.getElementById('charCount').textContent = `${chars.toLocaleString()} characters · ${words.toLocaleString()} words`;
  saveDraft();
});

// Flag filters
document.querySelectorAll('.filter-chip').forEach(btn => {
  btn.addEventListener('click', () => setFlagFilter(btn.dataset.filter));
});

document.getElementById('clauseNavigator').addEventListener('click', (e) => {
  const target = e.target.closest('.clause-link');
  if (!target) return;
  const id = target.dataset.target;
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  el.classList.add('flash-focus');
  setTimeout(() => el.classList.remove('flash-focus'), 1400);
});

// Tabs
document.querySelectorAll('.output-tab').forEach(btn => {
  btn.addEventListener('click', () => setTab(btn.dataset.tab));
});

// Category toggle
document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    saveDraft();
  });
});

// Convert button
document.getElementById('convertBtn').addEventListener('click', convert);

// Clear button
document.getElementById('clearBtn').addEventListener('click', () => {
  document.getElementById('inputText').value = '';
  document.getElementById('inputText').dispatchEvent(new Event('input'));
});

// Sample button
document.getElementById('sampleBtn').addEventListener('click', () => {
  const sample = getSampleForCategory();
  document.getElementById('inputText').value = sample;
  document.getElementById('inputText').dispatchEvent(new Event('input'));
  convert();
});

// File upload
document.getElementById('fileInput').addEventListener('change', async (e) => {
  const f = e.target.files?.[0];
  if (!f) return;
  try {
    const text = await f.text();
    document.getElementById('inputText').value = text;
    document.getElementById('inputText').dispatchEvent(new Event('input'));
  } catch (_) {}
});

// History controls
document.getElementById('historyBtn').addEventListener('click', openHistory);
document.getElementById('closeHistoryBtn').addEventListener('click', closeHistory);
document.getElementById('historyBackdrop').addEventListener('click', closeHistory);
document.getElementById('saveNowBtn').addEventListener('click', () => {
  saveCurrentToHistory();
  openHistory();
});
document.getElementById('clearHistoryBtn').addEventListener('click', clearHistory);
document.getElementById('historyList').addEventListener('click', (e) => {
  const loadBtn = e.target.closest('.history-load-btn');
  const deleteBtn = e.target.closest('.history-delete-btn');
  if (loadBtn) loadHistoryItem(loadBtn.dataset.id);
  if (deleteBtn) deleteHistoryItem(deleteBtn.dataset.id);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeHistory();
});

// Copy output
document.getElementById('copyBtn').addEventListener('click', () => {
  const text = outputState.copy[outputState.activeTab];
  if (!text) return;
  copyText(text, document.getElementById('copyBtn'), 'Copy active tab', '✓ Copied!');
});

// Copy flags
document.getElementById('copyFlagsBtn').addEventListener('click', () => {
  const text = outputState.copy.flags;
  if (!text) return;
  copyText(text, document.getElementById('copyFlagsBtn'), 'Copy flags only', '✓ Copied!');
});

function copyText(text, btn, original, success) {
  const fallback = () => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      btn.textContent = success;
      btn.classList.add('success');
    } catch (e) {
      btn.textContent = '⚠ Failed';
    }
    document.body.removeChild(ta);
    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove('success');
    }, 2400);
  };

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = success;
      btn.classList.add('success');
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove('success');
      }, 2400);
    }).catch(fallback);
  } else {
    fallback();
  }
}

// Auto-detect helpers kept for compatibility
function looksLikeCode(text) {
  const codeSignals = [
    /<[a-z][a-z0-9]*[\s>\/]/i, /\{[\s\S]*?:[\s\S]*?;/, /\bfunction\s+\w+\s*\(/,
    /\bconst\s+\w+\s*=/, /\blet\s+\w+\s*=/, /\bdef\s+\w+\s*\(/,
    /\bimport\s+\w+\s+from\b/, /\bfrom\s+\w+\s+import\b/, /=>\s*{/
  ];
  return codeSignals.filter(re => re.test(text)).length >= 2;
}

function looksLikeScience(text) {
  const sciSignals = [
    /\b[A-Z][a-z]+\s+[a-z]+is\b/, /\b[A-Z][a-z]+\s+[a-z]+us\b/, /\b[A-Z][a-z]+\s+[a-z]+ae\b/,
    /\bH[0-9]+O\b|\bC[0-9]+H/, /\b(cardiomyopathy|hepatocyte|neurotransmitter|mitochondria|photosynthesis|endoplasmic|telomere|chromosome|ribonucleic|deoxyribonucleic)\b/i
  ];
  return sciSignals.filter(re => re.test(text)).length >= 1;
}

function shake(el) {
  el.style.transform = 'translateX(-5px)';
  setTimeout(() => el.style.transform = 'translateX(5px)', 70);
  setTimeout(() => el.style.transform = 'translateX(-4px)', 140);
  setTimeout(() => el.style.transform = 'translateX(0)', 210);
}

// Init
renderHistory();
setFlagFilter('all');
loadDraft();
