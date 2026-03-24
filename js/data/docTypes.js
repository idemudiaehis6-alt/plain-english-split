// ════════════════════════════════════════════════════════════
// DOCUMENT TYPE DETECTOR
// ════════════════════════════════════════════════════════════
const DOC_TYPES = [
  { id:'tos', label:'Terms of Service', patterns:[
      /terms\s+of\s+service|terms\s+of\s+use|user\s+agreement|terms\s+and\s+conditions|eula|end[\s-]user\s+license/i,
      /acceptable\s+use\s+policy|account\s+suspension|subscription\s+renewal|platform\s+terms|developer\s+platform\s+terms/i
  ]},
  { id:'privacy', label:'Privacy Policy', patterns:[
      /privacy\s+policy|data\s+protection|gdpr|personal\s+data.*collect|how\s+we\s+use\s+your\s+data|information\s+we\s+collect/i,
      /cookies?\s+policy|do\s+not\s+sell\s+my\s+personal\s+information|data\s+controller|data\s+processor/i
  ]},
  { id:'medical', label:'Medical / Health Document', patterns:[
      /informed\s+consent|patient|diagnosis|treatment|medical\s+procedure|clinical|physician|healthcare|prognosis|contraindicated/i,
      /side\s+effects?|dosage|therapy|hospital|medication/i
  ]},
  { id:'financial', label:'Financial Agreement', patterns:[
      /loan\s+agreement|mortgage|credit|amortization|interest\s+rate|annual\s+percentage\s+rate|apr|collateral|foreclosure|escrow/i,
      /repayment|promissory\s+note|principal\s+balance|default\s+interest/i
  ]},
  { id:'insurance', label:'Insurance Policy', patterns:[
      /insurance\s+policy|policyholder|deductible|premium|coverage|underwriting|beneficiary|insured|insurer|claim/i,
      /exclusion|covered\s+loss|declarations\s+page|proof\s+of\s+loss/i
  ]},
  { id:'rental', label:'Rental / Lease Agreement', patterns:[
      /lease\s+agreement|rental\s+agreement|landlord|tenant|security\s+deposit|premises|rent\s+due|occupancy/i,
      /quiet\s+enjoyment|right\s+of\s+entry|late\s+rent/i
  ]},
  { id:'employment', label:'Employment Agreement', patterns:[
      /employment\s+agreement|offer\s+letter|salary|compensation|employee|employer|at-will|termination\s+for\s+cause/i,
      /bonus|equity|vesting|non-?compete|non-?solicitation/i
  ]},
  { id:'government', label:'Government / Official Notice', patterns:[
      /official\s+notice|administrative|regulation|ordinance|compliance\s+required|agency|department|public\s+notice/i,
      /statutory|pursuant\s+to|hereby\s+notified|registered\s+address|licensed\s+operators/i
  ]},
  { id:'academic', label:'Academic / Research Text', patterns:[
      /abstract|introduction|methodology|methods|results|discussion|literature\s+review|citation|references/i,
      /hypothesis|sample\s+size|statistically\s+significant|peer\s+reviewed|journal|participant\w*|correlation|causation|longitudinal\s+design|confidence\s+interval/i
  ]},
  { id:'code', label:'Code / Technical Snippet', patterns:[
      /function\s+\w+\s*\(|const\s+\w+\s*=|let\s+\w+\s*=|class\s+\w+\s*(?:\{|extends\b)|import\s+.+\s+from|<\/?[a-z][^>]*>|console\.(log|error|warn)/i,
      /return\s+.*;|=>\s*\{|def\s+\w+\s*\(|from\s+\w+\s+import/i
  ]},
  { id:'api', label:'Developer / API Documentation', patterns:[
      /api\s+reference|developer\s+terms|developer\s+platform|request\s+body|response\s+body|endpoint|authentication|authorization|json|http\s+status|rate\s+limit/i,
      /curl\s|sdk|webhook|bearer\s+token/i
  ]}
];
