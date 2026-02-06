# 내부 대시보드 레이아웃 기획 보완안

요청하신 레이아웃 설계안을 **현재 프로젝트 구조와 프리뷰 구현** 기준으로 정합성 점검 후 보완/추가 사항을 정리했습니다.

## 1) 현재 시스템과의 정합성 체크

### 이미 정합한 부분
- Next.js App Router 기반 구성 (현재 frontend/app 사용)
- Tailwind 기반 스타일링 (globals.css에 커스텀 스타일 포함)
- Kanban 중심 주문 관리 (프리뷰에 구현됨)
- 주문 인사이트(최근 주문/자주 주문/특이사항) 노출 (프리뷰에 구현됨)

### 정합성 이슈/불일치
- **i18n 라우팅 구조**: 현재 `frontend/app/page.js` 단일 라우트. `[locale]/` 구조는 미도입.
- **TypeScript 전환**: 현 프로젝트는 JS(`.js`) 사용. 제안안은 TS 기반.
- **Zustand/i18next**: 패키지 설치 및 도입 흔적 없음.
- **Backend 구조**: 실제 backend는 `backend/` 루트에 있으나 문서 예시는 `backend/src/` 구조.

**결론**: 레이아웃 설계는 미래 확장에 적합하지만, 현재 코드베이스와는 간극이 있음. 단계적으로 이식 필요.

---

## 2) 보완/추가 사항 (실행 가능성 기준)

### A. 라우팅 구조 (단계적 전환 권장)
**현실적 단계**
1. `frontend/app/` 유지
2. `frontend/app/(dashboard)/` 그룹 추가
3. 이후 `[locale]/` 구조로 확장

**추가 제안**
- `frontend/app/(dashboard)/layout.js`로 대시보드 공통 레이아웃 분리
- 현재 `page.js`는 `orders`로 이동 후 기본 라우트는 대시보드 요약 페이지로 교체

### B. 다국어(i18n)
- 현재는 문서만 존재, 적용 없음
- 실제 적용 시 `next-intl` 또는 `i18next` 중 하나 선택 필요

**추가 제안**
- 초기엔 `ko/en`만 도입 (운영자/고객 대응 최소 세트)
- 텍스트 키 표준화 먼저 (ex. `orders.status.pending`)

### C. 라이트/다크 모드
- 현재 테마는 라이트 기준으로 구현됨
- 다크모드 설계안은 유효하나 실제 토글/스토어 미구현

**추가 제안**
- 기존 CSS 변수 구조에 `data-theme='dark'`만 추가하면 무리 없이 확장 가능
- Zustand 도입 시엔 `store/theme.js` 한 파일로 최소 구성

### D. 반응형
- 현재 Kanban은 반응형 grid만 적용됨
- 모바일에서 카드 밀도/모달 UX 개선 필요

**추가 제안**
- `MobileNav` 우선 도입 (하단 고정)
- `Sidebar`는 Drawer로 전환

### E. 추천/재주문 기능 연동
- 프리뷰 UI에는 “초안 반영”까지 구현됨
- 실제 데이터 연동은 API/DB 연결 필요

**추가 제안**
- `GET /api/customers/:id/recommendations` 우선 구현 후 UI 연결

---

## 3) 폴더 구조 보완 (현재 코드베이스 기준)

### 현실적 폴더 구조 (현 기준)
```
frontend/
  app/
    (dashboard)/
      layout.js
      page.js            # 요약 대시보드
      orders/page.js     # 현재 프리뷰 코드 이동 대상
      customers/page.js
      payments/page.js
      analytics/page.js
      settings/page.js
  components/
    layout/
    ui/
    features/
  store/
  i18n/
```

### 추후 확장 시
- `[locale]/` 적용
- TS 전환 (`.tsx`)
- `backend/src` 구조로 정리

---

## 4) 추가로 포함해야 할 설계 항목

### 운영 효율 관련
- SLA 타이머/경고
- “대기 시간 기준 자동 정렬” 옵션

### 보안/권한
- 운영자 권한 등급 (admin/manager/operator)
- 주문/결제 접근 제한

### 감사 로그
- 주문 상태 변경 로그
- 변경자/시간 기록

### 멀티 계정 운영
- 배달앱 계정 분산 관리
- 주문별 “배달앱 계정” 태깅

---

## 5) 다음 단계 제안 (현실적 순서)

1. **레이아웃 분리**: `(dashboard)/layout.js` 추가
2. **대시보드 홈 생성**: KPI/알림 위젯
3. **Orders 페이지 이동**: 현재 프리뷰를 `orders/page.js`로 이동
4. **MobileNav/Sidebar 분리**
5. **다국어 스캐폴딩** (ko/en)
6. **다크모드 토글**

---

필요한 추가 요구사항을 보내주시면 이 문서에 계속 누적 보완하겠습니다.
