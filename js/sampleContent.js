const SAMPLE_LIBRARY = {
  auto: [
`TERMS OF SERVICE — SAMPLE CIRCLE

By using the service, you agree to these Terms. We may modify these Terms at any time at our sole discretion, and continued use counts as acceptance.

Any dispute shall be resolved by binding arbitration in Delaware. You waive any right to a jury trial and any participation in a class action lawsuit.

Your subscription automatically renews unless canceled at least 48 hours before the current term ends. Fees are nonrefundable. We may suspend or terminate your account at any time in our sole discretion.

You grant us a perpetual, worldwide, royalty-free, sublicensable license to host, copy, modify, and distribute content you upload.

Our total liability will not exceed one hundred dollars. We are not liable for any indirect, incidental, special, or consequential damages.`,

`PRIVACY POLICY — SAMPLE CIRCLE

We collect personal information, device identifiers, approximate location, browsing behavior, and cookie data. We may share personal information with affiliates, analytics providers, advertising partners, and service providers.

We retain your data for as long as necessary for business, legal, and operational purposes. Data may be transferred across borders and processed in countries with different protections.

You may opt out of targeted advertising in some cases. Continued use of the service may be treated as consent to updated practices after notice is posted online.`,

`ACADEMIC ABSTRACT — PSYCHOLOGY SAMPLE

Abstract: This study examined the relationship between sleep irregularity and working-memory performance in undergraduate participants. Methodology included a cross-sectional design, self-reported sleep logs, and computerized recall tasks.

Results were statistically significant at p < .05; however, the effect size was small. Correlation was observed between irregular sleep and performance decline, but causation could not be established. Limitations included small sample size and self-reported data.`

  ],
  legal: [
`MASTER SERVICES AGREEMENT

This Agreement shall be governed by the laws of Lagos State. Any dispute arising out of this Agreement shall be resolved by confidential binding arbitration, and the parties waive any right to trial by jury.

Customer shall indemnify, defend, and hold harmless Provider from all third-party claims arising from Customer’s use of the Services. Provider may modify pricing and service terms upon notice delivered electronically. Continued use constitutes acceptance.

Provider may terminate this Agreement for convenience upon thirty days’ notice. In no event shall Provider be liable for any indirect, incidental, special, or consequential damages.`
  ],
  privacy: [
`COOKIE AND PRIVACY NOTICE

We collect personal information, browsing activity, IP address, device identifiers, and cookie data. We may disclose personal information to service providers, affiliates, and advertising networks for analytics and targeted advertising.

Data may be stored for as long as necessary for legal, operational, and business reasons. Information may be transferred outside your country. You may have an opt-out window for certain data-sale or advertising practices.`
  ],
  medical: [
`MEDICAL CONSENT FORM

I consent to the proposed procedure and understand that risks include infection, bleeding, adverse reactions, and other complications. Alternatives have been explained to me. I understand that no warranty or guarantee has been made regarding outcomes.

I authorize the provider to take medically necessary additional steps in the event of emergency conditions discovered during treatment.`
  ],
  financial: [
`LOAN AGREEMENT SUMMARY

The Borrower promises to repay the principal balance with interest at a variable interest rate. Failure to make payment when due constitutes default. Upon default, the Lender may accelerate the loan and declare the entire balance immediately due.

The loan is secured by collateral, and the Lender holds a security interest in the collateral until all obligations are paid in full.`
  ],
  insurance: [
`INSURANCE POLICY EXCERPT

Coverage is subject to exclusions, deductibles, waiting periods, and proof-of-loss requirements. Pre-existing conditions are not covered under this policy. Failure to timely submit a claim may result in denial.

The declarations page summarizes limits, premiums, and named insured parties.`
  ],
  rental: [
`RESIDENTIAL LEASE

Tenant shall pay rent on the first day of each month. Late rent will incur a fee after a three-day grace period. Security deposit will be held for damages beyond normal wear and tear.

Landlord may enter the premises upon reasonable notice for inspection, repair, or emergency purposes. Tenant shall remain responsible for minor repairs listed in the maintenance addendum.`
  ],
  employment: [
`EMPLOYMENT AGREEMENT

Employment is at-will. Employee agrees to a non-solicitation covenant for twelve months after separation and shall not disclose confidential information or trade secrets.

Bonus awards remain in the Company’s sole discretion. Unvested equity may be forfeited upon termination of employment.`
  ],
  government: [
`OFFICIAL COMPLIANCE NOTICE

You are hereby notified that all regulated entities must comply with applicable laws, reporting rules, and audit requirements. Failure to maintain required records may result in administrative penalties or enforcement action by the agency.`
  ],
  academic: [
`JOURNAL ARTICLE EXCERPT

Introduction: Prior studies suggest a correlation between social isolation and depressive symptoms. Methodology involved a longitudinal design with repeated measures across three semesters.

Results reached statistical significance, but confidence intervals remained wide. External validity may be limited because participants were drawn from a single campus population.`
  ],
  code: [
`function createSession(token) {
  if (!token) throw new Error("Missing bearer token");
  return fetch("/api/session", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ refresh: true })
  });
}`
  ],
  science: [
`The specimen identified as Panthera leo melanochaita displayed cardiomegaly and early nephropathy. Comparative analysis of Mus musculus tissue samples showed altered mitochondrial metabolism after exposure to the compound.`
  ]
};

function getSampleForCategory() {
  const cat = document.querySelector('.cat-btn.active')?.dataset.cat || 'auto';
  const pool = SAMPLE_LIBRARY[cat] || SAMPLE_LIBRARY.auto;
  return pool[Math.floor(Math.random() * pool.length)];
}
