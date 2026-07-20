# Source of truth releases

Release directories are immutable snapshots. Do not rewrite, rename, reformat, or normalize their files.

[`current.json`](current.json) identifies the current release and its complete artifact manifest. Consumers should read it first.

Consumers requiring reproducibility should pin a Git commit or release tag.
