# Maheeb Portfolio - replit.md

## Overview

This is a personal portfolio website for "Maheeb" — a beginner Python developer, graphic designer, and ethical hacker interested in data science. The app is a single-page portfolio with sections for projects, extracurricular activities (ECA), and blog posts.

The architecture is a full-stack TypeScript monorepo with:
- A React frontend (Vite + Tailwind + shadcn/ui)
- An Express.js backend serving REST API endpoints
- PostgreSQL database via Drizzle ORM
- A shared schema layer used by both client and server

The UI is dark-mode only with a neon purple accent color scheme, using custom Google Fonts (Space Grotesk, JetBrains Mono, Inter).

---

## User Preferences

Preferred communication style: Simple, everyday language.

---

## System Architecture

### Frontend Architecture

- **Framework**: React 18 with TypeScript, bundled via Vite
- **Routing**: `wouter` for lightweight client-side routing (single route `/` renders the Portfolio page; a 404 fallback exists)
- **State/Data Fetching**: TanStack Query (React Query v5) for server state, with a custom `queryClient` in `client/src/lib/queryClient.ts`
- **UI Components**: shadcn/ui (New York style) — all component files live in `client/src/components/ui/`. Uses Radix UI primitives under the hood.
- **Styling**: Tailwind CSS v4 with CSS variables for theming. Dark-only theme — no light mode. Custom neon purple primary color. Custom fonts loaded from Google Fonts.
- **Animations**: Framer Motion used in the Portfolio page for staggered entrance animations.
- **Component Aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend Architecture

- **Framework**: Express.js running on Node.js with TypeScript (via `tsx` in dev, esbuild in production)
- **Entry Point**: `server/index.ts` creates an HTTP server, registers routes, and in development uses Vite middleware (via `server/vite.ts`). In production, serves static files from `dist/public`.
- **API Layer**: `server/routes.ts` defines REST endpoints:
  - `GET/POST /api/projects`
  - `GET/POST /api/eca`
  - `GET/POST /api/blog`
- **Storage Layer**: `server/storage.ts` defines an `IStorage` interface with a `DatabaseStorage` class that uses Drizzle ORM. This makes it easy to swap implementations.
- **Database Connection**: `server/db.ts` connects to PostgreSQL using `pg.Pool` and the `DATABASE_URL` env variable.

### Data Layer / Schema

- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema file**: `shared/schema.ts` — shared between client and server
- **Tables**:
  - `users` — id (UUID), username, password
  - `projects` — id, title, description, tags (text array), link, linkText
  - `eca_items` — id, role, org, year, description
  - `blog_posts` — id, title, date, excerpt
- **Validation**: `drizzle-zod` generates Zod schemas from Drizzle table definitions for request validation in routes.
- **Migrations**: Drizzle Kit manages migrations in `./migrations/`, using `db:push` for schema sync.

### Build System

- **Dev**: `tsx` runs the Express server directly; Vite runs as middleware inside Express for HMR
- **Production Build**: `script/build.ts` runs Vite (client) then esbuild (server), bundling a curated allowlist of server dependencies for faster cold starts. Output goes to `dist/`.

### Replit-Specific Integrations

- `@replit/vite-plugin-runtime-error-modal` — shows runtime errors as overlays in dev
- `@replit/vite-plugin-cartographer` — Replit dev tooling (dev only)
- `@replit/vite-plugin-dev-banner` — dev banner (dev only)
- `vite-plugin-meta-images.ts` — custom plugin that rewrites og:image/twitter:image meta tags to use the correct Replit deployment domain at build time

---

## External Dependencies

### Database
- **PostgreSQL** — Required. Must be provisioned and `DATABASE_URL` env variable must be set before running.
- **drizzle-orm / drizzle-kit** — ORM and migration tooling
- **connect-pg-simple** — PostgreSQL session store (imported in package but session auth not fully wired in current routes)

### UI / Frontend Libraries
- **Radix UI** — Headless accessible component primitives (full suite installed)
- **shadcn/ui** — Component library built on Radix + Tailwind (New York style)
- **Framer Motion** — Animation library used in Portfolio page
- **TanStack React Query v5** — Server state management
- **wouter** — Minimal React router
- **lucide-react** — Icon library
- **class-variance-authority + clsx + tailwind-merge** — Utility-first class management

### Fonts
- Google Fonts: Space Grotesk (headers), JetBrains Mono (code), Inter (body) — loaded via `<link>` in `index.html`

### Build / Dev Tools
- **Vite** — Frontend build tool and dev server
- **tsx** — TypeScript execution for server in development
- **esbuild** — Server bundling for production
- **Tailwind CSS v4** — Utility CSS framework
- **TypeScript** — Strict mode enabled across client, server, and shared

### Environment Variables Required
- `DATABASE_URL` — PostgreSQL connection string (required at startup; app throws if missing)