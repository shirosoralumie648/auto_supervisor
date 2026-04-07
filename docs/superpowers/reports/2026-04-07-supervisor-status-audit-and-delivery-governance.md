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

## Module maturity matrix

| Module | Status | Quality | Priority | Key dependencies | Notes |
| --- | --- | --- | --- | --- | --- |
| Event and domain model | In progress | `supervisor/src/domain/events.ts` still uses generic `type: string` and `payload: Record<string, unknown>` events, which keeps the core contract flexible but not yet hardened as a stable domain vocabulary. | P0 | Session runtime reducer, event store append/read path, orchestrator event handling | Task 2 evidence still applies here: the event path is real, but later modules still depend on stringly typed events rather than a frozen milestone vocabulary. |
| Storage and database | Implemented but not yet a stable dependency | `supervisor/src/event-store/event-store.ts` persists ordered events in SQLite and rehydrates them into `SupervisorEvent` records; durability is real, but boundary validation still depends on generic event JSON. | P0 | Database schema, event/domain model, replay pipeline | Durable append/replay is observed in code, but long-term safety still depends on hardening the event contract used at the storage boundary. |
| Projection and state rebuild | In progress | `supervisor/src/projections/replay.ts` composes session, artifact, and stage reducers, but `supervisor/src/projections/session-runtime.ts` still rebuilds only the `session.started` and `session.idle` path, so replay breadth remains partial. | P0 | Event store reads, event/domain model, reducer coverage for sessions/artifacts/stages | Projection composition exists, but the current runtime rebuild is too narrow to treat as complete state reconstruction for operator-facing workflows. |
| Adapters and runtime ingress | Implemented but not yet a stable dependency | `supervisor/src/adapters/terminal/terminal-adapter.ts` builds `claude-code` and `codex` command invocations, which demonstrates a concrete ingress seam, but the inspected evidence stops at command assembly. | P1 | Agent type vocabulary, orchestrator/runtime session flow, CLI or process launch path | Evidence supports a narrow runtime ingress primitive, not a fully exercised adapter/runtime integration layer. |
| Supervision decision services | Implemented but not yet a stable dependency | `supervisor/src/services/spec-review-service.ts`, `approval-policy-service.ts`, `progress-reconciler.ts`, and `stage-completion-judge.ts` contain real deterministic decision logic, but the policies remain narrow and are not yet shown as persisted, operator-auditable decisions across the full runtime path. | P0 | Review inputs, artifact completeness, stage evidence, orchestration hooks | Existing Task 3 evidence remains relevant: the decision primitives are real code, but they still look like milestone-grade policy scaffolding rather than final governance authority. |
| Orchestration | In progress | `supervisor/src/orchestrator/orchestrator.ts` reacts to `session.idle` by emitting `agent.progress.requested`, which proves one event-driven supervision action exists, but the orchestration loop remains much narrower than the broader decision lifecycle described in design artifacts. | P0 | Event/domain model, projection/runtime state, decision services | Safe to depend on for the current idle-trigger path only; broader review, approval, and escalation orchestration is not yet demonstrated here. |
| API read layer | In progress | `supervisor/src/api/server.ts` still builds the Fastify server around injected `sessions`, `stages`, and `reviews` arrays, so the read layer exists structurally but is not yet shown as authoritative projection-backed reads in this worktree report scope. | P0 | Projection/state rebuild, stored supervisor data, route providers | This remains a key blocker for making downstream CLI and dashboard surfaces trustworthy. |
| CLI layer | In progress | `supervisor/src/cli/main.ts` currently exposes only `formatSessions` through `createCli()`, which is a usable shell for formatting but not yet a richer operator-ready command surface. | P1 | API read layer or projection data providers, session formatting commands | The CLI exists as a minimal interface seam, but the report should treat it as early-stage internal tooling rather than a mature control surface. |
| Web dashboard | In progress | `supervisor/web/src/api/client.ts` still returns stubbed overview/session/roadmap data, while `supervisor/web/src/pages/OverviewPage.tsx`, `SessionDetailPage.tsx`, and `RoadmapStatusPage.tsx` primarily mount sample or placeholder views validated by `supervisor/web/src/dashboard.test.tsx`. | P0 | API read layer, session/detail/roadmap components, verification gates | Preserve the already gathered evidence: the inspected dashboard path is test-covered as a scaffold, but it is not yet a live operator surface. |
| Verification and delivery governance | In progress | Fresh evidence in this task is limited to `npm --prefix supervisor test` passing in this worktree, which supports an early verification baseline but not broader delivery-governance maturity. | P0 | Backend tests, truthful milestone/module reporting, alignment between recorded evidence and current implementation scope | Keep this row tied to observed verification evidence and current reporting discipline, not later-stage release or product-governance conclusions. |

## Dependency and blocker analysis

### Current blockers
- blocker: Generic event contract remains too loose for authoritative downstream state.
  - affected modules: Event and domain model; Storage and database; Projection and state rebuild; Orchestration
  - impact: Replay, storage, and orchestration all depend on `type: string` plus untyped payload maps, which makes later module contracts harder to lock down and weakens confidence in durable event semantics.
  - suggested resolution: Replace the generic event surface in `supervisor/src/domain/events.ts` with the milestone vocabulary and payload shapes the rest of the runtime already assumes, then update append/replay/orchestration callers to use that contract.
- blocker: Projection-backed read paths are not the authority for operator-facing surfaces.
  - affected modules: Projection and state rebuild; API read layer; CLI layer; Web dashboard
  - impact: `supervisor/src/api/server.ts` and related routes still rely on injected arrays, so operator surfaces cannot yet claim fresh, replayed supervisor state as their data source.
  - suggested resolution: Route API reads through replay/projection providers derived from the event store, then make CLI and web clients consume those provider-backed responses.
- blocker: Dashboard surfaces are still scaffolded around stub data and placeholder components.
  - affected modules: Web dashboard; API read layer; Verification and delivery governance
  - impact: `supervisor/web/src/api/client.ts` returns stub data, `OverviewPage.tsx` shows a sample session, and the detail/roadmap pages are still placeholder-first, so UI verification cannot be treated as proof of real internal usability.
  - suggested resolution: Replace stub client responses and placeholder page content with live API-backed overview, session-detail, and roadmap reads before using dashboard evidence in delivery-governance claims.
- blocker: Decision services are not yet fully anchored to persisted, auditable workflow state.
  - affected modules: Supervision decision services; Orchestration; Verification and delivery governance
  - impact: Review, approval, progress, and stage decisions exist as local deterministic functions, but the report scope does not show them as persisted decisions with end-to-end operator visibility, limiting their usefulness as governance controls.
  - suggested resolution: Persist decision outcomes into the event/review flow and surface them through replayed read models so governance can rely on recorded evidence instead of isolated function results.

### Safe parallelization boundaries
- workstream: Event-contract hardening and replay expansion
  - can proceed in parallel with: Dashboard rendering improvements once API contracts are kept stable; CLI ergonomics work that does not change core event semantics
  - cannot proceed before: None for initial contract design, but projection/API consumers cannot fully finalize against it until the hardened event vocabulary lands
- workstream: API provider integration
  - can proceed in parallel with: CLI layer improvements; dashboard component rendering work using stable response contracts
  - cannot proceed before: A usable projection/state source exists from stored events and reducers
- workstream: Dashboard page implementation
  - can proceed in parallel with: Decision-service hardening and CLI layer work
  - cannot proceed before: API read layer exposes authoritative overview, session detail, and roadmap data instead of injected arrays or stubs
- workstream: Decision-service policy expansion
  - can proceed in parallel with: Dashboard shell work; adapter/runtime ingress hardening
  - cannot proceed before: Persisted workflow inputs and evidence paths are defined well enough for decisions to be recorded and surfaced coherently
- workstream: Verification and governance tightening
  - can proceed in parallel with: Most implementation work as a reporting and gate-definition track
  - cannot proceed before: The underlying API/dashboard/runtime claims are real enough that verification evidence measures delivered behavior rather than scaffold health

### Key unlock chains
- capability: Authoritative operator read surfaces
  - depends on: Hardened event/domain contracts; durable event storage; broader projection/state rebuild; projection-backed API routes
  - unlocks: Trustworthy CLI reads, live web dashboard data, and stronger milestone/governance reporting
- capability: Auditable supervision decision loop
  - depends on: Persisted decision inputs and outputs; broader orchestration wiring; projection support for review/approval/stage state
  - unlocks: Real governance controls, operator-visible approval/review state, and safer automation boundaries
- capability: Internally usable dashboard
  - depends on: API read layer authority; replacement of stub client data; detail and roadmap pages rendering real session/stage/evidence content
  - unlocks: Credible M3 internal-usability claims and more meaningful web verification evidence
- capability: Delivery-governance confidence
  - depends on: Backend and web verification gates staying green, plus removal of placeholder API/dashboard behavior that currently weakens the signal
  - unlocks: Stronger stage-gate decisions, more accurate executive reporting, and safer dependence on milestone completion claims
