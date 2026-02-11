# Documentation

프로젝트 문서 모음

## Contents
- API 스펙: `API.md`
- API 라우트 구조: `API_ROUTES.md`
- DB 스키마: `DB_SCHEMA.md`
- PostgreSQL 영속화 런북: `POSTGRES_PERSISTENCE.md`
- Windows 로컬 PostgreSQL 설치 가이드: `LOCAL_POSTGRES_SETUP_WINDOWS.md`
- 요구사항: `REQUIREMENTS.md`
- 프론트 디자인: `FRONTEND_DESIGN.md`
- Stitch 디자인 핸드오프: `STITCH_DASHBOARD_HANDOFF.md`
- 인코딩 가이드: `ENCODING.md`
- 개발 분기 로그: `DEV_BRANCH_LOG.md`
- 오늘 문서 상태 요약: `TODAY_MD_STATUS_2026-02-11.md`
- CI/Build/Test 오류 수정 리포트: `CI_BUILD_TEST_FIX_2026-02-11.md`
- 기타: `ARCHITECTURE.md`, `DEPLOYMENT.md`, `SETUP.md`, `FAQ.md`

## Wiki 동기화
GitHub Wiki는 별도 repo로 동작하므로, `docs/` 내용을 자동으로 동기화하도록 GitHub Actions를 설정했습니다.

### 초기 1회 설정
1. GitHub repo → `Settings` → `Secrets and variables` → `Actions`
2. `New repository secret` 클릭
3. 이름: `WIKI_SYNC_TOKEN`
4. 값: `repo` 권한이 있는 GitHub Personal Access Token

### 동작 방식
- `main` 브랜치에 `docs/**` 변경이 push되면 자동으로 Wiki에 반영됩니다.
- 필요 시 GitHub Actions에서 `Sync docs to wiki` 워크플로우를 수동 실행할 수 있습니다.
- `docs/README.md`는 Wiki의 `Home.md`로 자동 복사됩니다.
- `docs/` 폴더 구조를 기반으로 Wiki `_Sidebar.md`가 자동 생성됩니다.
- `_Sidebar.md` 링크 텍스트는 각 파일의 첫 줄 헤더(`# 제목`)를 사용합니다.
- `_Sidebar.md`는 API/DB/Setup/General 섹션으로 정렬됩니다.
- `docs/README.md` 하단에 `Wiki Index` 섹션이 자동 추가됩니다.
- `docs/.wikiignore`에 경로를 적으면 Wiki 동기화 대상에서 제외됩니다(한 줄에 하나).
