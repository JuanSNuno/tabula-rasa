# Architecture

**Analysis Date:** 2026-04-22

## Pattern Overview

**Overall:** Hexagonal Architecture (Ports and Adapters) for Backend & Dual-Mode React Architecture for Frontend.

**Key Characteristics:**
- **Backend:** Strict separation of concerns (Domain, Ports, Services, Adapters). Business logic is isolated from framework and infrastructure details.
- **Frontend:** "Facade vs. Portal" dual UI state driven by a global security context.
- **Persistence:** Ephemeral memory-first architecture relying on non-persistent Redis ("Zero-Logs").

## Layers

**Backend Domain (`backend/internal/core/domain`):**
- Purpose: Defines core business entities (`message.go`, `session.go`, `zk_proof_log.go`).
- Depends on: Nothing (pure logic).
- Used by: Services and Adapters.

**Backend Ports (`backend/internal/core/ports`):**
- Purpose: Interfaces defining input (Use Cases/Services) and output (Repositories).
- Depends on: Domain.
- Used by: Services and Adapters.

**Backend Services (`backend/internal/core/services`):**
- Purpose: Application business rules / Use Cases (e.g., `CreateSessionService`, `VerifyProofService`).
- Depends on: Domain, Ports.
- Used by: Network Handlers.

**Backend Adapters (`backend/internal/adapters`):**
- Purpose: Implementations of external interactions (Fiber HTTP handlers, Redis Repositories).
- Depends on: Ports, Domain, External Libs (`gofiber`, `go-redis`).
- Used by: Infrastructure/Entry point setup.

**Frontend View Layer (`frontend/components`):**
- Purpose: Presentational UI, heavily divided between `facade` (cover app) and `portal` (secure app).
- Depends on: Global state/context.

## Data Flow

**HTTP Request Lifecycle (Backend):**
1. HTTP Request hits Fiber router in `backend/internal/adapters/handlers/http_handler.go`.
2. Handler parses payload and calls the relevant port interface implemented by `backend/internal/core/services`.
3. Service executes business rules using entities from `backend/internal/core/domain`.
4. Service invokes data persistence via `backend/internal/core/ports/repositories.go`.
5. The `repositories` adapter (`backend/internal/adapters/repositories`) interacts with Redis to store/retrieve ephemeral data.
6. Service returns domain result to Handler, which formats the HTTP response.

**State Management:**
- **Frontend:** React Context (`frontend/context/SecurityModeContext.tsx`) controls the `isClandestine` state.
- **Backend:** Ephemeral Redis storage configured to reject disk persistence (`--save ""` and `--appendonly no`).

## Key Abstractions

**Dual-UI Mode:**
- Purpose: Switches the frontend entirely between a dummy facade and the actual portal.
- Examples: `frontend/app/page.tsx`
- Pattern: Conditional rendering based on Context.

**Ports/Interfaces:**
- Purpose: Decouple infrastructure from core logic.
- Examples: `backend/internal/core/ports/repositories.go`
- Pattern: Dependency Inversion.

## Entry Points

**Backend HTTP Server:**
- Location: `backend/cmd/api/main.go`
- Triggers: CLI execution (`go run main.go`).
- Responsibilities: Wires up dependencies (Redis, Repos, Services, Fiber), mounts HTTP routes, starts server with graceful shutdown.

**Frontend App:**
- Location: `frontend/app/page.tsx`
- Triggers: User navigation.
- Responsibilities: Renders root view, conditionally showing `PortalDashboard` or Facade screens.

## Error Handling

**Strategy:** Explicit Go error returns in backend; HTTP handler mapping.

**Patterns:**
- Services return `(Type, error)`
- Handlers catch errors and map to standard JSON HTTP responses.

## Cross-Cutting Concerns

**Logging:** Ephemeral console logging via Go `log` and Fiber `logger` middleware. No disk logs.
**Validation:** Domain level validation before repository execution.
**Storage:** Strictly in-memory Redis, actively configured against data retention.

---

*Architecture analysis: 2026-04-22*
