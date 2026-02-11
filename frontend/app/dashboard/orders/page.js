'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useTranslations } from '@/lib/i18n-client'
import { mockOrders } from '@/lib/mockOrders'

const initialOrders = mockOrders

const statusColumns = [
  {
    key: 'received',
    labelKey: 'orders.columns.received',
    descriptionKey: 'orders.columnDesc.received',
  },
  {
    key: 'processing',
    labelKey: 'orders.columns.processing',
    descriptionKey: 'orders.columnDesc.processing',
  },
  {
    key: 'completed',
    labelKey: 'orders.columns.completed',
    descriptionKey: 'orders.columnDesc.completed',
  },
]

const metrics = [
  {
    labelKey: 'orders.metrics.today',
    value: '12건',
    detailKey: 'orders.metrics.todayDetail',
  },
  {
    labelKey: 'orders.metrics.pending',
    value: '4건',
    detailKey: 'orders.metrics.pendingDetail',
  },
  {
    labelKey: 'orders.metrics.completed',
    value: '36건',
    detailKey: 'orders.metrics.completedDetail',
  },
]

const channels = [
  {
    key: 'instagram',
    value: '48%',
  },
  {
    key: 'messenger',
    value: '44%',
  },
  {
    key: 'other',
    value: '8%',
  },
]

const getOrderChannel = (order) => {
  if (!order?.messenger) return 'other'
  if (order.messenger.startsWith('ig_')) return 'instagram'
  if (order.messenger.startsWith('fb_')) return 'messenger'
  return 'other'
}

function OrderCard({ order, onOpen, isMoved, t }) {
  return (
    <article className={`order-card${isMoved ? ' is-moved' : ''}`} onClick={() => onOpen(order)}>
      <div className="order-card__header">
        <div>
          <p className="order-id">{order.id}</p>
          <p className="order-time">{order.time}</p>
        </div>
        <span className={`status-pill status-${order.status}`}>{t(`orders.status.${order.status}`)}</span>
      </div>
      <div className="order-card__body">
        <div className={`order-thumb ${order.thumbTone}`}>
          <span>Screenshot</span>
        </div>
        <div>
          <p className="order-name">{order.customer}</p>
          {order.intentTag ? <span className="intent-tag">{order.intentTag}</span> : null}
          <p className="order-detail">{order.orderDetail}</p>
          {order.recentSummary?.[0] ? (
            <p className="order-history">
              {t('orders.modal.recentOrders')}: {order.recentSummary[0]}
            </p>
          ) : null}
          <p className="order-address">{order.address}</p>
        </div>
      </div>
      <div className="order-card__meta">
        <span>
          {t('orders.labels.messengerId')}: {order.messenger}
        </span>
        <span>
          {t('orders.labels.total')}: {order.total}
        </span>
      </div>
      <div className="order-card__footer">
        <p className="order-request">
          {t('orders.labels.request')}: {order.request}
        </p>
        <button
          type="button"
          className="order-action"
          onClick={(event) => {
            event.stopPropagation()
            onOpen(order)
          }}
        >
          {t('actions.viewDetail')}
        </button>
      </div>
    </article>
  )
}

function OrderModal({
  order,
  onClose,
  onStatusChange,
  draftDetail,
  draftRequest,
  onDraftDetailChange,
  onDraftRequestChange,
  onApplyRecent,
  onAppendItem,
  onApplyRequest,
  basePath = '',
  t,
}) {
  if (!order) return null

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            <p className="modal-kicker">{t('orders.modal.title')}</p>
            <h2 className="modal-title">{order.id}</h2>
            <p className="modal-subtitle">
              {order.customer} · {order.time} · {order.messenger}
            </p>
          </div>
          <div className="modal-header-actions">
            <Link className="modal-close" href={`${basePath}/dashboard/orders/${order.id}`}>
              {t('orders.modal.detailLink')}
            </Link>
            <button className="modal-close" onClick={onClose} aria-label={t('actions.close')}>
              {t('actions.close')}
            </button>
          </div>
        </div>
        <div className="modal-body">
          <div className={`modal-thumb ${order.thumbTone}`}>
            <span>Screenshot Preview</span>
          </div>
          <div className="modal-details">
            <div>
              <p className="modal-label">{t('orders.modal.status')}</p>
              <span className={`status-pill status-${order.status}`}>{t(`orders.status.${order.status}`)}</span>
            </div>
            <div>
              <p className="modal-label">{t('orders.modal.orderDetail')}</p>
              <p className="modal-text">{order.orderDetail}</p>
            </div>
            <div>
              <p className="modal-label">{t('orders.modal.address')}</p>
              <p className="modal-text">{order.address}</p>
            </div>
            <div>
              <p className="modal-label">{t('orders.modal.request')}</p>
              <p className="modal-text">{order.request}</p>
            </div>
            <div>
              <p className="modal-label">{t('orders.modal.total')}</p>
              <p className="modal-text">{order.total}</p>
            </div>
          </div>
        </div>
        <div className="modal-insights">
          <div className="insight-card">
            <p className="modal-label">{t('orders.modal.recentOrders')}</p>
            <ul className="insight-list">
              {(order.recentSummary || []).slice(0, 3).map((item) => (
                <li key={item}>
                  <button type="button" className="insight-action" onClick={() => onApplyRecent(item)}>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
            <button type="button" className="insight-cta" onClick={() => onApplyRecent(order.orderDetail)}>
              {t('orders.modal.applyRecent')}
            </button>
          </div>
          <div className="insight-card">
            <p className="modal-label">{t('orders.modal.frequentItems')}</p>
            <ul className="insight-list">
              {(order.topItems || []).slice(0, 3).map((item) => (
                <li key={item}>
                  <button type="button" className="insight-action" onClick={() => onAppendItem(item)}>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
            <p className="insight-hint">{t('orders.modal.addHint')}</p>
          </div>
          <div className="insight-card">
            <p className="modal-label">{t('orders.modal.requestSuggestions')}</p>
            <ul className="insight-list">
              {(order.suggestedRequests || []).slice(0, 3).map((item) => (
                <li key={item}>
                  <button type="button" className="insight-action" onClick={() => onApplyRequest(item)}>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="draft-panel">
          <div>
            <p className="modal-label">{t('orders.modal.draftOrder')}</p>
            <textarea
              className="draft-input"
              rows={3}
              value={draftDetail}
              onChange={(event) => onDraftDetailChange(event.target.value)}
            />
          </div>
          <div>
            <p className="modal-label">{t('orders.modal.draftRequest')}</p>
            <textarea
              className="draft-input"
              rows={2}
              value={draftRequest}
              onChange={(event) => onDraftRequestChange(event.target.value)}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="ghost-btn" onClick={() => onStatusChange(order.id, 'received')}>
            {t('orders.actions.moveToReceived')}
          </button>
          <button className="ghost-btn" onClick={() => onStatusChange(order.id, 'processing')}>
            {t('orders.actions.moveToProcessing')}
          </button>
          <button className="primary-btn" onClick={() => onStatusChange(order.id, 'completed')}>
            {t('orders.actions.moveToCompleted')}
          </button>
        </div>
      </div>
    </div>
  )
}

function Toast({ toast, onClose, onUndo, t }) {
  if (!toast) return null

  return (
    <div className="toast" role="status" aria-live="polite">
      <div>
        <p className="toast-title">{toast.title}</p>
        <p className="toast-subtitle">{toast.subtitle}</p>
      </div>
      <div className="toast-actions">
        <button className="toast-undo" onClick={onUndo}>
          {t('actions.undo')}
        </button>
        <button className="toast-close" onClick={onClose} aria-label={t('actions.close')}>
          {t('actions.close')}
        </button>
      </div>
    </div>
  )
}

export default function OrdersPage() {
  const { t, basePath } = useTranslations()
  const [orders, setOrders] = useState(initialOrders)
  const [selectedOrderId, setSelectedOrderId] = useState(null)
  const [toast, setToast] = useState(null)
  const [movedOrderId, setMovedOrderId] = useState(null)
  const [lastChange, setLastChange] = useState(null)
  const [draftDetail, setDraftDetail] = useState('')
  const [draftRequest, setDraftRequest] = useState('')
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [channelFilter, setChannelFilter] = useState('all')

  const selectedOrder = orders.find((order) => order.id === selectedOrderId)

  const visibleOrders = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return orders.filter((order) => {
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter
      const channel = getOrderChannel(order)
      const matchesChannel = channelFilter === 'all' || channel === channelFilter
      if (!matchesStatus || !matchesChannel) return false
      if (!normalizedQuery) return true
      const haystack = [
        order.id,
        order.customer,
        order.orderDetail,
        order.address,
        order.request,
        order.messenger,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return haystack.includes(normalizedQuery)
    })
  }, [orders, query, statusFilter, channelFilter])

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
      title: t('toast.statusChangedTitle', { id: current.id }),
      subtitle: t('toast.statusChangedSubtitle', {
        customer: current.customer,
        status: t(`orders.status.${status}`),
      }),
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
      title: t('toast.undoTitle', { id: lastChange.orderId }),
      subtitle: t('toast.undoSubtitle', { status: t(`orders.status.${lastChange.previousStatus}`) }),
    })
    setLastChange(null)
  }

  const handleApplyRecent = (text) => {
    setDraftDetail(text || '')
  }

  const handleAppendItem = (item) => {
    if (!item) return
    setDraftDetail((prev) => (prev ? `${prev}, ${item}` : item))
  }

  const handleApplyRequest = (text) => {
    setDraftRequest(text || '')
  }

  const handleOpenOrder = (order) => {
    setSelectedOrderId(order.id)
    setDraftDetail(order.orderDetail || '')
    setDraftRequest(order.request || '')
  }

  return (
    <div className="page-container">
      <div className="mx-auto max-w-6xl">
        <header className="dashboard-header">
          <div>
            <p className="section-kicker">{t('orders.kicker')}</p>
            <h1 className="section-title mt-2 text-4xl font-semibold">{t('orders.title')}</h1>
            <p className="mt-3 text-sm text-[color:var(--muted)]">{t('orders.subtitle')}</p>
          </div>
          <div className="dashboard-actions">
            <button className="primary-btn">{t('actions.newOrder')}</button>
            <button className="ghost-btn">{t('actions.filter')}</button>
          </div>
        </header>

        <section className="filter-bar">
          <div className="filter-field">
            <label>{t('orders.filter.searchLabel')}</label>
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('orders.filter.searchPlaceholder')}
            />
          </div>
          <div className="filter-field">
            <label>{t('orders.filter.statusLabel')}</label>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option value="all">{t('orders.filter.all')}</option>
              <option value="received">{t('orders.status.received')}</option>
              <option value="processing">{t('orders.status.processing')}</option>
              <option value="completed">{t('orders.status.completed')}</option>
            </select>
          </div>
          <div className="filter-field">
            <label>{t('orders.filter.channelLabel')}</label>
            <select value={channelFilter} onChange={(event) => setChannelFilter(event.target.value)}>
              <option value="all">{t('orders.filter.all')}</option>
              <option value="instagram">{t('orders.channels.instagram')}</option>
              <option value="messenger">{t('orders.channels.messenger')}</option>
              <option value="other">{t('orders.channels.other')}</option>
            </select>
          </div>
        </section>

        <section className="metrics-grid">
          {metrics.map((metric) => (
            <div key={metric.labelKey} className="metric-card">
              <p className="metric-label">{t(metric.labelKey)}</p>
              <p className="metric-value">{metric.value}</p>
              <p className="metric-detail">{t(metric.detailKey)}</p>
            </div>
          ))}
        </section>

        <section className="channel-strip">
          {channels.map((channel) => (
            <div key={channel.key} className="channel-card">
              <span>{t(`orders.channels.${channel.key}`)}</span>
              <strong>{channel.value}</strong>
            </div>
          ))}
        </section>

        <section className="kanban">
          {statusColumns.map((column) => (
            <div key={column.key} className="kanban-column">
              <div className="kanban-header">
                <div>
                  <p className="kanban-title">{t(column.labelKey)}</p>
                  <p className="kanban-subtitle">{t(column.descriptionKey)}</p>
                </div>
                <span className="kanban-count">
                  {visibleOrders.filter((order) => order.status === column.key).length}
                </span>
              </div>
              <div className="kanban-list">
                {visibleOrders
                  .filter((order) => order.status === column.key)
                  .map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      isMoved={order.id === movedOrderId}
                      onOpen={handleOpenOrder}
                      t={t}
                    />
                  ))}
              </div>
            </div>
          ))}
        </section>
      </div>

      <OrderModal
        order={selectedOrder}
        onClose={() => setSelectedOrderId(null)}
        onStatusChange={(orderId, status) => {
          handleStatusChange(orderId, status)
          setSelectedOrderId(orderId)
        }}
        draftDetail={draftDetail}
        draftRequest={draftRequest}
        onDraftDetailChange={setDraftDetail}
        onDraftRequestChange={setDraftRequest}
        onApplyRecent={handleApplyRecent}
        onAppendItem={handleAppendItem}
        onApplyRequest={handleApplyRequest}
        basePath={basePath}
        t={t}
      />
      <Toast toast={toast} onClose={() => setToast(null)} onUndo={handleUndo} t={t} />
    </div>
  )
}
