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
  - M2 service files exist with deterministic logic: `supervisor/src/services/spec-review-service.ts` returns pass/revise/block based on score and findings, `supervisor/src/services/approval-policy-service.ts` escalates low-confidence documents to `needs_human`, `supervisor/src/services/progress-reconciler.ts` checks claimed stage completion, and `supervisor/src/services/stage-completion-judge.ts` converts completion criteria plus evidence count into `in_progress`/`completed`/`blocked`.
  - The currently inspected orchestrator does not yet implement the wider M2 loop described in the milestone plan: `supervisor/src/orchestrator/orchestrator.ts` handles only `session.idle` and does not emit approval or stage-assessment actions.
  - `supervisor/src/projections/session-runtime.ts` does not carry M2 review or stage-decision state, so the inspected core runtime path does not yet expose those decisions through the same surfaces.
  - The backend test run passed, which supports that the currently implemented decision helpers are at least covered by the present suite.
- Quality assessment:
  - The decision services are implemented enough to count as meaningful progress, but the inspected integration path still looks modular rather than fully loop-closed.
  - Because the orchestrator and read surfaces examined for this task do not yet show the full M2 feedback loop, later work should not assume the supervision loop is complete end-to-end.
- Remaining gaps:
  - Wire review, approval, and stage-assessment outputs through orchestration, not just isolated service helpers.
  - Surface M2 decisions through the same backend and UI paths used for operator visibility.
  - Verify that current tests are asserting integrated decision-loop behavior instead of only helper-level behavior.

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
