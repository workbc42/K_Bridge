# 백엔드 API 스펙 → 라우트/컨트롤러 구조 정리

## 목표
문서상의 API 스펙을 실제 Express 라우트/컨트롤러 구조로 반영하고, 파일 구조 기준을 확립한다.

## 현재 라우트 구조
```
backend/
  server.js
  routes/
    index.js
    auth.js
    restaurants.js
    orders.js
  controllers/
    authController.js
    restaurantController.js
    orderController.js
```

## 라우팅 규칙
- `/api` 하위에 기능별 라우트를 분리
- 라우트는 URL/메서드 선언만 담당
- 컨트롤러는 입력 검증 및 응답 책임

## 엔드포인트 매핑
### Auth
- `POST /api/auth/register`
  - `controllers/authController.register`
- `POST /api/auth/login`
  - `controllers/authController.login`
- `GET /api/auth/me`
  - `controllers/authController.me`

### Restaurants
- `GET /api/restaurants`
  - `controllers/restaurantController.list`

### Orders
- `POST /api/orders`
  - `controllers/orderController.create`
- `GET /api/orders/:id`
  - `controllers/orderController.getById`

### Recommendations
- `GET /api/customers/:id/recent-orders`
  - `controllers/orderController.getRecentByCustomer`
- `GET /api/customers/:id/recommendations`
  - `controllers/orderController.getRecommendations`
- `POST /api/orders/reorder`
  - `controllers/orderController.reorder`

### System
- `GET /api`
  - API 상태 확인
- `GET /api/health`
  - 헬스체크, 타임스탬프 제공

## 컨트롤러 기본 응답 형식
```json
{
  "success": true,
  "message": "optional",
  "data": {}
}
```

## 다음 단계
- 실제 DB 연결 후 컨트롤러 로직 교체
- Joi/Zod 기반 입력 검증 추가
- 에러 핸들링 미들웨어 추가
- 인증/인가 미들웨어 도입
