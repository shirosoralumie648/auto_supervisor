# auto_supervisor

auto_supervisor

## Supervisor

`supervisor/` is the active first-party implementation in this repository. It provides a milestone-driven multi-agent supervision runtime built around normalized events, durable storage, replayable projections, and operational read surfaces.

## Local verification

Install dependencies before running checks:

```bash
npm --prefix supervisor install
npm --prefix supervisor/web install
```

Run the current verification commands:

```bash
npm --prefix supervisor test
npm --prefix supervisor run typecheck
npm --prefix supervisor/web test -- --environment jsdom
npm --prefix supervisor/web run build
```

## Demonstration flow

A minimal internal demonstration should show:

1. a real adapter path emitting normalized events
2. events being persisted and replayed into projection state
3. `/sessions`, `/sessions/:sessionId`, `/stages`, and `/reviews` serving live state
4. the CLI session view and dashboard pages rendering that live state

## Regression gate

Before calling a milestone complete, run:

```bash
npm --prefix supervisor test
npm --prefix supervisor run typecheck
npm --prefix supervisor/web test -- --environment jsdom
npm --prefix supervisor/web run build
```

## Known limitations

- the dashboard currently reads a fixed `session-1` detail view rather than routing between sessions
- the HTTP surfaces in `supervisor/src/api/` are provider-backed test seams, not a packaged long-running server bootstrap yet
- manual supervision judgment remains the source of truth for milestone completion and review acceptance

## Release-candidate checklist

- core supervisor tests pass
- typecheck passes
- dashboard tests pass
- dashboard build passes
- known limitations and manual supervision boundaries are documented
