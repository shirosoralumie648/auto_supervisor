# auto_supervisor

auto_supervisor

## Supervisor MVP

The Supervisor MVP pairs a backend supervisor app with a web dashboard for monitoring and control.

Planned interfaces:
- CLI/TUI control plane in `supervisor/src/cli`
- HTTP API in `supervisor/src/api`
- Web dashboard in `supervisor/web`

Test commands:
- `npm --prefix supervisor test`
- `npm --prefix supervisor/web test`
