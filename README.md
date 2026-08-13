# Employee 360° Dashboard (BPJS Ketenagakerjaan)

A dark/light themed React dashboard that visualizes an employer's risk profile (risk score, workforce & wage trends, contribution compliance, timeline, and an AI summary). The UI is fully **data-driven**: every displayed number is computed from raw inputs, not hardcoded.

## Tech stack

- **React 19** + **Vite 8** (JSX, no TypeScript)
- **Recharts** — line charts
- **lucide-react** — UI icons
- **Oxlint** — linting

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Vite dev server (HMR) |
| `npm run build` | Production build to `dist/` |
| `npm run lint` | Run oxlint |
| `npm run preview` | Preview the production build |

## How data flows

```
src/data/seedEmployer.js          raw inputs (single source of truth)
        │  fetched by
        ▼
src/api/mockEmployerApi.js        async service (simulated latency, swappable for real API)
        │  loaded via
        ▼
src/hooks/useEmployerData.js      hook → { loading, error, data, refresh }
        │  derived with
        ▼
src/lib/calculations.js           deriveDashboardData(raw) → all display values
        │  consumed by
        ▼
src/components/**                  presentational components (receive derived data as props)
```

**To change the data**, edit `src/data/seedEmployer.js` — every chart, score, and percentage recalculates automatically.

**To connect a real backend**, replace `fetchEmployerSnapshot()` in `src/api/mockEmployerApi.js` (keep the same return shape). No component changes needed.

## Directory map

| Path | Purpose |
|---|---|
| `src/data/seedEmployer.js` | Raw inputs: company profile, monthly worker counts, monthly avg salaries (rupiah), workforce categories, contribution payment records (due/paid dates), risk indicators (value + weight + icon key), timeline events, AI summary text, risk-score config |
| `src/api/mockEmployerApi.js` | Async data layer; returns a deep clone of the seed after a short delay |
| `src/hooks/useEmployerData.js` | React hook wrapping the API + derivation; exposes `loading` / `error` / `data` / `refresh` |
| `src/lib/calculations.js` | Pure math: weighted risk score, grade, percentile, YoY %, donut percentages, compliance status from dates, risk levels, AI recommendations, chart axis domains |
| `src/lib/format.js` | Formatters: Indonesian month labels, number/percent (comma decimals), short Rupiah (`Rp 5,6 Juta`), datetime |
| `src/theme/` | Dark/light theme system (see below) |
| `src/components/layout/` | `Sidebar` (BPJS logo + nav), `TopHeader` (back link, theme toggle, last-updated, refresh/download) |
| `src/components/common/` | Reusable: `Panel`, `SectionTitle`, `DonutChart`, `ComplianceIcon`, `CustomTooltip`, `RiskBadge` |
| `src/components/overview/` | The Overview tab panels: company profile card, risk summary, worker/salary trend panels, compliance status, timeline, workforce composition, AI summary, tab bar |
| `src/assets/icons/` | Risk-summary SVGs (inline-rendered via `?raw` imports) |
| `src/assets/bpjs_logo/`, `src/assets/company_logo.svg` | Brand logos |
| `src/Employer360Dashboard.jsx` | Composition root: loads data, renders loading/error/overview states, handles tab state |

## Key concepts

### Derived math (never hardcode displayed values)
`deriveDashboardData()` in `src/lib/calculations.js` computes all display values from the seed:

- **Risk score** — weighted sum of `riskIndicators[].value × weight` (82/100 for the sample).
- **Grade** — `scoreToGrade()` thresholds (higher score = worse: 82 → E).
- **National percentile** — `scoreToPercentile()` (82 → "Top 8%").
- **YoY %** — `yoyPercent(current, baseline)` using a year-earlier baseline row (e.g. Mei 2023 vs Mei 2024 → −38.2%).
- **Donut percentages** — `pct(count, total)` from category counts.
- **Compliance status** — `complianceStatus(record, asOf)` compares `paidDate` vs `dueDate` → `lunas` / `late` / `overdue`.
- **Risk levels** — `riskLevelFromValue(value)` thresholds → Sangat Tinggi / Tinggi / Sedang / Rendah; `scoreRiskTier(score)` collapses those to a 3-tier **High / Medium / Low** used by the Skor Risiko card.
- **AI recommendations** — generated from the highest-weighted risk indicators.

### Theming
- `src/theme/themes.js` — token palettes for `dark` and `light` (surfaces, borders, text tiers, accents, risk/success colors, donut stroke). Level/tier/grade-dependent tokens: `riskIconBg` (per risk level, tint for the Ringkasan Risiko icon chips), `gradeBg` (per grade A–F), and `tierBg` / `tierColor` (per High/Medium/Low).
- Components pull colors via `useTheme()` → `const { theme: t } = useTheme()`. **Never hardcode a surface/text color**; use a theme token instead.
- `src/theme/ThemeContext.jsx` — provider; persists choice to `localStorage("bpjs-theme")`, sets `data-theme` on `<html>`, and plays a crossfade wipe on toggle.
- `src/components/layout/ThemeToggle.jsx` — the switch in the header.

### Risk-summary icons
- `src/data/seedEmployer.js` → `riskIndicators[].icon` holds a **key** (`"audit"`, `"workforce-management"`, `"trend-two"`, `"risk-analysis-outline"`, `"compliance-audit"`).
- `src/components/overview/RiskSummary.jsx` maps each key to an SVG imported with `?raw` and inlines it (the SVGs use `currentColor`, so they tint to each item's risk color). Unknown keys fall back to rendering the raw string (e.g. an emoji).

### Logos
- Sidebar brand logo: `src/assets/bpjs_logo/BPJS_Ketenagakerjaan_idnYNJg5Qq_1.svg`.
- Company logotype: `src/assets/company_logo.svg` (rendered on a white chip because its fill is dark).

## Editing checklist

1. **Change displayed data** → `src/data/seedEmployer.js`.
2. **Change a formula/label logic** → `src/lib/calculations.js`.
3. **Restyle/relayout a panel** → its file under `src/components/overview/` (colors via `useTheme` tokens).
4. **Change risk icons** → drop a file in `src/assets/icons/` and add/swap a `?raw` import + key in `RiskSummary.jsx`.
5. **Add a new panel** → create it under `src/components/overview/`, add the derived data in `deriveDashboardData()`, and mount it in `src/Employer360Dashboard.jsx`.
6. **Non-Overview tabs** are placeholders (`TabPlaceholder`) — wire them up by branching on `activeTab` in the composition root.
