# 🚀 Combined Task 11 & 12: Parametric Filter Matrix & National Context Information Grids

### 🔗 Context Hook & Reference

> **CRITICAL ARCHITECTURAL COMPLIANCE:** You are operating under the strict parameters defined in `agent.md`. You must exclusively apply the analyzed brand tokens: Skyline Crimson (`#DD423F`), Champagne Gold (`#E1C499`), Obsidian Canvas (`#070807`), and Espresso Trim (`#1F1C18`). Every component must feature a ultra-lightweight hydration footprint optimized for local Bujumbura networks (Econet Leo & Lumitel 3G/4G bands) to prevent Cumulative Layout Shift (CLS).
>
> **🛑 THE "0 KM" ABSOLUTE RULE WARNING:** You are strictly forbidden from writing code, arrays, translation keys, dropdown items, filter labels, or layout text that reference: "mileage", "odometer", "used cars", "pre-owned", "wear and tear", "scratches", or "trade-ins". This interactive matrix and grid must focus completely on factory-fresh engineering parameters (e.g., power output, battery capacity class, autonomous charging tier, solar system integration options, and pristine manufacturer warranties).

---

### 🛠️ Step-by-Step Implementation Instructions

#### Step 1: Update Multilingual Locale Dictionaries

Before creating the UI components, extend the four core operating language dictionary configuration schemas (`src/dictionaries/en.json`, `fr.json`, `sw.json`, `rn.json`) to include identical structural fields for the filter matrix and socio-economic sections.

- **Filter Blocks (`home.filter`):** Structural keys for labels and dropdown options. Include `powertrain` (EV, PHEV, Solar-Synced Induction), `bodyStyle` (Premium SUV, Executive Sedan, Heavy-Duty Fleet Hauler), `rangeClass` (Urban Short-Range, Inter-Province Extended, Continental Peak), and a confirmation call-to-action button string (`"Search Zero-Km Fleet"`).
- **Context Blocks (`home.context`):** Structural content mapping out high-net-worth economic contexts for Burundi. Provide a block title, section subtitles, and a 3-part card array mapping:
  1.  _Urban Grid Independence:_ Mitigating Bujumbura Regideso utility blackouts via private photovoltaic charging buffers.
  2.  _Diplomatic Fleet Exemptions:_ Highlighting international zero-emission tax breaks, special registration fast-tracking, and zero import duties on brand-new 0 Km clean technology.
  3.  _Fuel-to-Solar Cost Alpha:_ The operational macroeconomic leverage of utilizing local renewable solar generation vs hyper-volatile imported fossil fuel infrastructure.

#### Step 2: Build the Parametric Filter Dropdown Selector Matrix

Create a flat, hyper-optimized `'use client'` interactive panel at `src/components/home/ParametricFilter.tsx`:

- **Layout:** A horizontal floating glassmorphism control panel component intended to overlay or sit immediately beneath the homepage Hero Banner. Use a solid background of `bg-brand-obsidian` with high-contrast structural borders utilizing `border-brand-espresso`.
- **Interactivity:** Implement local standard React states to track the selected value of each option. Dropdown options must be rendered using flat native semantic elements or highly optimized accessible UI divs utilizing zero heavy external custom libraries.
- **Action Mapping:** Clicking the primary submit CTA button must perform a clean `router.push()` mapping the local choice values directly to standard multi-parametric client query strings (e.g., `/[lang]/showroom?powertrain=ev&body=suv&range=extended`), perfectly setting up future catalog states without introducing heavy client-side calculations.
- Apply hover visual feedback states utilizing transitions with accents in `text-brand-gold` and `bg-brand-crimson`.

#### Step 3: Build the Socio-Economic National Context Information Grids

Create a Next.js Server Component (RSC) at `src/components/home/NationalContextGrid.tsx`:

- **Layout:** A responsive 3-column structural layout grid wrapping pristine visual context blocks highlighting regional luxury ownership benefits.
- **Styling:** Frame each element within an explicit `border-brand-espresso` layout shell backed by a premium low-contrast inner depth look. Headers must flash `text-brand-gold` coupled with pristine paragraph readability in high-end platinum or muted white text variants.
- **Assets:** Incorporate Lucide React premium iconography tokens (`Zap`, `Globe`, `SunDim`) customized with unified clean scale styling to align with the sustainable "Save the Green Project" core aesthetics.

#### Step 4: Inject Elements into the Core App Routing Shell

Open the primary multilingual page router route layout file located at `src/app/[lang]/page.tsx`:

- Import the newly written modular components (`ParametricFilter` and `NationalContextGrid`) into the view tree layout structure.
- Nest the `ParametricFilter` directly below your previously finalized `HeroBanner` block, followed by a clean structural container layer layout hosting the `NationalContextGrid` presentation zone.
- Ensure that the async locale dictionary dictionary loader parameter payload data object (`dict`) is accurately threaded into both custom elements to render translations smoothly with zero hydration flicker over network bands.

---

### 🛑 Mandatory Quality Gate & Definition of Done

1. **Compilation Pass & Syntactical Cleansing:**
   Execute your workspace local linting checking compiler command inside the root folder:
   ```bash
   npm run lint
   ``