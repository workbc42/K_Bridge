# 주문 히스토리/추천 MVP 스키마

Manychat 운영 + Beeper 베타 병행을 가정한 **주문 히스토리/추천 기능 MVP 스키마** 초안입니다. 목표는 다음 3가지를 가능하게 하는 것입니다.

- 최근 주문 그대로 재주문
- 자주 주문한 메뉴 Top 3
- 특이사항(맵기/고수 등) 자동 제안

## 핵심 엔터티

### customers
| 컬럼 | 타입 | 설명 |
|---|---|---|
| id | uuid | 내부 고객 ID |
| messenger_platform | enum | `instagram` / `facebook` / `other` |
| messenger_user_id | text | 플랫폼 고유 ID |
| display_name | text | 표시 이름 |
| locale | text | 선호 언어 |
| created_at | timestamptz | 생성일 |

**유니크 키**: `(messenger_platform, messenger_user_id)`

### orders
| 컬럼 | 타입 | 설명 |
|---|---|---|
| id | uuid | 주문 ID |
| customer_id | uuid | 고객 FK |
| status | enum | `received` / `in_progress` / `done` / `cancelled` |
| address | text | 배송 주소 |
| request_note | text | 특이사항 (맵기/고수 등) |
| order_detail_text | text | 주문 상세 원문 |
| total_price | integer | 총액(원) |
| source_channel | enum | `manychat` / `beeper` |
| created_at | timestamptz | 생성일 |

### order_items
| 컬럼 | 타입 | 설명 |
|---|---|---|
| id | uuid | 아이템 ID |
| order_id | uuid | 주문 FK |
| name | text | 메뉴명 |
| quantity | integer | 수량 |
| unit_price | integer | 단가(원) |
| options | text | 옵션/추가/제외 |

### menu_signals
(추천용 집계 테이블: 배치/트리거로 갱신)

| 컬럼 | 타입 | 설명 |
|---|---|---|
| customer_id | uuid | 고객 FK |
| item_name | text | 메뉴명 |
| order_count | integer | 주문 횟수 |
| last_ordered_at | timestamptz | 마지막 주문 시간 |

### request_signals
(특이사항 추천용 집계 테이블)

| 컬럼 | 타입 | 설명 |
|---|---|---|
| customer_id | uuid | 고객 FK |
| request_text | text | 특이사항 |
| use_count | integer | 사용 횟수 |
| last_used_at | timestamptz | 마지막 사용 시간 |

## 저장 흐름 (요약)
1. 메시지 수신 (Manychat/Beeper)
2. 고객 식별/없으면 생성
3. 주문 생성 (order + items)
4. request_note 및 order_detail_text 저장
5. 집계 테이블 업데이트(비동기)

## 추천 로직 (MVP)
- 최근 주문 그대로 재주문: `orders` 최신 1건
- 자주 주문한 메뉴: `menu_signals` order_count 상위 3
- 특이사항 자동 제안: `request_signals` 사용 횟수 상위 2~3

---

## 최소 인덱스
- customers `(messenger_platform, messenger_user_id)` unique
- orders `(customer_id, created_at)`
- order_items `(order_id)`
- menu_signals `(customer_id, order_count desc)`
- request_signals `(customer_id, use_count desc)`
