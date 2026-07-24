# EUDI Trust & Conformance Atlas

## Intro

EUDI Trust & Conformance Atlas is a static reference site that maps EUDI Wallet law, architecture requirements, trust work, standards, and conformance evidence. It makes the relationships between source documents, test inventory, and evidence easier to browse without becoming an API service or source-of-truth editor.

## Technical specs

The site is built with Eleventy and Nunjucks. Its canonical data selection is manifest-driven through `data/source-of-truth/current.json`; document and evidence data remain under `data/` and `content/`.

## HOW to run

```sh
npm ci
npm test
npm run build
npm start
```

The generated static site is written to `_site/`.

## Quick GUI guide

### Map

Browse the EUDI ecosystem map and use role filters where available.

### Reference and Tests

Use **Reference** to explore source documents and **Tests** to inspect the conformance inventory and related evidence.

### Data

Use **Data** for source-data access. The Atlas deliberately has no API documentation or OpenAPI endpoint.
