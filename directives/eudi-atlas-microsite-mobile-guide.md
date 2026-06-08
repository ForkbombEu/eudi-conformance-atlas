# Mobile-Friendly Static Microsite — Build Guide

This document captures the patterns and lessons learned building the **EUDI Trust & Conformance Atlas**, an Eleventy (11ty) static site with Nunjucks templates, vanilla CSS, and vanilla JS. Use it as a reference when building a similar content-heavy microsite that must work well on both desktop and mobile.

---

## Stack choices

- **Static site generator**: Eleventy (11ty) with Nunjucks templates. Good choice for content-heavy sites where data lives in YAML/JSON files and pages are generated at build time. No React overhead.
- **CSS**: Single hand-written `style.css` with CSS custom properties (variables). No framework. Avoids the class-soup of Tailwind for a site with a clear, stable design language.
- **JS**: Vanilla only. No bundler. Three small files: `roles.js` (role filter system), `tree.js` (tree navigation), and a tiny inline script for charts. Each file is self-contained and does one thing.
- **Fonts**: Variable fonts loaded via `@font-face` from `/fonts/`. Use `font-display: swap` to avoid invisible text on slow connections.

---

## Layout and navigation

### Topbar

Keep the topbar minimal on mobile. Rules that worked:

- **Logo left, nav right** using `display: flex; justify-content: space-between`.
- **Remove low-value nav items** on mobile. "Home" is redundant if the logo links there. "About" can live in the footer.
- **Never use `overflow: hidden` on the topbar** — it clips dropdowns and floating panels.
- On very narrow screens (≤520px), let the logo take a full row and the nav wrap below it:

```css
@media (max-width: 520px) {
  .topbar { height: auto; min-height: var(--topbar-height); }
  .topbar-inner { flex-wrap: wrap; padding: 8px 16px; }
  .topbar-logo { flex-basis: 100%; }
  .topbar-nav { width: 100%; justify-content: flex-start; }
}
```

### Buttons in the topbar

If you have a contextual action button (like a "Filter" or "Role" toggle) inside the nav, it must truncate gracefully when its label is long:

```css
.action-btn {
  max-width: 120px;
  overflow: hidden;
  white-space: nowrap;
}
.action-btn-label {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80px;   /* tighten further on narrow screens */
}
```

On very narrow screens tighten these further in a media query. Also: **only show the button on pages where it actually does something**. If you have a filter button that only works on two pages, hide it on the others:

```njk
{# Nunjucks example #}
{% set activePages = ['/reference/', '/map/'] %}
{% set show = false %}
{% for p in activePages %}{% if p in page.url %}{% set show = true %}{% endif %}{% endfor %}
<button class="action-btn{% if not show %} visually-hidden{% endif %}">…</button>
```

```css
.visually-hidden { opacity: 0; pointer-events: none; }
```

---

## Charts and data visualisations

### Do not use canvas for responsive charts

`<canvas>` has a fundamental problem on mobile: its pixel dimensions are set in JS, but CSS can still stretch or squish the bitmap if `width: 100%` is applied. This causes the "psychedelic resize" effect where everything scales in real-time as the window changes size.

**Use CSS `conic-gradient` for donut/pie charts instead.** It is natively responsive, requires zero sizing logic, and degrades gracefully.

#### HTML structure

```html
<div class="chart-body">
  <div class="donut" id="my-donut"></div>
  <div class="legend">
    <div class="legend-row">
      <span class="swatch" style="background:#2d3a8c"></span>
      <span class="legend-label">Category A</span>
      <span class="legend-val">46</span>
    </div>
    <!-- repeat per category -->
  </div>
</div>
```

#### CSS

```css
.chart-body {
  display: flex;
  align-items: center;
  gap: 24px;
}

/* The donut */
.donut {
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #e5e7eb; /* fallback until JS sets the gradient */
  position: relative;
}

/* White hole = donut effect */
.donut::after {
  content: '';
  position: absolute;
  inset: 28px; /* controls hole size */
  background: white;
  border-radius: 50%;
}

/* Legend */
.legend { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 6px; }
.legend-row { display: flex; align-items: center; gap: 8px; font-size: 13px; }
.swatch { flex-shrink: 0; width: 10px; height: 10px; border-radius: 2px; }
.legend-label {
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* handles narrow screens naturally */
}
.legend-val { flex-shrink: 0; font-weight: 700; font-size: 12px; min-width: 24px; text-align: right; }
```

#### JS (minimal — just sets the gradient)

```js
function buildDonut(id, values, colors) {
  var el = document.getElementById(id);
  if (!el) return;
  var total = values.reduce(function(a,b){return a+b;}, 0);
  var deg = 0, stops = [];
  for (var i = 0; i < values.length; i++) {
    var slice = (values[i] / total) * 360;
    stops.push(colors[i] + ' ' + deg + 'deg ' + (deg+slice) + 'deg');
    deg += slice;
  }
  el.style.background = 'conic-gradient(' + stops.join(',') + ')';
}
```

Call this once on `DOMContentLoaded`. No resize handlers. No canvas. No sizing math.

#### Grid of charts: stack on mobile

```css
.chart-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  max-width: 800px; /* prevents charts becoming absurdly wide on large screens */
}

@media (max-width: 640px) {
  .chart-grid { grid-template-columns: 1fr; }
}
```

---

## Long lists and tables

### Document/card lists

Use a 2-column grid on desktop, 1-column on mobile:

```css
.card-grid { display: grid; gap: 24px; }
.card-grid-2 { grid-template-columns: repeat(2, 1fr); }
.card-grid-3 { grid-template-columns: repeat(3, 1fr); }

@media (max-width: 768px) {
  .card-grid-2, .card-grid-3 { grid-template-columns: 1fr; }
}
```

### Tables

Long tables (like a conformance test list with 189 rows) need:

1. Horizontal scroll wrapper — never let a table break the page width:

```css
.table-wrap { overflow-x: auto; }
.table-wrap table { width: 100%; min-width: 600px; }
```

2. Sticky header so column labels stay visible while scrolling:

```css
thead th {
  position: sticky;
  top: 0;
  background: var(--bg);
  z-index: 1;
}
```

3. Constrain the "description" or "name" column with `max-width` and `line-clamp` so one long entry doesn't crush the layout:

```css
.col-name {
  max-width: 420px;
  line-height: 1.4;
}
```

### Filter tabs on long lists

Use `overflow-x: auto` on the tab strip so it scrolls horizontally rather than wrapping into a mess:

```css
.tab-strip {
  display: flex;
  overflow-x: auto;
  border-bottom: 2px solid var(--border);
  /* hide scrollbar visually but keep it functional */
  scrollbar-width: none;
}
.tab-strip::-webkit-scrollbar { display: none; }

.tab { white-space: nowrap; padding: 8px 16px; }
```

---

## Panels and overlays

### Persistent side panel (e.g. role/filter selector)

A side panel that slides in from the right works well on desktop. On mobile, use the full viewport width:

```css
.side-panel {
  position: fixed;
  right: 0;
  top: var(--topbar-height);
  width: 200px;
  height: calc(100vh - var(--topbar-height));
  transform: translateX(100%);
  transition: transform 200ms ease-out;
}
.side-panel.open { transform: translateX(0); }

@media (max-width: 768px) {
  .side-panel { width: 100vw; }
  /* Don't push the page content — overlay instead */
  body.panel-open .page-content { padding-right: 0; }
}
```

**Close the panel automatically** after the user makes a selection. Don't make them tap a close button. One line of JS at the end of the selection handler:

```js
function onRoleSelected(role) {
  applyRole(role);
  closeSidePanel(); // <-- always close after selection
}
```

### Detail panel triggered by clicking a list item (e.g. tree node)

On desktop: render it as a sticky side column next to the list using CSS grid.

On mobile: render it as a **bottom sheet** — a panel that slides up from the bottom of the viewport. This is more thumb-friendly than a side panel on narrow screens:

```css
/* Desktop: column beside the tree */
.tree-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 24px;
}

@media (max-width: 768px) {
  /* Mobile: single column, detail becomes bottom sheet */
  .tree-layout { grid-template-columns: 1fr; }

  .tree-detail {
    position: fixed;
    bottom: 0; left: 0; right: 0;
    z-index: 200;
    background: white;
    border-top: 2px solid var(--border);
    border-radius: 14px 14px 0 0;
    padding: 32px 16px 16px;
    max-height: 60vh;
    overflow-y: auto;
    box-shadow: 0 -4px 24px rgba(0,0,0,0.12);
  }

  /* Always show a close button in the bottom sheet */
  .tree-detail-close {
    display: flex;
    position: absolute;
    top: 12px; right: 12px;
    width: 28px; height: 28px;
    align-items: center; justify-content: center;
    background: var(--bg-muted);
    border: 1px solid var(--border);
    border-radius: 999px;
    cursor: pointer;
  }
}

/* Hide close button on desktop */
.tree-detail-close { display: none; }
```

---

## Tree / hierarchical navigation

A collapsible tree of categories → steps → documents works well on both screen sizes because the indentation is purely CSS (`padding-left`) and items wrap naturally. Key rules:

- Top-level nodes expanded by default; lower levels collapsed.
- Expand/collapse on click of the row toggle (not just the arrow icon — the whole row).
- Add `data-search-text` on each node so a single search input can filter the whole tree with plain JS `indexOf`.
- On mobile, if clicking a leaf opens a detail panel, use the bottom sheet pattern above.

---

## Prevent horizontal overflow (the #1 mobile layout killer)

Put this on `body` and never remove it:

```css
body {
  overflow-x: hidden;
  max-width: 100vw;
}
```

And ensure the main container never adds padding that pushes content off-screen:

```css
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  box-sizing: border-box;
}
```

---

## Responsive typography

Scale down heading sizes on mobile rather than letting them overflow or wrap awkwardly:

```css
:root {
  --fs-4xl: 48px;
  --fs-3xl: 36px;
  --fs-2xl: 28px;
}

@media (max-width: 768px) {
  :root {
    --fs-4xl: 32px;
    --fs-3xl: 26px;
    --fs-2xl: 22px;
  }
}
```

Use the variables consistently on `h1`, `h2`, `h3` throughout so the scale automatically adjusts everywhere.

---

## Summary checklist

| Area | Rule |
|------|------|
| Charts | Use `conic-gradient` + CSS flex legend. Never canvas for responsive charts. |
| Chart grid | `grid-template-columns: 1fr 1fr` → `1fr` below 640px. Max-width ~800px. |
| Tables | Wrap in `overflow-x: auto`. Sticky `thead`. Constrain text columns. |
| Filter tabs | `overflow-x: auto; white-space: nowrap` on the strip. |
| Side panel | Full-width on mobile. Auto-close after selection. |
| Detail panel | Bottom sheet on mobile (`position: fixed; bottom: 0`). Always include a close button. |
| Topbar | Wrap logo + nav on ≤520px. Truncate dynamic button labels with `text-overflow: ellipsis`. Hide buttons that do nothing on the current page. |
| Overflow | `body { overflow-x: hidden; max-width: 100vw }` always. |
| Typography | CSS variables for font sizes, scaled down in a single media query. |
| Contextual buttons | Only show them on pages where they have an effect. |
