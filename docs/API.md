# API 스펙

## 공통 규칙
- 모든 응답은 `success`, `message`, `data` 구조를 따른다.
- 에러 응답은 `success: false`와 `message`를 포함한다.

## Auth
### POST /api/auth/register
- 설명: 사용자 회원가입

### POST /api/auth/login
- 설명: 로그인

### GET /api/auth/me
- 설명: 내 정보 조회

## Restaurants
### GET /api/restaurants
- 설명: 레스토랑 목록

## Orders
### POST /api/orders
- 설명: 주문 생성

### GET /api/orders/:id
- 설명: 주문 단건 조회

## Recommendations & Reorder
### GET /api/customers/:id/recent-orders
- 설명: 고객 최근 주문 3~5건
- 응답 예시:
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "ORD-2401",
        "order_detail_text": "김치찌개 x1, 공기밥 x1",
        "request_note": "덜 맵게",
        "created_at": "2026-02-06T12:30:00Z"
      }
    ]
  }
}
```

### GET /api/customers/:id/recommendations
- 설명: 고객 추천(자주 주문한 메뉴/특이사항)
- 응답 예시:
```json
{
  "success": true,
  "data": {
    "top_items": ["김치찌개", "공기밥", "콜라"],
    "suggested_requests": ["덜 맵게", "문 앞에 두고 문자"]
  }
}
```

### POST /api/orders/reorder
- 설명: 최근 주문 기반 재주문 생성
- 요청 예시:
```json
{
  "customer_id": "uuid",
  "base_order_id": "uuid",
  "delivery_address": "서울시 ...",
  "request_note": "덜 맵게"
}
```
- 응답 예시:
```json
{
  "success": true,
  "data": {
    "order_id": "ORD-3412"
  }
}
```
