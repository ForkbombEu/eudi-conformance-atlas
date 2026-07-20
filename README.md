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

Atlas-specific document data remains in `data/eudi-documents-map.yaml`. Canonical conformance data is selected by `data/source-of-truth/current.json`; consumers should read that manifest first and pin a Git commit or release tag for reproducibility.

## Development

```sh
npm start    # Run dev server
npm test     # Validate data files
```
