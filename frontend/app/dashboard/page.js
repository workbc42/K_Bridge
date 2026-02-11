import { getTranslations } from '@/lib/i18n'

export default async function DashboardHome({ params } = {}) {
  const resolvedParams = params ? await params : undefined
  const { t } = getTranslations(resolvedParams)
  const metrics = [
    { label: t('orders.metrics.today'), value: '12건', detail: t('orders.metrics.todayDetail') },
    { label: t('orders.metrics.pending'), value: '4건', detail: t('orders.metrics.pendingDetail') },
    { label: t('orders.metrics.completed'), value: '36건', detail: t('orders.metrics.completedDetail') },
    { label: t('dashboard.metrics.revenue'), value: '₩432,000', detail: '+12%' }
  ]

  return (
    <div className="page-container">
      <div className="mx-auto max-w-6xl">
        <header className="dashboard-header">
          <div>
            <p className="section-kicker">Overview</p>
            <h1 className="section-title mt-2 text-4xl font-semibold">{t('dashboard.title')}</h1>
            <p className="mt-3 text-sm text-[color:var(--muted)]">{t('dashboard.subtitle')}</p>
          </div>
          <div className="dashboard-actions">
            <button className="primary-btn">{t('actions.report')}</button>
            <button className="ghost-btn">{t('actions.filter')}</button>
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

        <section className="dashboard-grid">
          <div className="dashboard-panel">
            <h3>{t('dashboard.charts.orderTrend')}</h3>
            <div className="panel-placeholder">Chart Placeholder</div>
          </div>
          <div className="dashboard-panel">
            <h3>{t('dashboard.charts.topCustomers')}</h3>
            <div className="panel-placeholder">Chart Placeholder</div>
          </div>
          <div className="dashboard-panel">
            <h3>{t('dashboard.charts.popularItems')}</h3>
            <div className="panel-placeholder">Chart Placeholder</div>
          </div>
          <div className="dashboard-panel">
            <h3>{t('dashboard.charts.efficiency')}</h3>
            <div className="panel-placeholder">Chart Placeholder</div>
          </div>
        </section>
      </div>
    </div>
  )
}
