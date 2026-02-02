# 데이터베이스 스키마

## ERD
Users (사용자)
├── id (PK)
├── email
├── name
├── phone
├── language (en, ko, zh, th, vi)
└── created_at
Orders (주문)
├── id (PK)
├── user_id (FK)
├── restaurant_name
├── menu_items (JSON)
├── total_price
├── status (pending, processing, completed, cancelled)
├── delivery_address
└── created_at
Restaurants (음식점) - 추후 확장
└── ...