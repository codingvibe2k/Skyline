# 🚀 Task 2: Tailwind Theme Configuration & Luxury Design Tokens

### 🔗 Context Hook & Reference
> **CRITICAL:** You are strictly bound by the rules established in `agent.md`. All custom styles must serve a ultra-premium, type-safe layout. Do not generate or include any UI fields, typography components, or utility classes referencing vehicle wear, mileage, or used-car data. Everything must reflect an unblemished, factory-fresh "0 Km" fleet delivery environment.

---

### 🛠️ Step-by-Step Implementation Instructions

#### Step 2.1: Premium Tailwind Configuration Setup
Modify your local Tailwind CSS configuration configuration file (`tailwind.config.ts` or `tailwind.config.js`) to permanently bake in the brand's verified luxury design tokens. Replace default background and accent values with the following structural layout palette:
* **Backgrounds / Deep Canvas:** Set your main dark palette to `Obsidian Canvas` (`#070807`).
* **Borders / Structural Dividers:** Set your subtle borders and structural cards to `Espresso Trim` (`#1F1C18`).
* **Brand Accents / Hero Interactions:** Map your primary system highlights to `Skyline Crimson` (`#DD423F`).
* **Badges / Premium Typography Highlights:** Map your secondary accents and enterprise badging accents to `Champagne Gold` (`#E1C499`).

Ensure these colors are extended cleanly within the Tailwind theme object so native utility classes like `bg-brand-obsidian`, `border-brand-espresso`, `text-brand-crimson`, and `text-brand-gold` are instantly available globally.

#### Step 2.2: Global CSS Injection Layer
Open your core global style ledger at `src/app/globals.css` (or your defined global stylesheet path) and implement the baseline reset properties:
* Set the default `:root` styling properties so that standard text layers defaulting to standard light modes are suppressed.
* Force the body surface rendering to utilize your newly defined background canvas (`#070807`) and global text elements to clear high-legibility contrasts suitable for rapid rendering over mobile screen boundaries under 3G/4G networks.
* Configure smooth scrolling behaviors and optimized font-rendering properties (`antialiased`).

#### Step 2.3: Premium Typography Scale Configuration
Extend the Tailwind configuration file to establish clean, scannable corporate font weights. Ensure line-height dimensions are explicitly bounded alongside font sizes to guarantee text containers never shift or break on smaller mobile viewports common among local enterprise clients in Bujumbura.

---

### 🛑 Mandatory Quality Gate & Definition of Done
1. Execute the system compilation and validation suite to ensure your extended configuration compiles smoothly under the Turbopack dev pipeline:
   ```bash
   npm run lint