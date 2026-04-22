# External Integrations

**Analysis Date:** 2026-04-22

## APIs & External Services

**None detected:**
- The application relies entirely on internal custom services and does not integrate with external third-party REST APIs or external cloud SDKs based on the codebase scan.

## Data Storage

**Databases:**
- Redis
  - Connection: Hardcoded `localhost:6379` in `backend/cmd/api/main.go`, but labeled "Usar env var en producción".
  - Client: `github.com/redis/go-redis/v9`.
  - Architecture relies on a non-persistent ephemeral model. Must run with `--save ""` and `--appendonly no`.

**File Storage:**
- Local filesystem only

**Caching:**
- None externalized beyond the ephemeral state maintained natively via Redis for active sessions (`backend/internal/adapters/repositories/`).

## Authentication & Identity

**Auth Provider:**
- Custom (Zero Knowledge Proof System)
  - Implementation: Custom ZKP simulation logic in the UI (`frontend/components/portal/ZkScanner.tsx`) and strict verification in the core (`backend/internal/core/services/zk_service.go`).
  - Sessions are managed locally and tracked via Redis (`backend/internal/core/services/session_service.go`).

## Monitoring & Observability

**Error Tracking:**
- None detected natively. No Sentry/Datadog or similar telemetry is configured.

**Logs:**
- Fiber Logger Middleware (`github.com/gofiber/fiber/v2/middleware/logger`) natively in `backend/cmd/api/main.go`.
- Designed for stealth operations (`DisableStartupMessage: true`).

## CI/CD & Deployment

**Hosting:**
- Not strictly defined in the repository (no Dockerfiles, Terraform, or platform-specific CI workflows detected). Expected generic Next.js + Go Binary hosting environments.

**CI Pipeline:**
- None detected (`.github/workflows`, `.gitlab-ci.yml`, etc. are absent).

## Environment Configuration

**Required env vars:**
- Implicitly `PORT` or similar standard Go environment variables for the HTTP server in `backend/cmd/api/main.go` and `frontend/package.json` scripts.
- Future requirements for Redis connection strings (e.g., `REDIS_URL` or explicit host/port configurations) to replace hardcoded `localhost`.

**Secrets location:**
- Not detected in source control. No `.env` template or active `.env` configuration files.

## Webhooks & Callbacks

**Incoming:**
- None detected

**Outgoing:**
- None detected

---

*Integration audit: 2026-04-22*