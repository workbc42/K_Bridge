import Link from 'next/link'
import { getTranslations } from '@/lib/i18n'
import { mockOrders } from '@/lib/mockOrders'

export default function OrderDetailPage({ params } = {}) {
  const { t, basePath } = getTranslations(params)
  const id = params?.id
  const order = mockOrders.find((item) => item.id === id)

  if (!order) {
    return (
      <div className="page-container">
        <div className="mx-auto max-w-4xl">
          <section className="dashboard-panel">
            <h3>{t('orders.detail.title')}</h3>
            <div className="panel-placeholder">{t('orders.detail.empty')}</div>
            <div className="dashboard-actions">
              <Link className="ghost-btn" href={`${basePath}/dashboard/orders`}>
                {t('actions.backToList')}
              </Link>
            </div>
          </section>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="mx-auto max-w-6xl">
        <header className="dashboard-header">
          <div>
            <p className="section-kicker">Orders</p>
            <h1 className="section-title mt-2 text-4xl font-semibold">{t('orders.detail.title')}</h1>
            <p className="mt-3 text-sm text-[color:var(--muted)]">주문 ID: {order.id}</p>
          </div>
          <div className="dashboard-actions">
            <Link className="ghost-btn" href={`${basePath}/dashboard/orders`}>
              {t('actions.backToList')}
            </Link>
            <button className="primary-btn">{t('actions.changeStatus')}</button>
          </div>
        </header>

        <section className="detail-grid">
          <div className="dashboard-panel">
            <h3>{t('orders.detail.summary')}</h3>
            <div className="detail-list">
              <div className="detail-row">
                <span>{t('orders.modal.status')}</span>
                <span className={`status-pill status-${order.status}`}>
                  {t(`orders.status.${order.status}`)}
                </span>
              </div>
              <div className="detail-row">
                <span>{t('orders.modal.total')}</span>
                <strong>{order.total}</strong>
              </div>
              <div className="detail-row">
                <span>{t('orders.detail.receivedAt')}</span>
                <span>{order.time}</span>
              </div>
            </div>
          </div>

          <div className="dashboard-panel">
            <h3>{t('orders.detail.customer')}</h3>
            <div className="detail-list">
              <div className="detail-row">
                <span>{t('orders.detail.customerName')}</span>
                <strong>{order.customer}</strong>
              </div>
              <div className="detail-row">
                <span>{t('orders.labels.messengerId')}</span>
                <span>{order.messenger}</span>
              </div>
              <div className="detail-row">
                <span>{t('orders.detail.channel')}</span>
                <span>
                  {t(
                    order.messenger.startsWith('ig_')
                      ? 'orders.channels.instagram'
                      : 'orders.channels.messenger',
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="dashboard-panel">
            <h3>{t('orders.detail.delivery')}</h3>
            <div className="detail-list">
              <div className="detail-row">
                <span>{t('orders.modal.address')}</span>
                <span>{order.address}</span>
              </div>
              <div className="detail-row">
                <span>{t('orders.modal.request')}</span>
                <span>{order.request}</span>
              </div>
            </div>
          </div>

          <div className="dashboard-panel">
            <h3>{t('orders.detail.items')}</h3>
            <div className="detail-items">
              {order.items.map((item) => (
                <div key={`${item.name}-${item.price}`} className="detail-item">
                  <div>
                    <p className="detail-item-name">{item.name}</p>
                    {item.options ? (
                      <p className="detail-item-option">
                        {t('orders.detail.option')}: {item.options}
                      </p>
                    ) : null}
                  </div>
                  <div className="detail-item-meta">
                    <span>x{item.quantity}</span>
                    <strong>{item.price}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="detail-grid">
          <div className="dashboard-panel">
            <h3>{t('orders.detail.history')}</h3>
            <div className="detail-history">
              {order.history.map((entry) => (
                <div key={entry.id} className="detail-history-item">
                  <div>
                    <p className="detail-history-id">{entry.id}</p>
                    <p className="detail-history-summary">{entry.summary}</p>
                  </div>
                  <div className="detail-history-meta">
                    <span>{entry.date}</span>
                    <strong>{entry.total}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-panel">
            <h3>{t('orders.detail.recommendations')}</h3>
            <div className="detail-chips">
              {(order.topItems || []).map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
            <div className="detail-chips">
              {(order.suggestedRequests || []).map((item) => (
                <span key={item} className="chip chip-secondary">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
