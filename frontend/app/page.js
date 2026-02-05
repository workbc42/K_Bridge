'use client'

import { useEffect, useState } from 'react'

const initialOrders = [
  {
    id: 'ORD-2401',
    status: '접수',
    customer: 'John Doe',
    messenger: 'fb_108293',
    address: '서울시 강남구 테헤란로 123, 101동 501호',
    request: '문 앞에 두고 문자 주세요',
    orderDetail: '김치찌개 x1, 공기밥 x1, 콜라 x1',
    total: '13,000원',
    time: '14:32',
    thumbTone: 'tone-1',
  },
  {
    id: 'ORD-2402',
    status: '접수',
    customer: 'Emma Chen',
    messenger: 'ig_552901',
    address: '서울시 송파구 올림픽로 55',
    request: '계단 X, 엘리베이터 사용',
    orderDetail: '짜장면 x1, 탕수육(소) x1',
    total: '21,000원',
    time: '14:40',
    thumbTone: 'tone-2',
  },
  {
    id: 'ORD-2403',
    status: '처리중',
    customer: 'Mike Lee',
    messenger: 'fb_330194',
    address: '서울시 마포구 월드컵북로 28',
    request: '덜 맵게',
    orderDetail: '닭갈비 x1, 치즈 추가',
    total: '16,500원',
    time: '14:18',
    thumbTone: 'tone-3',
  },
  {
    id: 'ORD-2404',
    status: '처리중',
    customer: 'Sarah Park',
    messenger: 'ig_830144',
    address: '서울시 용산구 이태원로 155',
    request: '포크 추가',
    orderDetail: '쌀국수 x2, 짜조 x1',
    total: '24,000원',
    time: '14:12',
    thumbTone: 'tone-4',
  },
  {
    id: 'ORD-2405',
    status: '완료',
    customer: 'David Kim',
    messenger: 'fb_991203',
    address: '서울시 서초구 강남대로 465',
    request: '벨 눌러주세요',
    orderDetail: '족발(중) x1, 막국수 x1',
    total: '36,000원',
    time: '13:40',
    thumbTone: 'tone-5',
  },
  {
    id: 'ORD-2406',
    status: '완료',
    customer: 'Aiko Tanaka',
    messenger: 'ig_441278',
    address: '서울시 성동구 왕십리로 22',
    request: '젓가락 2개',
    orderDetail: '샐러드 x1, 샌드위치 x1',
    total: '18,000원',
    time: '13:22',
    thumbTone: 'tone-6',
  },
]

const statusColumns = [
  {
    key: '접수',
    description: '신규 접수된 주문',
  },
  {
    key: '처리중',
    description: '주문 대행 진행',
  },
  {
    key: '완료',
    description: '배달 완료 및 클로징',
  },
]

const metrics = [
  {
    label: '오늘 접수',
    value: '12건',
    detail: '평균 처리 5분',
  },
  {
    label: '처리 대기',
    value: '4건',
    detail: 'SLAs 10분 이내',
  },
  {
    label: '완료',
    value: '36건',
    detail: '고객 만족 4.8/5',
  },
]

const channels = [
  {
    label: 'Instagram',
    value: '48%',
  },
  {
    label: 'Messenger',
    value: '44%',
  },
  {
    label: 'Other',
    value: '8%',
  },
]

function OrderCard({ order, onOpen, isMoved }) {
  return (
    <article className={`order-card${isMoved ? ' is-moved' : ''}`} onClick={() => onOpen(order)}>
      <div className="order-card__header">
        <div>
          <p className="order-id">{order.id}</p>
          <p className="order-time">{order.time}</p>
        </div>
        <span className={`status-pill status-${order.status}`}>{order.status}</span>
      </div>
      <div className="order-card__body">
        <div className={`order-thumb ${order.thumbTone}`}>
          <span>Screenshot</span>
        </div>
        <div>
          <p className="order-name">{order.customer}</p>
          <p className="order-detail">{order.orderDetail}</p>
          <p className="order-address">{order.address}</p>
        </div>
      </div>
      <div className="order-card__meta">
        <span>메신저 ID: {order.messenger}</span>
        <span>합계: {order.total}</span>
      </div>
      <div className="order-card__footer">
        <p className="order-request">요청: {order.request}</p>
        <button
          className="order-action"
          onClick={(event) => {
            event.stopPropagation()
            onOpen(order)
          }}
        >
          상세 보기
        </button>
      </div>
    </article>
  )
}

function OrderModal({ order, onClose, onStatusChange }) {
  if (!order) return null

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            <p className="modal-kicker">주문 상세</p>
            <h2 className="modal-title">{order.id}</h2>
            <p className="modal-subtitle">
              {order.customer} · {order.time} · {order.messenger}
            </p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="닫기">
            닫기
          </button>
        </div>
        <div className="modal-body">
          <div className={`modal-thumb ${order.thumbTone}`}>
            <span>Screenshot Preview</span>
          </div>
          <div className="modal-details">
            <div>
              <p className="modal-label">상태</p>
              <span className={`status-pill status-${order.status}`}>{order.status}</span>
            </div>
            <div>
              <p className="modal-label">주문 내역</p>
              <p className="modal-text">{order.orderDetail}</p>
            </div>
            <div>
              <p className="modal-label">주소</p>
              <p className="modal-text">{order.address}</p>
            </div>
            <div>
              <p className="modal-label">요청사항</p>
              <p className="modal-text">{order.request}</p>
            </div>
            <div>
              <p className="modal-label">합계</p>
              <p className="modal-text">{order.total}</p>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="ghost-btn" onClick={() => onStatusChange(order.id, '접수')}>
            접수로 이동
          </button>
          <button className="ghost-btn" onClick={() => onStatusChange(order.id, '처리중')}>
            처리중으로 이동
          </button>
          <button className="primary-btn" onClick={() => onStatusChange(order.id, '완료')}>
            완료 처리
          </button>
        </div>
      </div>
    </div>
  )
}

function Toast({ toast, onClose, onUndo }) {
  if (!toast) return null

  return (
    <div className="toast" role="status" aria-live="polite">
      <div>
        <p className="toast-title">{toast.title}</p>
        <p className="toast-subtitle">{toast.subtitle}</p>
      </div>
      <div className="toast-actions">
        <button className="toast-undo" onClick={onUndo}>
          Undo
        </button>
        <button className="toast-close" onClick={onClose} aria-label="알림 닫기">
          닫기
        </button>
      </div>
    </div>
  )
}

export default function Home() {
  const [orders, setOrders] = useState(initialOrders)
  const [selectedOrderId, setSelectedOrderId] = useState(null)
  const [toast, setToast] = useState(null)
  const [movedOrderId, setMovedOrderId] = useState(null)
  const [lastChange, setLastChange] = useState(null)

  const selectedOrder = orders.find((order) => order.id === selectedOrderId)

  useEffect(() => {
    if (!selectedOrderId) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedOrderId(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedOrderId])

  useEffect(() => {
    if (!toast) return undefined

    const timer = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    if (!movedOrderId) return undefined

    const timer = setTimeout(() => setMovedOrderId(null), 1100)
    return () => clearTimeout(timer)
  }, [movedOrderId])

  const handleStatusChange = (orderId, status) => {
    const current = orders.find((order) => order.id === orderId)
    if (!current || current.status === status) return

    setLastChange({
      orderId,
      previousStatus: current.status,
      nextStatus: status,
    })

    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status } : order)))
    setMovedOrderId(orderId)

    setToast({
      title: `${current.id} 상태 변경`,
      subtitle: `${current.customer} · ${status}로 이동했습니다.`,
    })
  }

  const handleUndo = () => {
    if (!lastChange) return

    setOrders((prev) =>
      prev.map((order) =>
        order.id === lastChange.orderId ? { ...order, status: lastChange.previousStatus } : order,
      ),
    )

    setMovedOrderId(lastChange.orderId)
    setToast({
      title: `${lastChange.orderId} 변경 취소`,
      subtitle: `${lastChange.previousStatus} 상태로 되돌렸습니다.`,
    })
    setLastChange(null)
  }

  return (
    <div className="dashboard-shell">
      <main className="mx-auto max-w-6xl px-6 py-12">
        <header className="dashboard-header">
          <div>
            <p className="section-kicker">Operations</p>
            <h1 className="section-title mt-2 text-4xl font-semibold">내부 주문 접수 대시보드</h1>
            <p className="mt-3 text-sm text-[color:var(--muted)]">
              Manychat에서 수신한 주문을 기준으로 운영팀이 처리하는 내부용 화면입니다. 현재는 목데이터로
              구성되어 있습니다.
            </p>
          </div>
          <div className="dashboard-actions">
            <button className="primary-btn">신규 주문 가져오기</button>
            <button className="ghost-btn">필터 설정</button>
          </div>
        </header>

        <section className="metrics-grid">
          {metrics.map((metric) => (
            <div key={metric.label} className="metric-card">
              <p className="metric-label">{metric.label}</p>
              <p className="metric-value">{metric.value}</p>
              <p className="metric-detail">{metric.detail}</p>
            </div>
          ))}
        </section>

        <section className="channel-strip">
          {channels.map((channel) => (
            <div key={channel.label} className="channel-card">
              <span>{channel.label}</span>
              <strong>{channel.value}</strong>
            </div>
          ))}
        </section>

        <section className="kanban">
          {statusColumns.map((column) => (
            <div key={column.key} className="kanban-column">
              <div className="kanban-header">
                <div>
                  <p className="kanban-title">{column.key}</p>
                  <p className="kanban-subtitle">{column.description}</p>
                </div>
                <span className="kanban-count">
                  {orders.filter((order) => order.status === column.key).length}
                </span>
              </div>
              <div className="kanban-list">
                {orders
                  .filter((order) => order.status === column.key)
                  .map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      isMoved={order.id === movedOrderId}
                      onOpen={(data) => setSelectedOrderId(data.id)}
                    />
                  ))}
              </div>
            </div>
          ))}
        </section>
      </main>

      <OrderModal
        order={selectedOrder}
        onClose={() => setSelectedOrderId(null)}
        onStatusChange={(orderId, status) => {
          handleStatusChange(orderId, status)
          setSelectedOrderId(orderId)
        }}
      />
      <Toast toast={toast} onClose={() => setToast(null)} onUndo={handleUndo} />
    </div>
  )
}
