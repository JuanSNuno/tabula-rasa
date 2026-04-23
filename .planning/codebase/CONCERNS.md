# Codebase Concerns

**Analysis Date:** 2026-04-22

## Tech Debt

**Hardcoded Configuration:**
- Issue: Hardcoded values for Redis connection, API port, and frontend API endpoints.
- Files: `backend/cmd/api/main.go`, `frontend/components/portal/EphemeralChat.tsx`
- Impact: Cannot be deployed to different environments without changing code. Difficult to configure for production.
- Fix approach: Introduce environment variables for Redis (`REDIS_URL`), API port (`PORT`), and frontend API base URL (`NEXT_PUBLIC_API_URL`).

**Ignored Errors in Services:**
- Issue: Redis save operations have their returned errors ignored using `_ =`.
- Files: `backend/internal/core/services/zk_service.go`
- Impact: Silent failures if Redis goes down or fails to save the session or ZK log update, leading to inconsistent application state and unverified sessions.
- Fix approach: Check errors and return them to the caller so they can be logged or returned as HTTP 500.

## Known Bugs

**None identified during static analysis:**
- Symptoms: N/A
- Files: N/A
- Trigger: N/A
- Workaround: N/A

## Security Considerations

**Fake Frontend Encryption (Mocked):**
- Risk: Critical data leak. The chat system claims to be secure/encrypted but uses easily reversible Base64 encoding for "encryption".
- Files: `frontend/components/portal/EphemeralChat.tsx`
- Current mitigation: None. Uses `btoa(inputText)` with prefix `ENC_`.
- Recommendations: Implement proper end-to-end encryption using WebCrypto API (e.g., AES-GCM) with public/private key exchange.

**Fake ZK Proof Verification (Simulated):**
- Risk: Authorization bypass. The Zero-Knowledge proof system simply checks if the payload length is greater than 10.
- Files: `backend/internal/core/services/zk_service.go`
- Current mitigation: None. It's explicitly noted as a mock for MVP.
- Recommendations: Integrate an actual ZK-SNARK verification library (e.g., Polygon ID) to validate proofs properly.

**Permissive CORS Policy:**
- Risk: Cross-Site Request Forgery (CSRF) or unauthorized API usage.
- Files: `backend/cmd/api/main.go`
- Current mitigation: None. `AllowOrigins: "*"` is hardcoded.
- Recommendations: Restrict CORS origins to the specific domains used by the frontend applications.

## Performance Bottlenecks

**Chat Short Polling:**
- Problem: The frontend chat component polls the backend for new messages every 3 seconds.
- Files: `frontend/components/portal/EphemeralChat.tsx`, `backend/internal/adapters/handlers/http_handler.go`, `backend/internal/core/services/chat_service.go`
- Cause: Lack of bidirectional communication channel.
- Improvement path: Migrate the chat system to WebSockets or Server-Sent Events (SSE) to eliminate polling overhead and reduce latency.

## Fragile Areas

**Redis Data Persistence (Ephemeral Assumption):**
- Files: `backend/cmd/api/main.go`
- Why fragile: The system relies strictly on Redis running without persistence (`--save ""`). If Redis is restarted, all active sessions and messages are immediately lost, requiring users to re-authenticate.
- Safe modification: Ensure this behavior is documented for operations, and consider adding a graceful session recovery mechanism if temporary disruptions occur.
- Test coverage: No tests exist to verify data expiration or system recovery.

## Scaling Limits

**HTTP Polling Overhead:**
- Current capacity: Low concurrency (bounded by HTTP request overhead and Redis connection pool).
- Limit: Short polling every 3 seconds per active client will rapidly exhaust server connections and Redis throughput as user count grows.
- Scaling path: Move to WebSockets/SSE to maintain persistent connections and push updates efficiently.

## Dependencies at Risk

**None identified:**
- Risk: N/A
- Impact: N/A
- Migration plan: N/A

## Missing Critical Features

**Actual End-to-End Encryption:**
- Problem: Missing real cryptographic implementation for messages.
- Blocks: Prevents the application from fulfilling its core privacy guarantees.

## Test Coverage Gaps

**Zero Automated Tests:**
- What's not tested: The entire codebase lacks unit, integration, and E2E tests.
- Files: All `.go`, `.ts`, and `.tsx` files.
- Risk: High risk of regressions during refactoring or adding new features. Silent failures and edge cases will go undetected.
- Priority: High. Need to introduce testing frameworks (e.g., Go `testing` package, Jest/Vitest for frontend) and write tests for core business logic first.
