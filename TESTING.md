# Testing Pack

This folder gives you realistic sample documents to pressure-test the rule-based engine.

## How to use
Open the app and either paste a file from `test-data/` or click the sample button by category.

## What to look for
The app should get three things mostly right:
1. The document family
2. The main flags
3. The explanation family for those flags

## Priority checks
- `10_academic_with_code.txt` should not be flattened into pure academic prose. It should lean code or mixed.
- `11_developer_terms_hybrid.txt` should feel hybrid, not just API docs.
- `08_academic_abstract.txt` should raise research-caution style warnings, not legal panic.
- `09_api_reference.txt` should avoid fake legal drama just because technical terms appear.

## Regression notes
The current engine is strongest on:
- Terms / contracts
- Privacy
- Financial / insurance
- Employment
- Rental
- Academic caution
- Developer/API boundaries

The current engine is weaker on:
- unusual custom drafting
- jurisdiction-specific legal nuance
- deeply cross-referenced documents
- tables / appendices that carry core meaning
