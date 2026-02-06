import { getTranslations } from '@/lib/i18n'

export default function AnalyticsPage({ params } = {}) {
  const { t } = getTranslations(params)

  return (
    <div className="page-container">
      <div className="mx-auto max-w-6xl">
        <header className="dashboard-header">
          <div>
            <p className="section-kicker">Analytics</p>
            <h1 className="section-title mt-2 text-4xl font-semibold">{t('analytics.title')}</h1>
            <p className="mt-3 text-sm text-[color:var(--muted)]">{t('analytics.subtitle')}</p>
          </div>
          <div className="dashboard-actions">
            <button className="primary-btn">{t('actions.download')}</button>
          </div>
        </header>

        <section className="dashboard-panel">
          <h3>{t('analytics.title')}</h3>
          <div className="panel-placeholder">Chart Placeholder</div>
        </section>
      </div>
    </div>
  )
}
