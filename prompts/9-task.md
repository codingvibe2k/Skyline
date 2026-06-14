# 🚀 Task 9: Corporate Compliance Global Footer Layout

### 🔗 Context Hook & Reference
> **CRITICAL:** You are strictly bound by the design specifications outlined in `agent.md`. This global footer component must load seamlessly under hyper-restrictive 3G/4G bandwidth tolerances (Econet Leo & Lumitel) in Bujumbura. 
> 
> You are **STRICTLY FORBIDDEN** from importing external layout wrappers or heavy multi-column libraries. Maintain absolute compliance with the **"0 Km" Absolute Rule**—no text element, disclosure statement, copyright notice, or warranty footnote may imply the handling of used, pre-owned, or traded-in vehicles.

---

### 🛠️ Step-by-Step Implementation Instructions

#### Step 9.1: Architecting the Atomic Footer Frame
Create a clean, isolated structural component layout file at `src/components/layout/Footer.tsx`:
* **Framework Layer:** Build a highly performant, flat React functional layout component that natively reads the current dynamic locale string (`lang: string`) passed from its parent routing layout.
* **Luxury Design Token Mapping:**
  * Style the main container background using the rich **Obsidian Canvas (#070807)** palette fill.
  * Define a distinct, low-contrast top separation boundary using a 1px border styled with the **Espresso Trim (#1F1C18)** color token.
  * Interactive text layout links must gracefully scale state color values from soft neutral grays to the rich **Champagne Gold (#E1C499)** or vibrant **Skyline Crimson (#DD423F)** on focus/hover events.

#### Step 9.2: Integrating Multi-Lingual Compliance Links
* Implement a multi-column responsive grid that pulls data dynamically using your static translation schemas for the active locale. Structure the layout across 4 clear alignment tracks:
  1. **Corporate Fleet Hub:** Navigation anchors pointing to the pristine enterprise catalog and showroom paths.
  2. **Diplomatic Network:** Clean distribution nodes mapped to international protocol frameworks.
  3. **Sustainability Blueprint:** Quick links highlighting regional ESG charging developments in Burundi.
  4. **Legal & Compliance:** Explicit terms covering factory-backed luxury warranties and certified zero-emission performance parameters.

#### Step 9.3: Absolute Disclaimer & Metadata Audit
* Hardcode a permanent corporate copyright string localized appropriately across your languages (e.g., *"© 2026 Premium 0 Km Showroom. Factory Pristine Specifications Only."*).
* Run a programmatic scan across all static labels in this file to verify that absolutely no leakage of terms like *odometer*, *pre-owned*, *wear*, or *trade-ins* occurs.

---

### 🛑 Mandatory Quality Gate & Definition of Done
1. Audit the full workspace environment using your project's validation layer to guarantee complete type safety:
   ```bash
   npm run lint