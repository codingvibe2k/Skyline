# 🚀 Task 1: Workspace Initialization & Next.js 16 Edge i18n Router

### 🔗 Context Hook & Reference
> **CRITICAL:** Before generating any code or executing commands, read and completely ingest `agent.md` at the root of the repository. You are strictly bound by its brand design tokens, visual screenshot layout rules, performance guidelines, and the zero-dependency rule.

---

### 🛠️ Step-by-Step Implementation Instructions

#### Step 1.1: Next.js 16 Environment Bootstrapping
Initialize your code workspace leveraging Next.js 16 and React 19 standards:
- Enable **TypeScript** and **Tailwind CSS**.
- Set up a clean `src/` directory tree layout using the standard App Router configuration.
- Adjust your execution execution scripts in `package.json` to leverage the lightning-fast **Turbopack** compiler runtime option (`next dev --turbo`).

#### Step 1.2: Internationalization Routing Structure
Implement language sub-path isolation for the 4 core operating locales (`en`, `fr`, `sw`, `rn`):
- Nest all your upcoming application content views beneath a dynamic path group structure: `src/app/[lang]/layout.tsx` and `src/app/[lang]/page.tsx`.

#### Step 1.3: Native Next.js 16 `src/proxy.ts` Routing Engine
Create the core edge network interceptor file at `src/proxy.ts` to manage internationalization path rewriting automatically:
- Export a native configuration matcher that skips standard public static assets (`/assets`, `_next/static`, `_next/image`, `favicon.ico`).
- Program the `proxy` routing function to scan incoming request headers (`Accept-Language`) or cookies to determine if a locale is missing from the request path. If missing, automatically perform a clean `NextResponse.redirect` or internal rewrite to prepend the appropriate default locale string (`/fr` or `/en`).

---

### 🛑 Mandatory Quality Gate & Definition of Done
1. Execute the system compilation and validation suite:
   ```bash
   npm run lint
   ```
2. Verify that **zero lint errors** (red)**, warnings (yellow), or TypeScript type-checking issues** are present in the terminal output.
3. Confirm the `proxy.ts` file correctly routes traffic by making a relative request for the homepage **without** a language prefix. The system must automatically redirect or rewrite the URL to include the correct default locale (`/fr` or `/en`).
4. **Log the successful completion** of this task by updating `progress_tracker.md` with a concise 3-5 line summary of the changes, confirmation of the clean lint status, and the next sequential task.