# Credimi design assets

`src/css/style.css` is the unchanged runtime copy of `HITL/style.css` (SHA-256 `ff452337f866cae1060057a8c417752b5a9767f59b748c9c7cde509c638387c7`). The regular logo is `src/assets/credimi_logo.svg` (SHA-256 `031885760a9165e9d8d49eab45baca30ba5ed8dd1fbf0b4699fba2de5dc4feac`) and is used on light surfaces and as `/assets/credimi_logo.svg` favicon. The negative logo is `src/assets/credimi_logo_negative.svg` (SHA-256 `32df33f9f5ffa696d452e1f65f5d6738b920415c5114db4b010af1f997a8cb3a`) and is used only in the dark footer.

`css/app.css` loads after the shared foundation and is limited to Atlas-specific layout. Update an HITL input intentionally, then synchronize its runtime copy.
