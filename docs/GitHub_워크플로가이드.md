# K_Bridge GitHub 워크플로 가이드

**스타트업 웹 프로젝트 최적화**  
*GitHub Flow + 협업 체계 완성판*

***

## 📋 1. 브랜치 전략 (GitHub Flow)

```
main      : 프로덕션 배포 가능 코드 (직접 push 금지)
├── develop: 통합 테스트 브랜치 (옵션)
├── feature/이슈번호-설명
│   └── feature/12-user-auth
├── bugfix/이슈번호-설명  
│   └── bugfix/15-api-error
└── hotfix/버전-설명
    └── hotfix/v1.0.1-payment
```

**사용 순서**  
```
1. Issue 생성 → feature/ 브랜치 생성
2. 작업 완료 → PR to develop/main  
3. 리뷰 → Approve → Merge → 브랜치 삭제
```

**설정**: Settings > Branches > main/develop 보호규칙 추가  
`- Require pull request reviews (1명)`  
`- Require status checks to pass`

***

## 🏷️ 2. Issue 라벨 체계

**Settings > Labels에서 생성 (색상 포함)**

| 카테고리 | 라벨 | 색상 | 용도 |
|----------|------|------|------|
| **Type** | `type:bug` | `#d73a4a` | 버그 |
| | `type:feature` | `#0366d6` | 신규기능 |
| | `type:docs` | `#28a745` | 문서 |
| | `type:chore` | `#6f42c1` | 기타 |
| **Priority** | `priority:high` | `#fa6400` | 긴급 |
| | `priority:medium` | `#ffd33d` | 보통 |
| | `priority:low` | `#6cc644` | 낮음 |
| **Status** | `status:in-progress` | `#005cc5` | 진행중 |
| | `status:blocked` | `#cf222e` | 블록 |
| | `good first issue` | `#0075ca` | 초보자 |
| **Area** | `area:frontend` | `#1f883f` | 프론트 |
| | `area:backend` | `#d299fd` | 백엔드 |
| | `area:api` | `#ff7b72` | API |

**사용법**: Issue당 3~5개 라벨, `필터링`으로 검색

***

## 📊 3. Projects 보드 구조

**Projects > New project > Classic project**  
**프로젝트명**: `K_Bridge Sprint Board`

```
[Backlog] → [To Do] → [In Progress] → [Review] → [Testing/QA] → [Done]
  예정작업      다음할일       진행중         PR리뷰        테스트완료    완료
```

**컬럼 설정표**

| 컬럼 | Issue 라벨 연동 | 이동 조건 |
|------|----------------|-----------|
| Backlog | - | 새 Issue 자동 |
| To Do | `priority:high` | Assignee 지정 |
| In Progress | `status:in-progress` | 작업시작 |
| Review | - | PR 생성시 자동 |
| Testing/QA | - | PR 승인 후 |
| Done | - | PR 머지 후 |

**추가 필드**: Milestone(v1.0), Priority(선택)

***

## 🔄 4. GitHub Actions 템플릿

**`.github/workflows/` 폴더에 3개 파일 생성**

### 4-1. `ci.yml` (PR/push 시 테스트)
```yaml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with: { node-version: 20 }
    - run: npm ci
    - run: npm run lint
    - run: npm test
    - uses: actions/setup-python@v5
      with: { python-version: 3.12 }
    - run: pip install -r requirements.txt
    - run: pytest
```

### 4-2. `build-deploy.yml` (main 머지 시 배포)
```yaml
name: Build & Deploy
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with: { node-version: 20 }
    - run: npm ci
    - run: npm run build
    - uses: actions/upload-artifact@v4
      with:
        name: build-output
        path: dist/
```

### 4-3. `security.yml` (보안 스캔)
```yaml
name: Security Scan
on:
  schedule:
    - cron: '0 2 * * 1'  # 매주 월요일
  push:
    paths: ['package.json', 'requirements.txt']

jobs:
  security:
    runs-on: ubuntu-latest
    permissions: { security-events: write }
    steps:
    - uses: actions/checkout@v4
    - uses: github/codeql-action/init@v3
      with: { languages: javascript,python }
    - uses: github/codeql-action/analyze@v3
```

***

## 🚀 5. 완전한 워크플로

```
1. [Issues] 버그/기능 → 라벨링 → Projects Backlog
2. [Projects] To Do → Assignee → In Progress  
3. `git checkout -b feature/12-작업명`
4. 코딩 → `git push` → 자동 CI 실행
5. [Pull requests] PR 생성 → 자동 Review 컬럼
6. 리뷰 → Approve → Merge to main
7. [Projects] 자동 Done → main 자동 Build/Deploy
```

***

## 📌 설정 체크리스트

- [ ] **Settings > Branches**: main/develop 보호규칙
- [ ] **Settings > Labels**: 12개 라벨 생성  
- [ ] **Projects**: Sprint Board 생성 + 규칙 설정
- [ ] **.github/workflows/**: 3개 yml 파일 추가
- [ ] **README.md**: 이 가이드 링크 + 기여 가이드 작성

**이 문서 프린트해서 팀원과 공유하세요!**  
*K_Bridge 전문 협업 시스템 완성* 🎉