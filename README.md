# EUDI Trust & Conformance Atlas

## Intro

EUDI Trust & Conformance Atlas is a static reference site that maps EUDI Wallet law, architecture requirements, trust work, standards, and conformance evidence. It makes the relationships between source documents, test inventory, and evidence easier to browse without becoming an API service or source-of-truth editor.

Every document carries an adoption status (in force, adopted, published, final, draft, in development, proposal, superseded), an optional status date and, where relevant, the versions pinned by the FCAF draft suite, the ARF essential-standards list and HAIP 1.0. Promotional blocks for the Credimi platform, which is run by the atlas maintainers, are labelled "From the maintainers".

## Technical specs

The site is built with Eleventy and Nunjucks. Its canonical data selection is manifest-driven through `data/source-of-truth/current.json`; document and evidence data remain under `data/` and `content/`.

- `data/eudi-documents-map.yaml`: documents with `status`, quoted `status_date`, optional `status_note`, `pinned_versions` and `arf_essential_for`. The top-level `changelog` lists the documents added and updated in each review.
- `src/_data/docTypes.js`: the single list of document types, stack layers and statuses. It is used by templates, filters, the map tree and `scripts/validate-data.mjs`.

## HOW to run

Tasks are defined in `mise.toml`; `mise tasks` lists them.

```sh
mise install       # Node
mise run install   # npm ci
mise run test      # validate data, evidence and design assets
mise run fmt       # Prettier; files it must skip are listed in .prettierignore
mise run lint      # formatting check + DESIGN.md lint
mise run build     # writes _site/
mise run dev       # http://localhost:8080 with live reload
```

## Quick GUI guide

### Home

Shows the rulebook stack, key figures, the regulatory radar (every document as a dot placed by stack layer and status), a diagram of who publishes the rules for which actors, the latest status changes and the Credimi platform offer. The visuals are SVG generated at build time from `src/_data/documents.js`; no client-side charting.

### Map

Browse the EUDI ecosystem map by task and use role filters where available. Leaves show each document's status.

### Reference and Tests

Use **Reference** to filter all documents by stack layer, status, type, new or updated in this edition, and ARF essential, or by free text (`?q=`, `?stack=` and `?role=` preselect filters). Use **Tests** to inspect the conformance inventory and related evidence.

### Radar

Shows the radar, a momentum chart of status changes per half-year, what the latest review added and updated, drafts and proposals in the pipeline, latest versions against pinned versions, and a dated timeline.

### Data

Use **Data** for source-data access. The Atlas deliberately has no API documentation or OpenAPI endpoint.
