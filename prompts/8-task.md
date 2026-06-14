# 🚀 Task 8: Multi-Lingual Layout Navigation Header Matrix

### 🔗 Context Hook & Reference

> **CRITICAL:** You are strictly bound by the architectural rules established in `agent.md`. This navigation hub must be fully responsive, highly performant under slow mobile networks (Econet Leo / Lumitel 3G/4G), and seamlessly pull from your static localization dictionaries (`en`, `fr`, `sw`, `rn`) established in Phase 1.
>
> You are **STRICTLY FORBIDDEN** from introducing third-party mobile menu managers or state-heavy libraries. Use native React state flags. Maintain absolute compliance with the **"0 Km" Absolute Rule**—no label, hovering tooltip, sub-navigation text, or translation link may refer to pre-owned or mileage features.

---

### 🛠️ Step-by-Step Implementation Instructions

#### Step 8.1: Constructing the Modular Navigation Structure

Create a dedicated structural component layout file at `src/components/layout/Header.tsx`:

- **Framework Layer:** Build this layout as a flat, pristine component receiving the current active locale (`lang: string`) as a prop directly from your internationalization routing layout layer.
- **Luxury Design Tokens Mapping:** \* Apply the ultra-premium cinematic **Obsidian Canvas (#070807)** color token as the primary header background fill.
  - Inject a crisp, hairline low-contrast bottom boundary outline utilizing the **Espresso Trim (#1F1C18)** color token.
  - Links must transition flawlessly between a clean neutral slate and the sophisticated **Champagne Gold (#E1C499)** token on mouse hover state or active selection flags.

#### Step 8.2: Localization Integration & Explicit Path Management

- Map navigation anchor fields dynamically to prevent static string duplication. The main menu nodes must resolve using translation dictionaries for four clear sections:
  1. _Showroom / Fleet Overview_ (e.g., `nav.showroom`)
  2. _Charging Network GIS Map_ (e.g., `nav.network`)
  3. _Corporate Fleet Intake Room_ (e.g., `nav.fleet`)
  4. _Diplomatic Service Hub_ (e.g., `nav.diplomatic`)
- Ensure the path targets dynamically prefix the current lang route variable (e.g., href={`/${lang}/showroom`}).

#### Step 8.3: Localized Language Switcher Matrix

- Implement a low-overhead localized selection modal/toggle system within the header block.
- Provide clean, instant redirection paths that exchange the `[lang]` parameter segment without resetting user view parameters.
- Use lightweight explicit abbreviations: `EN` | `FR` | `SW` | `RN`.

#### Step 8.4: Adaptive Responsive Design Gate

- Implement an ultra-lightweight, CSS-driven responsive layout structure:
  - On large desktop screens, layout links horizontally inline with appropriate luxury spacing rules.
  - On mobile viewpoints, hide the inline row and toggle an overlay component using a simple, explicit click state powered by native `lucide-react` icons (`Menu` and `X`).
  - Ensure the active overlay uses the strict **Obsidian Canvas (#070807)** styling rule to maintain continuous visual fidelity.

---

### 🛑 Mandatory Quality Gate & Definition of Done

1. Audit the full workspace environment using the lint and compilation engines to confirm type-safe assembly:
   ```bash
   npm run lint
   ```
