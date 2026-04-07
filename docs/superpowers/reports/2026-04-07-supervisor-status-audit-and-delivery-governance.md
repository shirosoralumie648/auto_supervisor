# Supervisor Status Audit and Delivery Governance

## Evidence baseline

This assessment is grounded in:
- current `main` branch code under `supervisor/` and `supervisor/web/`
- repository-level `README.md`, which currently describes the project at MVP level and lists `npm --prefix supervisor test` and `npm --prefix supervisor/web test` as the published verification commands
- `docs/superpowers/specs/2026-04-05-multi-agent-supervisor-design.md`, which defines the intended multi-agent supervisor architecture, event model, decision services, and split CLI/web interfaces
- `docs/superpowers/specs/2026-04-06-supervisor-milestone-implementation-design.md`, which defines milestone acceptance criteria for M1 through M4 and warns against treating scaffold breadth or demo data as completion evidence
- `docs/superpowers/plans/2026-04-06-supervisor-milestone-delivery.md`, which records the milestone-task breakdown used to build the current first-party `supervisor/` implementation
- recent merged commits on `main`, with recent visible history in this worktree anchored by the merged supervisor MVP scaffold

## Assessment rules

- Completed means implemented, connected to the real path, validated, and safe to depend on.
- In progress means meaningful implementation exists, but key gaps remain.
- Not started means the capability exists only in design or placeholder form.
- Implemented but not yet a stable dependency means code exists, but later stages should not rely on it without hardening.

## Milestone status

### M1 — Core runtime path
- Status: In progress
- Evidence:
  - The event model and store cover the minimal runtime path: `supervisor/src/domain/events.ts` still exposes only a generic `{ type: string; payload: Record<string, unknown> }` event shape, while `supervisor/src/event-store/event-store.ts` persists ordered events and replays them from SQLite.
  - `supervisor/src/projections/session-runtime.ts` rebuilds runtime state only for `session.started` and `session.idle`, so the replayed runtime path is present but narrow.
  - `supervisor/src/orchestrator/orchestrator.ts` emits `agent.progress.requested` only when a session becomes idle, which proves one event-driven supervision trigger exists.
  - `supervisor/src/api/server.ts` and its routes still serve injected arrays rather than provider-backed projection reads, so the backend read surface is not yet connected to the event-store/projection path promised in M1 Task 7.
  - `supervisor/web/src/api/client.ts` returns hard-coded empty data, and `supervisor/web/src/pages/OverviewPage.tsx` renders a built-in sample session instead of fetching live overview data, so the web visibility path remains scaffolded rather than real.
  - Fresh verification evidence: `npm --prefix supervisor test` passed in this worktree with 9 test files and 40 tests passing.
- Quality assessment:
  - The storage and replay slice is validated by the current test suite, but the end-to-end runtime path is only partially complete because API and web surfaces are still decoupled from real projection state.
  - This is stronger than a pure placeholder because durable append/replay and one orchestration trigger exist, but it is not yet safe to treat as a stable dependency for downstream product behavior.
- Remaining gaps:
  - Tighten the event contract from generic strings to a frozen milestone vocabulary.
  - Expand runtime replay beyond started/idle handling where milestone tasks expected broader lifecycle normalization.
  - Replace array-injected API reads with projection-backed providers.
  - Replace hard-coded web placeholder data with live API-backed overview reads.

### M2 — Supervision decision loop
- Status: In progress
- Evidence:
  - The milestone plan defines M2 as the stage where supervision decisions are layered onto the event-driven core, including review, approval, progress reconciliation, stage assessment, orchestration wiring, and surfaced operator reads.
  - The current implementation still shows only a narrow integrated loop: `supervisor/src/orchestrator/orchestrator.ts` reacts to `session.idle` by emitting `agent.progress.requested`, which proves one supervision trigger exists but not the broader decision cycle promised by M2.
  - `supervisor/src/projections/session-runtime.ts` rebuilds runtime state for session start and idle transitions only; it does not yet project review outcomes, approval state, progress reports, or stage assessments into the inspected read model.
  - `supervisor/src/api/server.ts` still serves routes from injected arrays rather than projection-backed supervision state, `supervisor/web/src/api/client.ts` still returns stubbed empty data, and `supervisor/web/src/pages/OverviewPage.tsx` still renders a hard-coded sample session, so the broader M2 supervision path is not yet demonstrated through the integrated API and operator surfaces inspected for this task.
  - Fresh verification evidence: `npm --prefix supervisor test` passed in this worktree with 9 test files and 40 tests passing.
- Quality assessment:
  - The current repo supports a minimal event-driven supervision trigger, so M2 is not untouched.
  - But the inspected integrated path does not yet demonstrate review/approval/stage-decision flow through projections, API, and UI, so this milestone cannot be judged complete from the inspected files.
- Remaining gaps:
  - Extend orchestration beyond idle-triggered progress requests to the wider supervision decisions described in the milestone plan.
  - Project those decisions into runtime/read models that backend routes can serve.
  - Replace stubbed API and overview reads so operator-visible surfaces reflect real supervision state.

### M3 — Internal usability
- Status: In progress
- Evidence:
  - The plan’s M3 scope expects real internal read surfaces, but the inspected web files still show placeholder behavior: `supervisor/web/src/api/client.ts` returns empty arrays and stub objects, and `supervisor/web/src/pages/OverviewPage.tsx` renders a single hard-coded sample session.
  - `supervisor/src/api/server.ts` is structurally capable of exposing sessions/stages/reviews routes, but because it still depends on injected arrays, it does not yet provide the live internal usability baseline the milestone plan described.
  - The README currently publishes only MVP-level interfaces and basic test commands, which matches an internal scaffold more than an internally usable operator tool.
  - Fresh `npm --prefix supervisor test` evidence shows the backend codebase is testable, but that does not demonstrate usable operator workflows in the dashboard or API.
- Quality assessment:
  - Internal usability work has visible scaffolding and route/page structure, but the currently inspected operator-facing surfaces remain mostly placeholders.
  - This milestone is not empty, yet it is still too thin to call complete because a user cannot rely on the overview path for real state.
- Remaining gaps:
  - Connect overview, session detail, and roadmap views to live API data rather than sample objects.
  - Ensure API routes read from projection-backed providers so the UI reflects actual supervisor state.
  - Reconcile milestone claims with README limitations and document the real internal run path once those surfaces are live.

### M4 — Quality and release readiness
- Status: Implemented but not yet a stable dependency
- Evidence:
  - The repository README publishes the supervisor and web test commands, which provides a documented baseline verification gate.
  - Fresh evidence from this task: `npm --prefix supervisor test` passed in `/home/shirosora/code_storage/auto_supervisor/.claude/worktrees/agent-a114bf90/supervisor` with 9 test files and 40 tests passing.
  - The same test run also shows the current verification evidence gathered for this task is backend-only; Task 2 scope did not establish fresh typecheck, web test, or web build evidence.
  - Current code reality still includes placeholder API/web surfaces in `supervisor/src/api/server.ts`, `supervisor/web/src/api/client.ts`, and `supervisor/web/src/pages/OverviewPage.tsx`, so passing backend tests alone does not demonstrate release readiness.
- Quality assessment:
  - A repeatable backend test suite exists and currently passes, which is real progress toward release discipline.
  - However, release readiness is overstated if it depends on backend tests while core user-facing surfaces remain stubbed, so this milestone should be treated as implemented quality scaffolding rather than a stable release signal.
- Remaining gaps:
  - Gather and keep fresh full-gate evidence across backend tests, typecheck, web tests, and web build before claiming release readiness.
  - Remove placeholder UI/API behavior that would make a passing test suite a misleading readiness signal.
  - Align milestone completion claims with the README’s MVP framing and current operator-surface limitations.

## Module maturity and dependency readiness

### Event ingestion and runtime reconstruction
- Current status: Implemented but not yet a stable dependency.
- Evidence:
  - `supervisor/src/projections/roadmap-status.ts` derives roadmap completion by grouping session records and reducing review/stage counts, which shows a working read-model layer but one based on pre-shaped session inputs rather than replayed store state.
  - `supervisor/src/api/routes/stages.ts` and `supervisor/src/api/routes/reviews.ts` each return the arrays passed into route registration directly, so stage and review reads exist but are still provider-injected snapshots instead of runtime-backed reconstruction.
  - `supervisor/web/src/components/EventTimeline.tsx` currently renders only static text (`Event timeline`), and `supervisor/web/src/pages/SessionDetailPage.tsx` mounts that placeholder without fetching or replaying event history.
- Dependency implications:
  - Downstream dashboard and operator workflows can depend on the existence of stage/review/session shapes, but not yet on audited event-history fidelity or deterministic runtime reconstruction from source events.
  - Any later governance or analytics work that assumes replay-backed history would be premature until route providers and the session detail path read real reconstructed timelines.
- Priority: P0.

### Supervision decision services
- Current status: Implemented but not yet a stable dependency.
- Evidence:
  - `supervisor/src/services/spec-review-service.ts` maps numeric score/findings input to `pass`/`revise`/`block`, but the logic is a compact threshold function with no external policy source or repository-backed review persistence.
  - `supervisor/src/services/approval-policy-service.ts` converts review decision, document confidence, and artifact completeness into `block`/`revise`/`needs_human`/`pass`, which is real decision code but still policy-light and deterministic only over narrow inputs.
  - `supervisor/src/services/progress-reconciler.ts` reduces progress reconciliation to `claimedCompletedStages.includes(requiredStageId)`, and `supervisor/src/services/stage-completion-judge.ts` marks a stage completed only when criteria are met and evidence count is positive.
- Dependency implications:
  - These services are usable as decision primitives for milestone-grade flows, but later orchestration or governance logic should treat them as policy scaffolds rather than stable domain authorities.
  - Richer delivery controls will need persisted evidence, broader criteria, and integration with real session/review state before they can safely gate automation.
- Priority: P0.

### Spec/review document handling
- Current status: In progress.
- Evidence:
  - `supervisor/src/documents/review-spec.ts` defines the review document contract and normalizes review decisions/summaries, so document shape handling exists in code.
  - The document layer inspected for this task is schema-centric; there is no evidence in the inspected routes or pages that review specs are persisted, versioned, or surfaced end-to-end through API and dashboard paths.
  - `supervisor/src/api/routes/reviews.ts` still exposes raw injected review arrays, which means document handling is not yet coupled to a durable review-document workflow.
- Dependency implications:
  - Other modules can depend on a typed review-document shape, but not yet on stable document lifecycle behavior such as storage, retrieval provenance, or operator-visible revision history.
  - Approval/governance work that assumes review artifacts are authoritative needs more plumbing before those artifacts can anchor stage or release decisions.
- Priority: P1.

### API read surfaces
- Current status: In progress.
- Evidence:
  - `supervisor/src/api/routes/stages.ts` and `supervisor/src/api/routes/reviews.ts` expose real Fastify GET routes, proving the read-surface skeleton exists.
  - Both routes simply return arrays supplied at registration time, so the API layer is not yet independently reconstructing or querying authoritative supervisor state.
  - `supervisor/src/projections/roadmap-status.ts` provides a projection helper the API layer could use, but the inspected route files do not show that projection connected to route-level providers here.
- Dependency implications:
  - Frontend work can integrate against stable route names and broad payload categories, but should not assume those endpoints yet guarantee freshness, provenance, or full domain coverage.
  - Governance/reporting features will remain shallow until API routes are backed by durable projections rather than injected snapshots.
- Priority: P0.

### Dashboard rendering path
- Current status: In progress.
- Evidence:
  - `supervisor/web/src/pages/RoadmapStatusPage.tsx` and `supervisor/web/src/pages/SessionDetailPage.tsx` provide page shells for roadmap and session detail views.
  - `supervisor/web/src/components/StageAssessmentPanel.tsx` and `supervisor/web/src/components/EventTimeline.tsx` are still placeholders that render only section labels, so the page path exists but not the underlying operator-visible content.
  - Fresh verification evidence is mixed: `npm --prefix supervisor run typecheck` passed, but `npm --prefix supervisor/web test -- --environment jsdom` failed because `jsdom` is missing from `/home/shirosora/code_storage/auto_supervisor/.claude/worktrees/agent-a114bf90/supervisor/web/package.json`, and `npm --prefix supervisor/web run build` failed because the worktree lacks `supervisor/web/index.html` for the Vite entry module.
- Dependency implications:
  - The dashboard can serve as a navigation/frame dependency for further UI work, but not yet as a reliable operational surface for evidence review, roadmap tracking, or session forensics.
  - Stable downstream use depends on adding the missing web runtime/test dependencies and replacing placeholder panels with API-backed rendering.
- Priority: P0.

### Cross-cutting blockers
- The inspected backend read surfaces still depend on injected arrays instead of authoritative replay/projection providers (`/home/shirosora/code_storage/auto_supervisor/.claude/worktrees/agent-a114bf90/supervisor/src/api/routes/stages.ts`, `/home/shirosora/code_storage/auto_supervisor/.claude/worktrees/agent-a114bf90/supervisor/src/api/routes/reviews.ts`), which keeps both API and dashboard modules from becoming stable dependencies.
- Verification readiness is incomplete on the web side: `/home/shirosora/code_storage/auto_supervisor/.claude/worktrees/agent-a114bf90/supervisor/web/package.json` does not include `jsdom`, so the required jsdom test command fails, and the absence of `/home/shirosora/code_storage/auto_supervisor/.claude/worktrees/agent-a114bf90/supervisor/web/index.html` prevents a successful Vite build.
- Operator-facing roadmap and session-detail views remain placeholder-only (`/home/shirosora/code_storage/auto_supervisor/.claude/worktrees/agent-a114bf90/supervisor/web/src/components/StageAssessmentPanel.tsx`, `/home/shirosora/code_storage/auto_supervisor/.claude/worktrees/agent-a114bf90/supervisor/web/src/components/EventTimeline.tsx`), so even where backend logic exists, the delivered evidence path is still too thin to support governance claims.
