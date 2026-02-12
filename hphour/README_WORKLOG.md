# HPHOUR 작업 문서

## 개요
- 목표: `hphour` 폴더를 별도 메뉴/주문 앱 형태로 확장
- 전제: 기존 파일은 보존하고 신규 파일 중심으로 기능 추가

## 생성/변경 파일
- `hphour/hphour.html`
  - 태국식 모던 UI 리디자인 버전
  - 전체 메뉴 데이터(144개) 이식
  - 카테고리 한/영/태 병기 매핑
  - 언어 선택(한국어/English/Thai) 반영

- `hphour/hphour_menu.html`
  - `thai_menu.html` 스타일 참고한 사이드바+카드 메뉴판 레이아웃
  - 검색/카테고리/언어 전환 반영
  - 이미지 카드형 구성 적용

- `hphour/ai_thai_menu.html`
  - AI/스톡 이미지 일괄 매핑용 버전
  - 이미지 우선순위:
    1. `IMAGE_MANIFEST` 메뉴별 AI URL
    2. `./images/ai/{slug}.webp|jpg`
    3. `IMAGE_MANIFEST` 메뉴별 스톡 URL
    4. 카테고리 스톡 풀
    5. 동적 스톡 fallback
    6. SVG 플레이스홀더

- `hphour/menu.html`
  - 3+2 전략 버전(로컬 이미지 3개 확장자 + 플레이스홀더)
  - 주문 가능한 화면으로 확장:
    - 메뉴 담기
    - 장바구니(수량 증감/삭제/비우기)
    - 합계 계산
    - 주문 모달(주문자/테이블/연락처/요청사항)
    - 주문 접수 처리
    - 다국어 문구 반영

## 주문 데이터 저장 구조
- 장바구니 키: `localStorage["hphour_cart_v1"]`
- 주문내역 키: `localStorage["hphour_orders_v1"]`
- 주문 저장 시 필드:
  - `orderId`, `createdAt`, `customerName`, `tableNo`, `phone`, `request`, `lang`
  - `items[]` (`id`, `name`, `thai`, `price`, `qty`)
  - `total`

## 현재 한계/다음 단계
- 현재 주문은 브라우저 `localStorage` 저장만 수행(서버 미연동)
- 실제 운영을 위해 권장:
  1. 주문 API 연동 (`POST /orders`)
  2. 관리자 주문 대시보드(실시간 주문 조회/상태 변경)
  3. 결제/주문취소/재고 연동 정책 설계
