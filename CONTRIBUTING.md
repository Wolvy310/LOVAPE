# Contributing

## 1) Workflow
1. Create a branch: `step-<name>`.
2. Keep changes atomic and focused.
3. Update docs memory first when scope changes:
   - `docs/SPEC.md`
   - `docs/ROUTES.md`
   - `docs/DATA_MODEL.md`
   - `docs/NFR.md`
4. Update `docs/STATE.md` in every step.
5. Create checkpoint tag: `checkpoint-<name>`.

## 2) Local setup
```powershell
npm install
Copy-Item .env.example .env
```

## 3) Validation before PR
```powershell
$env:CI='1'
$env:NEXT_TELEMETRY_DISABLED='1'
$env:HUSKY='0'
$env:npm_config_fund='false'
$env:npm_config_audit='false'

npm run lint
npm run typecheck
npm test
npm run build:guard
```

## 4) Command safety
1. Never run `npm run build` for checks. Use `npm run build:guard`.
2. Never run `npm run dev` unless explicitly requested.
3. If a guarded command exits with `124`, stop and diagnose.

## 5) Definition of Done (step level)
1. Lint/typecheck/tests/build guard pass.
2. Docs are updated.
3. No secrets committed.
4. Vape constraints respected (no pods/puffs/jetables/disposables).

