# AGENTS.md

This repository is governed by `ATLAS.md`.
Agents MUST read `ATLAS.md` before any action.
`ATLAS.md` is the single source of truth for agent behavior, engineering style, workflow, git rules, commits, testing, releases, and project-specific doctrine.
`DESIGN.md` is the design source referenced by `ATLAS.md`; if present, agents MUST read it before any task that affects UI, TUI, visual identity, layout, components, typography, or colors.
Before doing anything, agents MUST read `ATLAS.md`.
If `ATLAS.md` is missing, unreadable, or unclear:

→ STOP  
→ DO NOT modify files  
→ report the problem

There is no fallback behavior.
`ATLAS.md` is the only source of truth.

---

## Execution

- Do NOT infer conventions
- Do NOT adopt undocumented patterns
- Use ONLY rules defined in `ATLAS.md`

If something looks like a convention but is not defined:

→ append it to `HITL.md`  
→ do NOT use it
