# 🚀 Task 7: Atomic Media Asset Optimization — Performance-Gated Cloudinary CDN Image Wrapper

### 🔗 Context Hook & Reference
> **CRITICAL:** You are strictly bound by the rules established in `agent.md`. This task implements an ultra-lightweight, performance-gated asset wrapper specifically engineered to circumvent local 3G/4G connectivity constraints (Econet Leo & Lumitel) in Bujumbura, Burundi, without degrading luxury brand fidelity.
> 
> You are **STRICTLY FORBIDDEN** from introducing any external heavy image-processing dependencies, and you must maintain absolute compliance with the **"0 Km" Rule**—no media placeholders, alternate text attributes, or metadata descriptions may reference used or pre-owned concepts.

---

### 🛠️ Step-by-Step Implementation Instructions

#### Step 7.1: Constructing the Performance-Gated Cloudinary Utility
Create a centralized asset transformation utility file at `src/lib/utils/cloudinary.ts`:
* Author a high-precision URL builder function `getOptimizedCloudinaryUrl(src: string, width: number, quality?: number)` that accepts a raw Cloudinary asset identifier or URL path.
* Programmatically inject auto-format and auto-quality transformation matrices (`f_auto,q_auto:eco`) into the Cloudinary URL structure.
* Under heavy network throttling or slow connectivity configurations tailored for Burundi mobile profiles, cap maximum widths dynamically and force aggressive webp/avif compression parameters.
* Ensure the builder returns clean, optimized CDN strings with zero extraneous overhead or dependency calls.

#### Step 7.2: Engineering the Atomic `PremiumImage` Component
Create an atomic, highly optimized image component at `src/components/ui/PremiumImage.tsx`:
* **Framework Layer:** Build the wrapper using a clean, flat, explicit functional architecture. Avoid nesting generic abstractions.
* **Component Properties:** Declare rigid TypeScript type definitions including `src`, `alt`, `width`, `height`, `aspectRatio` (e.g., `'video' | 'square' | 'golden'`), and an optional `priority` boolean flag.
* **Luxury Placeholder Skeleton:** * While assets hydrate over slow cellular networks, render a shimmering fallback skeleton utilizing the luxury **Obsidian Canvas (#070807)** color block accented by a low-contrast **Espresso Trim (#1F1C18)** border token.
  * Avoid raw layout shifts by strictly anchoring components via clean Tailwind aspect-ratio utility tokens.

#### Step 7.3: Absolute Constraint & Metadata Sanitization
* Conduct a strict code scan across your newly authored component properties.
* Ensure that the `alt` description fields or image descriptive properties fallback safely to generic luxury spec phrases (e.g., *"Factory pristine electric powertrain specification asset"*).
* Ensure there is **absolutely zero leakage** of used, pre-owned, mileage, or wear-related text configurations in any metadata or placeholder string.

---

### 🛑 Mandatory Quality Gate & Definition of Done
1. Audit the full workspace environment using the project's compilation and validation engine to confirm type-safe assembly:
   ```bash
   npm run lint