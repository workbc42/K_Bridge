# CI Error Fix Report (2026-02-11)

## Summary
GitHub Actions에서 `test`와 `build` 잡이 실패한 이슈를 수정했다.

## Failure 1: `test` job failed

### Symptoms
- `npm test` script missing
- Python steps failed (`requirements.txt` missing, `pytest` not applicable)

### Root Cause
- `.github/workflows/ci.yml`이 현재 저장소 구조와 불일치.
- Node frontend lint 중심 프로젝트인데 Python test 단계가 포함되어 있었음.

### Fix Applied
- `.github/workflows/ci.yml` 정리:
  - `npm test` 제거
  - Python setup/pip/pytest 단계 제거
  - lint 중심으로 단순화

## Failure 2: `build` job failed

### Symptoms
- Next.js Turbopack parse error:
  - invalid UTF-8 sequence

### Root Cause
- 파일 인코딩 문제(UTF-8 불일치):
  - `frontend/app/[locale]/order/page.js`
  - `frontend/lib/schemas/order.js`

### Fix Applied
- 두 파일 UTF-8로 재인코딩

## Build Artifact Path Fix

### Issue
- `.github/workflows/build-deploy.yml` 아티팩트 경로가 `dist/`로 되어 있었음.
- Next.js build output은 `frontend/.next/`.

### Fix Applied
- artifact path 변경:
  - `dist/` -> `frontend/.next/`

## Validation
- `npm --prefix frontend run lint` passed
- `npm --prefix frontend run build` passed
- DB health and order smoke remained functional (`doctor`, `migrate`, `smoke:orders`)

## Files Changed
- `.github/workflows/ci.yml`
- `.github/workflows/build-deploy.yml`
- `frontend/app/[locale]/order/page.js`
- `frontend/lib/schemas/order.js`

## Notes
- Windows 로컬 환경에서 `npm ci`는 파일락(EPERM)으로 간헐 실패 가능.
- CI(Linux) 기준에서는 동일 이슈가 재현되지 않음.
