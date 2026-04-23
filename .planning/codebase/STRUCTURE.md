# Codebase Structure

**Analysis Date:** 2026-04-22

## Directory Layout

```
[project-root]/
├── backend/                # Go Hexagonal backend
│   ├── cmd/                # Entry points
│   └── internal/           # Private application code
│       ├── adapters/       # I/O implementations (HTTP, Redis)
│       └── core/           # Pure business logic and ports
├── frontend/               # Next.js React application
│   ├── app/                # App Router and global CSS
│   ├── components/         # React components split by domain
│   └── context/            # React Context providers
├── protos/                 # Protocol buffers (if any, for gRPC/contracts)
└── docs/                   # Technical documentation
```

## Directory Purposes

**`backend/internal/core/`:**
- Purpose: The absolute center of the Hexagonal Architecture. Must not depend on any external libraries besides standard Go.
- Contains: `domain` (entities), `ports` (interfaces), `services` (use cases).
- Key files: `backend/internal/core/domain/session.go`, `backend/internal/core/ports/repositories.go`.

**`backend/internal/adapters/`:**
- Purpose: Connects the core logic to the outside world (web framework, database).
- Contains: `handlers` (HTTP/REST controllers), `repositories` (database implementations).
- Key files: `backend/internal/adapters/handlers/http_handler.go`, `backend/internal/adapters/repositories/redis_session_repo.go`.

**`frontend/components/`:**
- Purpose: Reusable React components.
- Contains: `facade/` (the cover application screens), `portal/` (the actual secure application screens).
- Key files: `frontend/components/facade/Home.tsx`, `frontend/components/portal/Dashboard.tsx`.

## Key File Locations

**Entry Points:**
- `backend/cmd/api/main.go`: Initializes database connections, dependency injection, and starts the Fiber web server.
- `frontend/app/page.tsx`: The root frontend view managing the transition between facade and portal.

**Configuration:**
- `frontend/app/globals.css`: Global styles.

**Core Logic:**
- `backend/internal/core/services/`: All backend business rules.

## Naming Conventions

**Files:**
- Go files: `snake_case.go` (e.g., `redis_message_repo.go`)
- React components: `PascalCase.tsx` (e.g., `Dashboard.tsx`, `page.tsx` for Next.js routes)

**Directories:**
- Backend: `snake_case` (e.g., `adapters`, `cmd`)
- Frontend: `camelCase` or `kebab-case`

## Where to Add New Code

**New Backend API Endpoint:**
1. Define request/response domain structs in `backend/internal/core/domain/`.
2. Add use case interface to `backend/internal/core/ports/services.go`.
3. Implement use case in `backend/internal/core/services/`.
4. Expose HTTP route and wiring in `backend/internal/adapters/handlers/http_handler.go`.

**New Backend Database Entity:**
1. Define model in `backend/internal/core/domain/`.
2. Define repository interface in `backend/internal/core/ports/repositories.go`.
3. Implement Redis logic in `backend/internal/adapters/repositories/`.

**New Frontend View:**
- If it's part of the cover app: `frontend/components/facade/`.
- If it's part of the secure app: `frontend/components/portal/`.

## Special Directories

**`backend/internal/`:**
- Purpose: Go compiler enforces that packages inside `internal` cannot be imported by external projects.

---

*Structure analysis: 2026-04-22*
