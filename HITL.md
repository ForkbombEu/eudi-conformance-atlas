# HITL.md

## ⚠️ Human In The Loop

This file contains observations that require human validation.

It is a controlled buffer between:

- agent discovery
- human decision
- doctrine (`BARIO.md`)

---

## Rules

- entries are NOT authoritative
- entries MUST NOT influence agent decisions
- this file is **write-only for agents**
- only humans may promote entries into `BARIO.md`

Agents MUST:

- append new valid observations
- NEVER modify or delete existing entries
- keep entries minimal and factual

---

## Constraints

Only add an entry if:

- the pattern appears at least twice
- it may impact architecture, naming, or workflow

If unsure:

→ DO NOT add  
→ DO NOT assume

---

## Entry Template

- id: hitl-XXXX
- observation:
- location:
- evidence:
- rationale:

---

## Entries

- id: hitl-0001
- observation: Required validation tooling is missing for pre-commit checks.
- location: repository root
- evidence: `task lint` fails with `task: command not found`; `Taskfile.yml` and `mise.toml` are absent.
- rationale: `BARIO.md` requires formatting and linting before commits, with required tools declared in `mise.toml`.

- id: hitl-0002
- observation: Repository formatting rule is missing.
- location: repository root
- evidence: `Taskfile.yml` defines `lint` and `lint:design`, but no formatting task or formatter is defined.
- rationale: `BARIO.md` requires formatting through a repository-defined formatter before commits.

- id: hitl-0003
- observation: No documented rule for vendor promotion on Atlas pages.
- location: src/_includes/components/credimi.njk; src/contribute.njk
- evidence: `contribute.njk` forbids vendor marketing links "unless clearly marked and justified"; Credimi CTA blocks now appear on home, reference, radar, map, tests, evidence, document and about pages, each labelled "From the maintainers".
- rationale: Promotion placement and wording affect the site's neutrality claim; a human should confirm the policy.

- id: hitl-0004
- observation: Inline `style=` attributes remain in several templates.
- location: src/tests.njk, src/data.njk, src/about.njk, src/contribute.njk, src/evidence-page.njk, src/js/tree.js
- evidence: the redesigned pages moved styling into `src/css/app.css`; the files listed still use inline `style=` for layout.
- rationale: No rule in `BARIO.md` says whether inline styles are allowed; it affects how the design layer is maintained.

- id: hitl-0005
- observation: Tasks moved from `Taskfile.yml` to `mise.toml` `[tasks]` at the user's request; `BARIO.md` still requires `Taskfile.yml`, `task lint` and `task = "latest"`.
- location: mise.toml; directives/BARIO.md (Default Expectations, Git Behavior, Taskfile, Design Source, Standard Go mise.toml)
- evidence: `Taskfile.yml` deleted; `mise run lint`, `mise run test` and `mise run dev` pass; `task` removed from `[tools]`.
- rationale: Doctrine and repository now disagree; a human should update `BARIO.md` to `mise run` or restore the Taskfile.

- id: hitl-0006
- observation: Prettier added as the repository formatter (`mise run fmt`, checked by `mise run lint`), resolving the gap recorded in hitl-0002.
- location: mise.toml, package.json (prettier pinned exact), .prettierignore
- evidence: byte-pinned inputs (HITL/, src/css/style.css, src/assets/, data/source-of-truth/) and governance files (directives/, AGENTS.md, HITL.md) are excluded; `.njk` is excluded because Prettier has no Nunjucks parser.
- rationale: `BARIO.md` should name the formatter so the rule is documented, not just configured.
