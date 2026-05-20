# EUDI Trust & Conformance Atlas

A community-maintained map of EUDI Wallet law, implementing acts, ARF requirements, WE BUILD trust work, and conformance-evidence mappings.

Lightly maintained by **Credimi / Forkbomb BV** under the NGI TRUSTCHAIN programme.

## License

Apache-2.0

## Build

```sh
npm ci
npm run build
```

Output goes to `_site/`.

## Data

Source data in `data/`:
- `eudi-documents-map.yaml` — 48 documents with logical groups and reading routes
- `evidence-claims-registry.yaml` — 37 evidence claims across 8 profiles
- `conformance-result.schema.json` — JSON Schema for evidence results
- `trust-helper-backlog.md` — Architecture and backlog for trust-helper

## Development

```sh
npm start    # Run dev server
npm test     # Validate data files
```
