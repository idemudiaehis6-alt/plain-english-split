# Forensic Fix Notes

## Probe output

```
{
  "file": "01_terms_of_service.txt",
  "routeToCode": false,
  "dominant": "legal",
  "normalized": {
    "legal": 0.33,
    "privacy": 0,
    "financial": 0,
    "rental": 0,
    "employment": 0,
    "technical": 0,
    "science": 0,
    "code": 0.33
  },
  "docType": "Code / Technical Snippet",
  "flags": [
    {
      "label": "Unilateral rule changes",
      "match": "may modify these Terms"
    },
    {
      "label": "Class action waiver",
      "match": "waive the right to a jury trial and participation in any class action"
    },
    {
      "label": "Jury trial waiver",
      "match": "waive the right to a jury trial"
    },
    {
      "label": "One-sided termination power",
      "match": "terminate your account at any time"
    },
    {
      "label": "Mandatory arbitration",
      "match": "binding arbitration"
    },
    {
      "label": "Automatic renewal",
      "match": "automatically renew"
    },
    {
      "label": "Refund limits",
      "match": "Fees are nonrefundable"
    },
    {
      "label": "Extremely broad license grant",
      "match": "perpetual"
    },
    {
      "label": "Sole discretion wording",
      "match": "sole discretion"
    },
    {
      "label": "Transferable content rights",
      "match": "sublicensable"
    }
  ]
}
{
  "file": "09_api_reference.txt",
  "routeToCode": false,
  "dominant": "technical",
  "normalized": {
    "legal": 0,
    "privacy": 0,
    "financial": 0,
    "rental": 0,
    "employment": 0,
    "technical": 2.5,
    "science": 0,
    "code": 0
  },
  "docType": "Developer / API Documentation",
  "flags": [
    {
      "label": "Asset-backed risk",
      "match": "lien"
    }
  ]
}

```

## Final regression

Pass rate: **11/12**.

### Remaining failures
- `01_terms_of_service.txt` → got **Code / Technical Snippet**, missing flags: none