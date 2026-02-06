# GitHub Wiki 자동 동기화 가이드

이 문서는 `docs/` 폴더의 Markdown 문서를 GitHub Wiki로 자동 동기화하는 과정을 정리한 실행 가이드입니다. 다른 프로젝트에 그대로 적용할 수 있도록 단계별로 설명합니다.

## 목표
- `docs/`를 단일 소스로 유지
- GitHub Wiki를 자동으로 업데이트
- `Home.md` 및 `_Sidebar.md`를 자동 생성

## 요구 사항
- GitHub Wiki 기능 활성화
- GitHub Actions 사용 가능
- Wiki에 push할 수 있는 토큰(`WIKI_SYNC_TOKEN`) 설정

## 1) GitHub Wiki 활성화
1. GitHub 저장소 → `Settings`
2. `Features` → `Wikis` 체크
3. `https://github.com/<owner>/<repo>/wiki` 접속
4. 첫 페이지를 1회 생성 (이 과정이 있어야 `<repo>.wiki.git`가 생성됨)

## 2) 액세스 토큰 준비
### Classic Token
- 범위: `repo`

### Fine-grained Token
- Repository access: 대상 repo 포함
- Permissions: `Contents: Read and Write`

## 3) GitHub Secrets 등록
1. 저장소 → `Settings` → `Secrets and variables` → `Actions`
2. `New repository secret`
3. 이름: `WIKI_SYNC_TOKEN`
4. 값: 위에서 만든 토큰

## 4) 워크플로우 추가
아래 파일을 추가합니다.

- 경로: `.github/workflows/wiki-sync.yml`

```yml
name: Sync docs to wiki

on:
  push:
    branches:
      - main
    paths:
      - 'docs/**'
      - '.github/workflows/wiki-sync.yml'
  workflow_dispatch:

permissions:
  contents: read

jobs:
  sync-wiki:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repo
        uses: actions/checkout@v4

      - name: Sync docs to wiki
        env:
          GH_TOKEN: ${{ secrets.WIKI_SYNC_TOKEN }}
        run: |
          if [ -z "$GH_TOKEN" ]; then
            echo "Missing WIKI_SYNC_TOKEN secret."
            exit 1
          fi

          REPO="${GITHUB_REPOSITORY}"
          WIKI_REPO="https://x-access-token:${GH_TOKEN}@github.com/${REPO}.wiki.git"

          git clone "$WIKI_REPO" wiki

          IGNORE_FILE="docs/.wikiignore"
          RSYNC_EXCLUDES="--exclude .git"
          if [ -f "$IGNORE_FILE" ]; then
            RSYNC_EXCLUDES="$RSYNC_EXCLUDES --exclude-from $IGNORE_FILE"
          fi

          # Keep wiki repo metadata; rsync deletes anything not excluded.
          rsync -av --delete $RSYNC_EXCLUDES docs/ wiki/

          # Home.md from docs/README.md
          if [ -f docs/README.md ]; then
            cp docs/README.md wiki/Home.md
          fi

          # _Sidebar.md from docs tree
          tmp_api="/tmp/sidebar_api.txt"
          tmp_db="/tmp/sidebar_db.txt"
          tmp_setup="/tmp/sidebar_setup.txt"
          tmp_general="/tmp/sidebar_general.txt"
          : > "$tmp_api"
          : > "$tmp_db"
          : > "$tmp_setup"
          : > "$tmp_general"

          declare -A added

          is_ignored() {
            if [ -f "$IGNORE_FILE" ] && grep -Fxq "$1" "$IGNORE_FILE"; then
              return 0
            fi
            return 1
          }

          add_link() {
            local file="$1"
            local rel="${file#docs/}"

            if [ "$rel" = "README.md" ]; then
              return 0
            fi

            if is_ignored "$rel"; then
              return 0
            fi

            if [ -n "${added[$rel]}" ]; then
              return 0
            fi

            first_line="$(head -n 1 "$file")"
            title="$(echo "$first_line" | sed -E 's/^#+[[:space:]]*//')"
            if [ -z "$title" ]; then
              title="$(basename "$rel" .md)"
            fi

            link="${rel%.md}"
            link="${link// /%20}"

            section="general"
            case "$rel" in
              API* ) section="api" ;;
              DB* ) section="db" ;;
              SETUP* | DEPLOYMENT* ) section="setup" ;;
            esac

            case "$section" in
              api ) echo "- [${title}](${link})" >> "$tmp_api" ;;
              db ) echo "- [${title}](${link})" >> "$tmp_db" ;;
              setup ) echo "- [${title}](${link})" >> "$tmp_setup" ;;
              * ) echo "- [${title}](${link})" >> "$tmp_general" ;;
            esac

            added[$rel]=1
          }

          # Preferred ordering inside sections.
          add_link "docs/API.md"
          add_link "docs/API_ROUTES.md"
          add_link "docs/DATABASE.md"
          add_link "docs/DB_SCHEMA.md"
          add_link "docs/SETUP.md"
          add_link "docs/DEPLOYMENT.md"

          find docs -type f -name '*.md' -print0 | sort -z | while IFS= read -r -d '' file; do
            add_link "$file"
          done

          {
            echo "## Docs"
            echo "- [Home](Home)"
            if [ -s "$tmp_api" ]; then
              echo ""
              echo "### API"
              cat "$tmp_api"
            fi
            if [ -s "$tmp_db" ]; then
              echo ""
              echo "### DB"
              cat "$tmp_db"
            fi
            if [ -s "$tmp_setup" ]; then
              echo ""
              echo "### Setup"
              cat "$tmp_setup"
            fi
            if [ -s "$tmp_general" ]; then
              echo ""
              echo "### General"
              cat "$tmp_general"
            fi
          } > wiki/_Sidebar.md

          # Build Home.md with an index section.
          if [ -f docs/README.md ]; then
            {
              cat docs/README.md
              echo ""
              echo "## Wiki Index"
              echo "- [Home](Home)"
              if [ -s "$tmp_api" ]; then
                echo ""
                echo "### API"
                cat "$tmp_api"
              fi
              if [ -s "$tmp_db" ]; then
                echo ""
                echo "### DB"
                cat "$tmp_db"
              fi
              if [ -s "$tmp_setup" ]; then
                echo ""
                echo "### Setup"
                cat "$tmp_setup"
              fi
              if [ -s "$tmp_general" ]; then
                echo ""
                echo "### General"
                cat "$tmp_general"
              fi
            } > wiki/Home.md
          fi

          cd wiki
          if git status --porcelain | grep -q .; then
            git add .
            git -c user.name='wiki-sync-bot' -c user.email='actions@github.com' commit -m "Sync docs to wiki"
            git push
          else
            echo "No changes to sync."
          fi
```

## 5) 선택: 제외할 문서 지정
`docs/.wikiignore` 파일을 만들고 제외할 파일을 적습니다. (한 줄에 하나)

예시:
```
INTERNAL_DASHBOARD.md
```

## 6) 동작 확인
- `main`에 `docs/**` 변경을 push하면 자동으로 Wiki 동기화
- Actions 탭에서 `Sync docs to wiki` 수동 실행 가능

## 7) 자주 발생하는 에러와 해결
### 에러: `Repository not found`
- Wiki가 아직 활성화되지 않았거나 첫 페이지가 없는 상태

### 에러: `Permission denied` / `403`
- 토큰 권한 부족 또는 잘못된 토큰
- Fine-grained 토큰일 경우 권한/리포지토리 선택 확인

### 에러: `.git` 삭제됨
- `rsync --delete`로 `.git`이 삭제될 수 있으므로 반드시 `--exclude .git` 사용

---

## 적용 체크리스트
- [ ] Wiki 활성화 및 첫 페이지 생성
- [ ] `WIKI_SYNC_TOKEN` 등록
- [ ] 워크플로우 파일 추가
- [ ] `docs/` 변경 → Actions 실행 확인

