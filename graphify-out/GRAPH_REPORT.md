# Graph Report - C:/Striver_Website/striver-web  (2026-05-16)

## Corpus Check
- Large corpus: 126 files ╖ ~2,847,175 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 147 nodes · 124 edges · 33 communities (19 shown, 14 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Homepage & Features|Homepage & Features]]
- [[_COMMUNITY_Package Dependencies|Package Dependencies]]
- [[_COMMUNITY_Fitness Quiz|Fitness Quiz]]
- [[_COMMUNITY_Auth & Navigation|Auth & Navigation]]
- [[_COMMUNITY_Project Setup & Docs|Project Setup & Docs]]
- [[_COMMUNITY_Auth API & Email Validation|Auth API & Email Validation]]
- [[_COMMUNITY_App Layout & Scroll|App Layout & Scroll]]
- [[_COMMUNITY_Shop Page|Shop Page]]
- [[_COMMUNITY_Build Scripts|Build Scripts]]
- [[_COMMUNITY_Path Aliases Config|Path Aliases Config]]
- [[_COMMUNITY_Vercel Deployment|Vercel Deployment]]
- [[_COMMUNITY_Claude Hooks Config|Claude Hooks Config]]
- [[_COMMUNITY_Claude Permissions|Claude Permissions]]
- [[_COMMUNITY_Gym Environment|Gym Environment]]
- [[_COMMUNITY_Office Environment|Office Environment]]
- [[_COMMUNITY_Accessories Page|Accessories Page]]
- [[_COMMUNITY_Home Environment|Home Environment]]
- [[_COMMUNITY_How It Works|How It Works]]
- [[_COMMUNITY_Project Instructions|Project Instructions]]
- [[_COMMUNITY_Supabase Server Client|Supabase Server Client]]
- [[_COMMUNITY_Supabase Client|Supabase Client]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]

## God Nodes (most connected - your core abstractions)
1. `dependencies` - 8 edges
2. `Project Overview (README)` - 6 edges
3. `scripts` - 5 edges
4. `POST()` - 4 edges
5. `useAuth()` - 4 edges
6. `devDependencies` - 3 edges
7. `Next.js Framework` - 3 edges
8. `Vercel Deployment Platform` - 3 edges
9. `compilerOptions` - 2 edges
10. `paths` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Project Overview (README)` --references--> `app/page.js Entry Page`  [EXTRACTED]
  README.md → app/page.js
- `Vercel Configuration Info` --references--> `Vercel Deployment Platform`  [EXTRACTED]
  .vercel/README.txt → README.md
- `Login()` --calls--> `useAuth()`  [INFERRED]
  src/app/login/page.js → src/context/AuthContext.js
- `Signup()` --calls--> `useAuth()`  [INFERRED]
  src/app/signup/page.js → src/context/AuthContext.js
- `Navbar()` --calls--> `useAuth()`  [INFERRED]
  src/components/Navbar/Navbar.js → src/context/AuthContext.js

## Communities (33 total, 14 thin omitted)

### Community 0 - "Homepage & Features"
Cohesion: 0.11
Nodes (4): NAV_ITEMS, cardsData, features, images

### Community 1 - "Package Dependencies"
Cohesion: 0.13
Nodes (14): dependencies, gsap, next, react, react-dom, react-icons, @supabase/ssr, @supabase/supabase-js (+6 more)

### Community 3 - "Auth & Navigation"
Cohesion: 0.18
Nodes (6): AuthContext, useAuth(), Login(), NAV_ITEMS, Navbar(), Signup()

### Community 4 - "Project Setup & Docs"
Cohesion: 0.36
Nodes (8): app/page.js Entry Page, create-next-app Bootstrapper, Geist Font Family, next/font Optimization, Next.js Framework, Project Overview (README), Vercel Deployment Platform, Vercel Configuration Info

### Community 5 - "Auth API & Email Validation"
Cohesion: 0.53
Nodes (5): DISPOSABLE_DOMAINS, getSupabaseAdmin(), hasValidMX(), isValidEmailFormat(), POST()

### Community 7 - "Shop Page"
Cohesion: 0.4
Nodes (3): FAQS, SLIDER_IMAGES, SPECS

### Community 8 - "Build Scripts"
Cohesion: 0.4
Nodes (5): scripts, build, dev, lint, start

### Community 10 - "Path Aliases Config"
Cohesion: 0.5
Nodes (3): compilerOptions, paths, @/*

### Community 11 - "Vercel Deployment"
Cohesion: 0.5
Nodes (3): orgId, projectId, projectName

## Knowledge Gaps
- **46 isolated node(s):** `eslintConfig`, `@/*`, `nextConfig`, `name`, `version` (+41 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 3 inferred relationships involving `useAuth()` (e.g. with `Login()` and `Signup()`) actually correct?**
  _`useAuth()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `eslintConfig`, `@/*`, `nextConfig` to the rest of the system?**
  _47 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Homepage & Features` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._
- **Should `Package Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.13 - nodes in this community are weakly interconnected._