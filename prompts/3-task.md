# 🚀 Task 3: Translation System — Static Localization Dictionary Schemas

### 🔗 Context Hook & Reference
> **CRITICAL:** You are strictly bound by the architectural guardrails in `agent.md`. You must build this localization system from scratch using pure TypeScript/JavaScript. **DO NOT install any external i18n libraries** (e.g., `next-intl`, `react-i18next`). Everything must be ultra-lightweight, native to Next.js 16 Server Components, and highly optimized for mobile loading limits in Bujumbura.
> 
> **THE 0 KM METRIC LOCK:** All dictionary terms across English, French, Swahili, and Kirundi must focus entirely on *factory-fresh*, *showroom-grade* premium electric vehicles. Ensure absolutely zero translations or labels exist for "mileage", "odometer", "used", "pre-owned", or "wear and tear".

---

### 🛠️ Step-by-Step Implementation Instructions

#### Step 3.1: Create Static JSON Translation Dictionaries
Create a clean directory tree at `src/dictionaries/` to store your static localization datasets. Generate four distinct language files:
1. `src/dictionaries/en.json` (English)
2. `src/dictionaries/fr.json` (French)
3. `src/dictionaries/sw.json` (Swahili)
4. `src/dictionaries/rn.json` (Kirundi)

Each dictionary must contain key-value pairs mapping foundational interface sections for your high-net-worth enterprise clients, specifically capturing:
* **Hero Section:** High-performance messaging, zero-emission corporate efficiency, brand-new arrivals.
* **Navigation Labels:** Fleet Showroom, Charging Grid, Inquiries, Control Center.
* **Vehicle Properties:** Battery Pack, Operating Range, Peak Power, On-Board Computer, Factory Warranty (instead of mileage/odometer fields).
* **Network / Infrastructure:** Station Status, Charger Connection, High-Voltage Power Output.

*Ensure all files have identical structural nesting keys so they remain fully interchangeable in code.*

#### Step 3.2: Type-Safe Dictionary Dynamic Loader
Create a core loading utility at `src/lib/get-dictionary.ts` (or `src/dictionaries.ts`) to handle localization hydration elegantly inside Next.js 16 Server Components:
* Define a strict TypeScript type or interface matching the dictionary schema structure.
* Implement an asynchronous loader mapping object containing dynamic import expressions for each locale option:
  ```typescript
  const dictionaries = {
    en: () => import('@/dictionaries/en.json').then((module) => module.default),
    fr: () => import('@/dictionaries/fr.json').then((module) => module.default),
    sw: () => import('@/dictionaries/sw.json').then((module) => module.default),
    rn: () => import('@/dictionaries/rn.json').then((module) => module.default),
  };