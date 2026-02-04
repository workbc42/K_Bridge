# DB 스키마 구체화

## 기준
- **PostgreSQL** 기준 스키마
- 마이그레이션 파일: `database/migrations/001_init.sql`

## 테이블 요약
### users
- 서비스 사용자 정보
- 주요 컬럼: `email`, `password_hash`, `language`

### restaurants
- 레스토랑 기본 정보
- `name`, `category`, `min_order`

### orders
- 주문 정보
- 상태값: `pending | processing | completed | cancelled`

### order_items
- 주문 상세 항목
- `options` 컬럼에 JSON 옵션 저장

## 관계
- `users (1) - (N) orders`
- `orders (1) - (N) order_items`
- `restaurants (1) - (N) orders`

## 인덱스
- `orders.user_id`, `orders.status`
- `order_items.order_id`

## 다음 단계
- 결제 테이블(`payments`) 추가
- 주문 상태 이력 테이블(`order_status_logs`) 추가
- 레스토랑 운영시간/배달권역 컬럼 확장
