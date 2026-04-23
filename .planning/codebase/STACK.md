# Technology Stack

**Analysis Date:** 2026-04-22

## Languages

**Primary:**
- TypeScript 5 - Used extensively throughout the frontend React application (`frontend/`).
- Go 1.26.2 - Used for high-performance core backend services (`backend/`).

**Secondary:**
- HTML/CSS - Managed via React/Next.js components and Tailwind CSS.

## Runtime

**Environment:**
- Node.js 20 - Frontend execution and build system.
- Go Runtime - Backend execution.

**Package Manager:**
- npm - Frontend package management.
- Lockfile: `frontend/package-lock.json` present.
- go modules - Backend dependency management (`backend/go.mod`).

## Frameworks

**Core:**
- Next.js 14.2.3 - Core frontend framework providing routing, React environment, and server-side logic (`frontend/`).
- React 18 - UI library.
- Fiber v2 (`github.com/gofiber/fiber/v2`) - Core backend HTTP framework (`backend/cmd/api/main.go`). Configured in "stealth mode" (`DisableStartupMessage: true`).

**Testing:**
- Not detected. No testing frameworks configured in `go.mod` or `frontend/package.json`.

**Build/Dev:**
- Tailwind CSS 3.3.0 - Utility-first styling (`frontend/tailwind.config.ts`).
- PostCSS 8 - CSS build pipeline (`frontend/postcss.config.js`).
- Autoprefixer 10.0.1 - Plugin for CSS cross-browser support.

## Key Dependencies

**Critical:**
- `github.com/redis/go-redis/v9` - Highly critical Redis client for ephemeral state, sessions, and Zero-Knowledge proof logs. The system cannot operate without it.

**Infrastructure:**
- No external cloud SDKs or infrastructure-as-code dependencies detected.

## Configuration

**Environment:**
- Standard Go configurations inside `backend/cmd/api/main.go` (currently relying on explicit internal setups rather than extensive ENV usage).
- No standard `.env` configuration files present, ensuring minimal footprint.

**Build:**
- `frontend/tsconfig.json` - TypeScript compiler parameters.
- `frontend/tailwind.config.ts` - Tailwind design system configuration.
- `backend/go.mod` - Go dependency map.

## Platform Requirements

**Development:**
- Node.js v20+
- Go 1.26+
- Redis Server (Must be run as an ephemeral store without persistence: `redis-server --save "" --appendonly no`)

**Production:**
- Node.js runtime / Next.js hosting provider for frontend.
- Compiled Go binary.
- Dedicated non-persistent Redis instance (currently defaults to `localhost:6379` but requires ENV variable mapping for deployment).

---

*Stack analysis: 2026-04-22*