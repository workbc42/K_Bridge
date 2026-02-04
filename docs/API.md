# API 명세서

## 인증 API

### POST /api/auth/register
회원가입

**Request**:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "phone": "+82-10-1234-5678",
  "language": "en"
}
```

**Response**:
```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### POST /api/auth/login
로그인

### GET /api/auth/me
현재 사용자 정보

## 주문 API

### GET /api/restaurants
음식점 목록 조회

### POST /api/orders
주문 생성

### GET /api/orders/:id
주문 상세 조회
