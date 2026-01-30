# Contributing to K-Meal Bridge

## 협업 환경 구축

** Branch 전략 (Git Flow)

main (배포용)

├── develop (개발 통합)

│   ├── feature/user-auth (기능 개발)

│   ├── feature/restaurant-search

│   └── feature/order-system

└── hotfix/critical-bug (긴급 수정)



** Branch 네이밍 규칙:

feature/기능명     # 새 기능

bugfix/버그명      # 버그 수정

hotfix/긴급수정명  # 긴급 수정

release/버전       # 릴리스 준비

docs/문서명        # 문서 작업


** Commit 메시지 규칙

Conventional Commits 사용:

feat: 새로운 기능 추가

fix: 버그 수정

docs: 문서 수정

style: 코드 포맷팅

refactor: 코드 리팩토링

test: 테스트 추가

chore: 빌드 업무 수정


>예시:
>
git commit -m "feat: 사용자 로그인 기능 추가"

git commit -m "fix: 결제 API 오류 수정"

git commit -m "docs: README에 설치 가이드 추가"



## 테스트

모든 PR은 테스트를 포함해야 합니다.
