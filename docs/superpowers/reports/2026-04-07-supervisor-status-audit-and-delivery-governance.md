# Supervisor Status Audit and Delivery Governance

## Executive summary

### Overall status
- The repository now has a meaningful supervisor MVP baseline with real persistence, replay, decision-service logic, and operator-surface structure, but it is still transitioning from milestone-grade implementation to dependable internal system use.
- Backend verification is the strongest current signal in this execution worktree: `npm --prefix supervisor test` passed with 9 test files and 40 tests, and `npm --prefix supervisor run typecheck` passed.
- The broader quality posture is still mixed because the published README commands stop at `npm --prefix supervisor test` and `npm --prefix supervisor/web test`, while this report uses a stricter audit regression baseline that also checks backend typecheck and web build; under that broader audit baseline, the current worktree still has open web verification failures (`jsdom` missing for the web test environment and missing `supervisor/web/index.html` for the Vite build).
- Management implication: treat the project as an actively governed internal build, not a release-ready product.

### What is complete
- The evidence baseline, milestone assessment, module maturity view, blocker analysis, and staged 2–3 month roadmap are now documented from the current repository state rather than from stale milestone assumptions.
- The backend core shows real implemented capability across durable event storage, replay composition, decision-service logic, orchestration hooks, API structure, and testable CLI/dashboard seams.
- A week-based staged roadmap now exists that keeps the mixed-resource assumption intact: one primary owner can execute the path, and one to two collaborators can accelerate separable workstreams without changing the default single-owner model.

### What is still in progress
- The critical path to dependable internal usability is still in progress because operator-facing reads, supervision-state completeness, and dashboard readiness remain uneven across the inspected implementation.
- Collaboration also remains lightweight and role-based; that fits the current execution model, but review capacity and validation bandwidth can still become delivery bottlenecks if they are not planned explicitly.

### What has not started
- A fully green, repeatable release-style gate for the actual delivered operator path has not yet been established in this worktree, because the current web test and web build baselines are failing.
- A heavier-weight multi-person governance model has not started and should not be assumed; the current repo evidence supports lightweight role-based collaboration only.
- Formal expansion work beyond the current critical path should also be treated as not started for planning purposes until the operator-facing read path and verification baseline are stabilized.

### What must happen next
- Keep Stage 0 and Stage 1 priorities intact: restore the truthful web verification baseline, keep operator-facing data paths authoritative, and avoid claiming stable internal usability until the broader audit regression baseline used in this report is genuinely repeatable.
- Use role-based ownership and lightweight weekly reviews to decide whether each stage is ready to advance, whether blockers require scope restraint, and whether collaborator help is needed on UI verification, regression hardening, or documentation alignment.
- Treat the acceptance framework below as the management control layer: no stage should be called complete unless implementation evidence, verification evidence, and documented limitations all agree.

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

### M4 — Verification and delivery governance
- Status: In progress
- Evidence:
  - The repository README publishes `npm --prefix supervisor test` and `npm --prefix supervisor/web test`, which defines the current README-published verification commands.
  - Fresh evidence gathered for this report in `/home/shirosora/code_storage/auto_supervisor/.claude/worktrees/agent-a114bf90`: `npm --prefix supervisor test` passed with 9 test files and 40 tests, and `npm --prefix supervisor run typecheck` passed.
  - This report also evaluates a broader audit regression baseline beyond the README-published commands by checking the web jsdom test invocation and the web build; in the current worktree those checks still fail because `jsdom` is missing and `supervisor/web/index.html` is absent for Vite.
  - Current code reality still includes placeholder API/web surfaces in `supervisor/src/api/server.ts`, `supervisor/web/src/api/client.ts`, and `supervisor/web/src/pages/OverviewPage.tsx`, so the verification evidence supports governance visibility and discipline more than readiness for dependable internal use.
- Quality assessment:
  - The repository now has real governance inputs: documented README-published commands, a broader audit baseline for this report, and fresh backend test plus typecheck evidence.
  - But M4 should still be treated as in progress because the broader audit baseline is not yet green and the operator-facing path remains partially scaffolded, which keeps governance readiness ahead of delivered-path maturity.
- Remaining gaps:
  - Keep README-published commands and the broader audit regression baseline clearly separated in future reporting.
  - Gather and keep fresh full-baseline evidence across backend tests, typecheck, web tests, and web build before claiming stronger governance readiness.
  - Align M4 wording with the current internal-build posture until the delivered operator path and broader audit baseline both stabilize.

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
| Verification and delivery governance | In progress | README-published commands exist, and this report adds fresh backend test plus typecheck evidence under a broader audit regression baseline; that is useful governance evidence, but current web-gate failures and placeholder operator surfaces still keep the maturity signal partial. | P0 | README-published commands, broader audit regression baseline, truthful milestone/module reporting, alignment between recorded evidence and current implementation scope | Keep this row tied to observed evidence and reporting discipline; do not treat it as proof of release readiness while the broader audit baseline and delivered operator path remain incomplete. |

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

## 2–3 month delivery roadmap

### Stage 0 — Current-state convergence (2026-04-07 to 2026-04-13, Week 1)
- Objective: Re-establish a truthful baseline that matches the current milestone-grade repository state and removes ambiguity from the next execution slice.
- Deliverables:
  - confirmed README-limited MVP framing for runtime, API, CLI, and web surfaces
  - an explicit short backlog anchored to the existing blocker chain around event contracts, projection-backed reads, and placeholder operator surfaces
  - restored UI verification baseline, including resolution of the current web-build failure caused by missing `index.html` in `supervisor/web`
- Default owner: primary repository owner working on the current supervisor baseline
- Suggested collaborators:
  - contributor handling web build baseline restoration
  - contributor validating the blocker-driven next-stage backlog against current code reality
- Technical focus:
  - preserve the current repo-grounded sequence: restore trustworthy UI verification first as baseline repair, then harden the event/domain contract, then connect API routes to projection-backed providers, then replace stubbed CLI and web reads
  - keep roadmap scope constrained to milestone cleanup rather than post-M4 expansion
- Risks:
  - fixing UI or dashboard pages before API authority is established can lock in more placeholder contracts
  - treating verification-baseline repair as product-readiness completion would distort the true critical path
  - broadening scope during convergence can blur the distinction between milestone cleanup and later governance work
- Acceptance criteria:
  - web build passes again from the current repo baseline
  - the next-stage backlog is explicitly anchored to the blocker chain already documented in this report
  - event-contract hardening and projection-backed API integration are confirmed as the first product critical-path items

### Stage 1 — Stable internal usability (2026-04-14 to 2026-05-04, Weeks 2–4)
- Objective: Move the system from demonstrable milestone scaffolding to repeatable internal operator use across the core read surfaces.
- Deliverables:
  - authoritative projection-backed API reads for overview, session detail, stage, and review surfaces
  - operator-facing dashboard and CLI reads backed by real supervisor state rather than injected arrays, sample sessions, or placeholder client responses
  - session and stage projections broad enough that core operator pages reflect real runtime and supervision state
- Default owner: primary repository owner driving supervisor read-surface integration
- Suggested collaborators:
  - contributor focused on replay/provider coverage for API responses
  - contributor rewiring CLI and dashboard clients once API contracts stabilize
- Technical focus:
  - complete replay and provider coverage needed by the API first
  - land API integration before dashboard page rewiring so the UI targets stable responses
  - update CLI and dashboard clients in parallel after response contracts hold steady
  - finish with focused regression checks across backend tests, typecheck, web tests, and web build
- Risks:
  - projection breadth may still be too narrow to satisfy all operator pages, especially around review, approval, and stage state
  - UI work can appear complete while still reflecting partial read models if API contracts outpace projection completeness
  - a single-owner path may slow concurrent CLI and dashboard cleanup unless a second contributor handles one surface independently
- Acceptance criteria:
  - API routes are authoritative projection-backed reads rather than injected arrays
  - dashboard overview and session-detail paths no longer depend on sample or stub data
  - verification evidence covers backend tests, typecheck, web tests, and web build for the internally usable baseline

### Stage 2 — Fully usable critical path (2026-05-05 to 2026-06-01, Weeks 5–8)
- Objective: Close the most important end-to-end supervision gaps so the repo supports a genuinely usable runtime-to-operator critical path.
- Deliverables:
  - persisted and replayed review, approval, progress, and stage-decision outcomes in the authoritative supervision path
  - supervision orchestration extended beyond idle-triggered progress requests into the intended decision workflow
  - roadmap and detail surfaces showing actionable state, blockers, and evidence from the real system path
- Default owner: primary repository owner completing the supervision critical path
- Suggested collaborators:
  - contributor expanding persisted decision and projection support
  - contributor finishing dashboard and CLI surfaces for the broader decision state
- Technical focus:
  - first persist decision outcomes and projection support for review/approval/stage state
  - second wire orchestration to emit and consume those broader decisions
  - third finish dashboard and CLI surfaces that display the new state coherently
  - fourth run full regression gates and use failures to trim remaining critical-path gaps before expansion work
- Risks:
  - decision services may expose policy gaps once they must operate on persisted state rather than local deterministic inputs alone
  - orchestration expansion can create unclear ownership boundaries between reducers, policies, and action triggers if contracts remain loose
  - trying to finish lower-priority polish before the auditable decision loop is real could delay the only path that upgrades the project from scaffold to usable system
- Acceptance criteria:
  - review, approval, progress, and stage decisions are persisted and replayed through the authoritative read path
  - the main operator surfaces show those decisions with no placeholder-first dependency
  - the critical runtime, API, CLI, and dashboard loop is usable end to end under the current MVP limitations

### Stage 3 — Governance and expansion readiness (2026-06-02 to 2026-06-29, Weeks 9–12)
- Objective: Harden the now-usable critical path so it can support reliable iteration, clearer stage-gate decisions, and carefully scoped follow-on work.
- Deliverables:
  - tightened verification discipline, release evidence, and documentation aligned with observed behavior
  - maintainability improvements in typing, boundaries, and test depth that reduce unstable-dependency hotspots in the delivered path
  - safe expansion seams for additional operator workflows only after the core path is already dependable
- Default owner: primary repository owner maintaining delivery governance and quality gates
- Suggested collaborators:
  - contributor focused on regression-gate hardening and documentation alignment
  - contributor addressing typing, projection-coverage, and boundary-test maintainability hotspots
- Technical focus:
  - start with regression-gate hardening and documentation updates tied to the delivered critical path
  - then improve maintainability hotspots in event typing, projection coverage, and boundary tests
  - only after those controls are in place, schedule non-blocking expansion or UX polish items
- Risks:
  - quality work is easy to defer once the critical path functions, which would recreate the current gap between milestone completion and stable dependency status
  - adding expansion scope too early can dilute verification effort and reintroduce false-completion reporting
  - governance improvements can become overly process-heavy if they are not kept lightweight for the current mostly single-owner execution model
- Acceptance criteria:
  - full verification gates are repeatable and green for the real delivered path
  - module and milestone reporting can describe the system as stable for internal use without contradicting README limitations
  - remaining work is primarily enhancement or expansion, not unresolved critical-path blockers

## Governance, tracking, and quality controls

### Ownership model
- default owner: the primary repository owner remains accountable for sequencing, truthfulness of status reporting, and stage-advance decisions because the current execution model is still effectively single-owner.
- stage ownership and collaboration model:
  - Stage 0 ownership sits with the primary owner, with optional validation help from a collaborator restoring web verification or checking roadmap-to-repo alignment.
  - Stage 1 ownership remains with the primary owner for projection-backed read-path decisions, with one collaborator optionally focused on API/provider integration and one collaborator optionally focused on dashboard or CLI rewiring after contracts stabilize.
  - Stage 2 ownership remains with the primary owner for persisted decision-state and orchestration decisions, with collaborator help useful only on clearly separable projection-support and operator-surface rendering tasks.
  - Stage 3 ownership remains with the primary owner for governance, documentation alignment, and quality-gate hardening, with collaborators helping on regression hardening or maintainability hotspots rather than redefining delivery priorities.
- review-required areas:
  - changes to event vocabulary, persisted decision semantics, or projection authority should receive explicit design review before being treated as settled foundations
  - changes that alter milestone-completion criteria, README limitations, or acceptance claims should receive explicit review before being used in management reporting
  - scope additions that would move effort away from the critical path should be reviewed before work starts, not after partial implementation lands
- suggested support roles:
  - design review support for event-contract, projection-authority, and orchestration-boundary decisions
  - testing and validation support for web verification recovery, regression-gate hardening, and acceptance evidence review
  - documentation/product-clarification support for keeping README limitations, milestone claims, and report language aligned with the actual system state

### Weekly operating cadence
- weekly review inputs:
  - current stage objective and acceptance criteria from this report
  - diff between planned work for the week and what actually landed
  - fresh verification evidence from the documented regression gate
  - open blockers, newly discovered scope, and any contradictions between README limitations and current claims
- weekly decisions:
  - whether the active stage remains the right focus or needs to be narrowed back to the blocker chain
  - whether any workstream is safe to parallelize under the mixed-resource model
  - whether a blocker requires explicit escalation, design review, or a reset of milestone-completion claims
  - whether new scope should be deferred until the current stage exit gate is met
- weekly outputs:
  - a concise status note that states what changed, what remains blocked, and whether the stage is still on track
  - updated stage confidence based on current evidence rather than optimistic projection
  - a short next-step list anchored to the current stage acceptance criteria and blocker analysis

### Stage gates
- stage-entry gate:
  - the incoming stage objective is still consistent with the blocker chain and current repo evidence
  - the prerequisite outputs from the previous stage are either complete or explicitly waived with a documented reason
  - the owner and any collaborator lanes are clear enough that work can proceed without inventing new coordination structure
- stage-exit gate:
  - the stage deliverables and acceptance criteria in this report are met with repo-visible evidence
  - verification evidence is fresh enough to support the claim being made for that stage
  - known limitations and manual-supervision boundaries remain documented where they still apply
- blocker escalation:
  - escalate when a blocker invalidates the current stage plan, keeps the documented regression gate from running, or forces a change to milestone truthfulness
  - escalation should produce a concrete decision: narrow scope, add validation help, or delay the stage-advance claim until the blocker is resolved

### Quality controls
- verification baselines:
  - README-published commands: `npm --prefix supervisor test` and `npm --prefix supervisor/web test`
  - broader audit regression baseline used by this report: `npm --prefix supervisor test`, `npm --prefix supervisor run typecheck`, `npm --prefix supervisor/web test -- --environment jsdom`, and `npm --prefix supervisor/web run build`
  - current Task 5 evidence in this worktree: backend tests passed and backend typecheck passed; the web test command failed because `jsdom` is missing in the current environment, and the web build failed because `supervisor/web` is currently missing the `index.html` entry expected by Vite
  - management use: treat the README-published commands as the documentation baseline, and treat the broader audit regression baseline as the stricter acceptance lens for this report; current web-gate failures remain active risks rather than silent assumptions
- definition of done for modules:
  - the module is implemented on the real path rather than behind placeholder or sample-only behavior
  - the module is validated by the relevant portion of the broader audit regression baseline or by explicit targeted evidence when the full baseline is not yet available
  - downstream consumers can rely on the module without contradicting the README’s stated limitations
- definition of done for milestones:
  - the milestone’s key behaviors are connected end to end through the authoritative path, not just present as isolated functions or scaffold screens
  - operator-visible surfaces and documentation tell the same story as the implementation evidence
  - the milestone can be described as complete without relying on manual reinterpretation of failing or missing quality signals
- documentation requirements:
  - update README limitations, verification guidance, and milestone/report language whenever delivered behavior changes the practical operator baseline
  - record unresolved acceptance gaps explicitly instead of hiding them behind broad completion language

### Risk register
| Risk | Trigger | Impact | Mitigation | Early warning |
| --- | --- | --- | --- | --- |
| Technical implementation risk | Projection, orchestration, or decision-state work exposes gaps between current milestone scaffolding and the intended end-to-end path | Delays Stage 1 or Stage 2 completion and can force rework across API, CLI, and dashboard layers | Keep work sequenced around the existing blocker chain and require evidence-backed stage reviews before broadening scope | New fixes repeatedly reopen adjacent modules or require contract changes in multiple layers |
| Architecture drift risk | New work bypasses projection-backed authority, hardens placeholder contracts, or expands behavior without aligning to the current design/report baseline | The repo can appear to progress while moving farther from the intended supervision model | Require explicit review for event, projection, orchestration, and milestone-criteria changes before treating them as accepted foundations | UI or API work lands faster than the underlying authoritative state path matures |
| Test insufficiency risk | Passing backend checks are used as a proxy for overall readiness while web verification remains broken or incomplete | Management and engineering can overstate stability and accept false stage exits | Keep the full regression gate visible in every weekly review and treat missing web-gate coverage as an open acceptance gap | Status updates mention test success but omit the current web-test or web-build failures |
| Roadmap and goal drift risk | New enhancements, polish requests, or speculative governance work are added before the current stage acceptance criteria are met | Critical-path work slips and the roadmap stops reflecting the real highest-value sequence | Apply stage-entry and stage-exit gates strictly and defer non-critical scope until the active stage is truly complete | Weekly work includes items that do not map back to the stage objective or blocker chain |
| Single-owner bandwidth risk | The primary owner must simultaneously drive core implementation, review, verification, and documentation updates | Throughput drops and important validation or reporting work gets deferred | Use collaborators only on separable validation, UI/API, or documentation tracks while keeping final sequencing with the primary owner | Review, test, or documentation work repeatedly slips behind implementation changes |
| False-completion risk | Milestones or modules are labeled complete based on scaffold breadth, partial paths, or stale assumptions instead of current evidence | Management decisions become unreliable and later stages depend on unstable foundations | Use the report’s status classes strictly and require agreement between implementation evidence, verification evidence, and documented limitations | Completion language becomes stronger while README limitations or failing gates remain unchanged |

### Test and acceptance framework
- acceptance layers:
  - management acceptance: the executive summary, roadmap stage, and current repo evidence all tell the same story without overstating readiness
  - engineering acceptance: module status, blocker analysis, and stage deliverables are tied to concrete implementation paths rather than abstract intent
  - verification acceptance: the broader audit regression baseline used by this report is run where possible, and any failing or unavailable checks are named explicitly in the stage decision
- stage-level acceptance use:
  - Stage 0 should not exit until the baseline is truthful, the blocker chain is confirmed, and the web verification baseline is either restored or explicitly documented as an active constraint
  - Stage 1 should not exit until authoritative read paths replace placeholder-first dependencies for the main internal operator surfaces
  - Stage 2 should not exit until persisted supervision decisions and broader orchestration state are visible through the real operator path
  - Stage 3 should not exit until verification discipline, documentation alignment, and maintainability controls support repeatable internal use without contradiction, and until governance wording no longer outruns delivered-path evidence
- acceptance discipline:
  - if a command in the README-published commands fails, or if a broader audit-baseline check used by this report fails, the report should carry that failure forward as a present constraint rather than converting it into a silent assumption
  - if a milestone depends on manual supervision judgment, that boundary should remain explicit until the system evidence shows a tighter automated acceptance basis

## How to use this document

- Use the executive summary for stakeholder alignment.
- Use the milestone and module sections to decide what is actually done.
- Use the staged roadmap to prioritize the next 12 weeks of work.
- Use the governance section during weekly reviews and stage-gate decisions.
