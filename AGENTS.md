# AGENTS.md - LOVAPE Repository Rules

## Scope
These rules apply to the whole repository.

## Step Discipline
1. Work in short checkpoints only.
2. One step = one branch `step-*` + one atomic commit + one tag `checkpoint-*`.
3. Update `docs/STATE.md` at the end of each step.
4. If scope changes, update memory docs first:
   - `docs/SPEC.md`
   - `docs/ROUTES.md`
   - `docs/DATA_MODEL.md`
   - `docs/NFR.md`

## Command safety
Always set these variables for automated runs:
1. `CI=1`
2. `NEXT_TELEMETRY_DISABLED=1`
3. `HUSKY=0`
4. `npm_config_fund=false`
5. `npm_config_audit=false`

Rules:
1. Never use `npm run build`; always use `npm run build:guard`.
2. Never run `npm run dev` without explicit user request.
3. Never use watch mode in automated validation unless explicitly requested.

Timeout protocol (`exit code 124`):
1. Stop immediately.
2. Keep the latest coherent state.
3. Diagnose with:
   - `npm run lint`
   - `npm run typecheck`
   - environment variables
   - build logs
4. Update `docs/STATE.md` with findings before continuing.

## Compliance Constraints
1. Age-gate is mandatory.
2. No pods, podmods, puffs, jetables, or disposables.
3. No aggressive marketing mechanics.
4. Keep legal warnings visible.

