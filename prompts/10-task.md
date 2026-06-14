# 🚀 Task 10: Refined Hero Banner Canvas Architecture & Visual Asset Mapping

### 🔗 Context Hook & Reference
> **CRITICAL:** You are strictly bound by the design token systems and structural guardrails defined in `agent.md`. This task refines the core hero banner component to perfectly match the visual structure, layout ratios, layer mechanics, and spacing of the provided layout screenshot mockup.
> 
> You must map local asset file strings from `/public/assets/` exactly as defined below. Maintain absolute compliance with the **"0 Km" Absolute Rule**—every heading string, layout copy layer, button state description, and alternative text parameter must emphasize pristine, factory-fresh, unblemished quality. Any parameter suggesting odometer checking, vehicle wear, or pre-owned states is an automatic compilation failure.

---

### 🛠️ Step-by-Step Implementation Instructions

#### Step 10.1: Setting Up the Layered Canvas File Core
Refine or create the high-performance structural hero layout file at `src/components/home/HeroBanner.tsx`:
* **Framework Layer:** Build a highly optimized React functional component structure leveraging Next.js 16 patterns. Use explicit server component localization parameters passed via layout routing context.
* **Luxury Design Token Map:**
  * Background canvas must initialize using the rich, cinematic **Obsidian Canvas (#070807)** token palette.
  * Integrate an elegant, subtle overlay transition element blending from transparent views directly into the **Espresso Trim (#1F1C18)** base line boundaries.

#### Step 10.2: Pixel-Perfect Absolute Asset Layering
Replicate the mockup's exact depth coordinates and foreground structures using explicit Tailwind CSS layering strategies:
1. **The Botanical Eco-Base (Layer 0):** Implement an absolute background image container pulling your clean terrarium greenery asset (`/public/assets/botanical-bg.png` or equivalent local naming pattern). Apply precise CSS positioning parameters (`bottom-0 left-0 w-full object-cover pointer-events-none`) to match the screenshot layout.
2. **The Premium Vehicle Masterpiece (Layer 1):** Superimpose the brand-new electric vehicle profile asset (`/public/assets/vehicle-hero.png`) securely over the botanical canvas base. Align its layout dimensions using strict relative-to-viewport container metrics to completely eliminate layout shifts (CLS).
3. **The Cinematic Gradient Shroud (Layer 2):** Layer a soft linear gradient track (`bg-gradient-to-t from-[#070807] via-transparent to-transparent`) directly on top of the media wrappers to blend perfectly with subsequent component page sections.

#### Step 10.3: High-Fidelity Typography & Adaptive CTAs
Align the translation copy blocks with the exact spacing, font sizes, tracking metrics, and weights seen in the design preview template:
* **Primary Headline:** Render using large, high-impact tracking heights (`tracking-tight lg:text-6xl`). Hydrate with `hero.title` (*"Factory-Pristine Electric Excellence Available Globally"*), highlighting key premium text terms utilizing the gleaming **Champagne Gold (#E1C499)** token.
* **Sub-Hero Descriptive Layer:** Apply a clean neutral alignment track, hydrating with `hero.subtitle` (*"Zero kilometers. Direct diplomatic procurement and corporate fleet systems for Burundi."*).
* **Dual Interaction Target Tracks (CTAs):**
  * **Primary CTA:** Style using a solid **Skyline Crimson (#DD423F)** fill background layer. Implement smooth micro-interaction transition metrics scaling the element cleanly on focus/hover behaviors.
  * **Secondary CTA:** Style with a transparent layout structure defined by a crisp 1px border colored with the **Champagne Gold (#E1C499)** design token.

---

### 🛑 Mandatory Quality Gate & Definition of Done
1. Audit the complete implementation through your workspace's static analysis tool matching Next.js 16 execution parameters:
   ```bash
   npm run lint