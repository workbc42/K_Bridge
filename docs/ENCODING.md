# 한글 깨짐 원인 점검 및 UTF-8 정상화

## 문제 증상
- PowerShell에서 `README.md`, `docs/*.md` 출력 시 한글이 깨져 보임
- IDE에서는 정상 표시되는 경우가 많음

## 원인 가설
1. **터미널 코드 페이지 불일치**
   - Windows PowerShell 기본 코드 페이지(CP949)와 파일 인코딩(UTF-8)이 불일치
2. **파일 인코딩 혼재**
   - 일부 파일이 UTF-8, 일부 파일이 ANSI 또는 다른 인코딩일 가능성
3. **Git 출력 인코딩 설정 미비**
   - `git log`, `git status` 등에서 한글이 깨질 수 있음

## 점검 체크리스트
- PowerShell에서 `chcp`로 현재 코드 페이지 확인
- IDE에서 파일 인코딩 확인(UTF-8 권장)
- `git config --get i18n.logOutputEncoding` 확인

## 정상화 조치(수행 완료)
- `README.md`, `CONTRIBUTING.md`, `docs/*.md`, `backend/README.md`, `database/README.md`, `__DONE_list__.md`
  - **UTF-8 인코딩으로 재저장** 처리

## 권장 환경 설정
### PowerShell
```powershell
chcp 65001
$OutputEncoding = [Console]::OutputEncoding = [Text.UTF8Encoding]::UTF8
```

### Git
```bash
git config --global i18n.commitEncoding utf-8
git config --global i18n.logOutputEncoding utf-8
```

### VS Code
- Settings: `files.encoding` → `utf8`
- 상태 바에서 파일 인코딩 확인 및 변경 가능

## 확인 방법
- PowerShell에서 아래 명령 실행 후 한글 깨짐 여부 확인
```powershell
Get-Content -Path README.md
Get-Content -Path docs\API.md
```

## 후속 작업 제안
- `.editorconfig` 추가하여 기본 인코딩/개행 통일
- CI에서 문자 인코딩 검사 도구 적용(선택)
