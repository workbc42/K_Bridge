# DB 스키마 구체화

## 기준
- **PostgreSQL** 기준 스키마
- 마이그레이션 파일: `database/migrations/001_init.sql`

## 테이블 요약
### users
- 서비스 사용자 정보
- 주요 컬럼: `email`, `password_hash`, `language`

### customers
- 메신저 기반 고객 식별
- 주요 컬럼: `messenger_platform`, `messenger_user_id`, `display_name`

### restaurants
- 레스토랑 기본 정보
- `name`, `category`, `min_order`

### orders
- 주문 정보
- 상태값: `pending | processing | completed | cancelled`
- 메신저 주문 메타: `customer_id`, `source_channel`, `request_note`, `order_detail_text`

### order_items
- 주문 상세 항목
- `options` 컬럼에 JSON 옵션 저장

### menu_signals
- 추천용 집계 테이블

### request_signals
- 특이사항 추천용 집계 테이블

## 관계
- `users (1) - (N) orders`
- `customers (1) - (N) orders`
- `orders (1) - (N) order_items`
- `restaurants (1) - (N) orders`

## 인덱스
- `customers (messenger_platform, messenger_user_id)` unique
- `orders.user_id`, `orders.customer_id`, `orders.status`
- `orders.customer_id, created_at`
- `order_items.order_id`
- `menu_signals (customer_id, order_count desc)`
- `request_signals (customer_id, use_count desc)`

## 다음 단계
- 결제 테이블(`payments`) 추가
- 주문 상태 이력 테이블(`order_status_logs`) 추가
- 레스토랑 운영시간/배달권역 컬럼 확장
