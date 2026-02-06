# 내부 대시보드 스켈레톤 설계 문서

요청하신 전체 스켈레톤 설계를 **현재 프로젝트 문서 흐름에 맞게 정리**했습니다. 이 문서는 VSCode에서 바로 프리뷰 가능한 구조를 목표로 한 **Next.js 14 App Router 기반 레이아웃/다크모드/다국어/반응형 설계안**입니다.

---

## 1) 설계 목적
- 내부 대시보드 전체 레이아웃을 먼저 고정
- 라이트/다크 모드, 다국어, 반응형을 기본 전제로 설계
- VSCode에서 바로 프리뷰 가능한 스켈레톤 제공

---

## 2) 현재 구현 상태 (실제 코드 기준)

### 현재 라우팅 구조
```
frontend/app/
  page.js                 # /dashboard로 리다이렉트
  dashboard/
    layout.js             # Sidebar + Header + Mobile Drawer + Bottom Nav
    page.js               # 대시보드 홈
    orders/
      page.js             # 주문 칸반 + 모달 + 추천/초안
      [id]/page.js        # 주문 상세 스켈레톤
    customers/page.js
    payments/page.js
    analytics/page.js
    settings/page.js
  lib/
    i18n.js               # 텍스트 리소스 로더
    i18n-client.js        # client hook
    mockOrders.js         # 목데이터
  messages/
    ko.json
    en.json
```

### 구현된 레이아웃 컴포넌트
```
frontend/components/layout/
  Sidebar.js
  Header.js
  MobileDrawer.js
  MobileBottomNav.js
  ThemeToggle.js
  LanguageSwitcher.js
  NotificationDropdown.js
  ProfileDropdown.js
```

### 현재 특징
- JS 기반(App Router)
- 다크모드 토글 구현(로컬스토리지)
- 다국어 텍스트 리소스 연동(ko/en)
- 주문 프리뷰/추천/초안 기능은 `/dashboard/orders`에 집중
- 주문 상세 페이지 UI 확장 (요약/고객/배송/메뉴/히스토리/추천 카드)
- 주문 검색/필터 UI 추가 (검색어/상태/채널)

---

## 3) 목표 폴더 구조 (확장형 스켈레톤)
```
frontend/
  app/
    [locale]/
      (auth)/
        login/
          page.tsx
        layout.tsx
      (dashboard)/
        layout.tsx
        page.tsx
        orders/
          page.tsx
        customers/
          page.tsx
        payments/
          page.tsx
        analytics/
          page.tsx
        settings/
          page.tsx
      page.tsx
    layout.tsx
    globals.css
  components/
    layout/
      Sidebar.tsx
      Header.tsx
      MobileDrawer.tsx
      ThemeToggle.tsx
      LanguageSwitcher.tsx
      NotificationDropdown.tsx
      ProfileDropdown.tsx
    ui/
      Button.tsx
      Card.tsx
      Modal.tsx
      Toast.tsx
      Badge.tsx
    features/
      orders/
        OrdersKanban.tsx
        OrderCard.tsx
  store/
    theme.ts
    sidebar.ts
  i18n/
    settings.ts
    client.ts
    server.ts
  lib/
    utils.ts
    constants.ts
  public/
    locales/
      ko/
        common.json
        dashboard.json
        orders.json
      en/
        common.json
        dashboard.json
```

---

## 4) 레이아웃 구조

### Desktop (1280px+)
- 좌측 고정 Sidebar
- 상단 고정 Header
- 본문은 Main Content (Kanban/테이블 등)

### Tablet (768px~1279px)
- Sidebar는 Drawer로 전환
- Main Content 전체 너비

### Mobile (<768px)
- 상단 Header + 하단 Bottom Nav 구조
- 1열 레이아웃

---

## 5) 핵심 컴포넌트 설계

### Sidebar
- 라우트별 활성 상태 표시
- 배지(대기 주문 수) 지원
- 접기/펼치기 상태 유지

### Header
- 알림 드롭다운
- 언어 전환
- 다크모드 토글
- 프로필 메뉴

### Mobile Drawer
- 햄버거 메뉴 기반
- overlay 클릭 시 닫힘

---

## 6) 테마 시스템 (라이트/다크)

### CSS Variables 기반
```css
:root { /* Light */ }
[data-theme='dark'] { /* Dark */ }
```

### Zustand 기반 토글
- `store/theme.ts`
- localStorage 저장

---

## 7) 다국어 구조

### 파일 구조
```
public/locales/{lang}/{namespace}.json
```

### 지원 언어
- ko, en, th, vi, zh (초기: ko/en 권장)

### 다국어 훅
- `i18n/client.ts`
- `i18n/server.ts`

---

## 8) 페이지 스켈레톤

- Dashboard (메트릭/차트 자리)
- Orders (Kanban)
- Customers (테이블 Placeholder)
- Payments (결제 카드 + 테이블 Placeholder)
- Analytics (차트 Placeholder)
- Settings (설정 카드)
- Login (Auth Layout)

---

## 9) 핵심 UI 컴포넌트

- Button
- Card
- Modal
- Toast
- Badge

---

## 10) 실행 방법
```bash
npm install
npm run dev
```
접속: `http://localhost:3000/dashboard`

---

## 11) 다음 단계
- 주문 관리 UX 강화 (드래그, 필터, SLA 경고)
- 고객 상세/히스토리
- 결제/정산 UI
- 실시간 알림(WebSocket)

---

## 12) 통합 적용 순서 (현 코드 → 목표 구조)
1. `dashboard/` 구조 유지 (현 상태)
2. `components/features/orders/`로 주문 프리뷰 분리
3. `i18n/` 적용 (ko/en 우선)
4. `[locale]/` 라우팅으로 확장
5. TS 전환은 마지막 단계로 분리

---

필요한 추가 내용을 보내주시면 이 문서에 계속 확장해 정리하겠습니다.
