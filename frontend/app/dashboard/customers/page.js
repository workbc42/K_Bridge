import { getTranslations } from '@/lib/i18n'

export default async function CustomersPage({ params } = {}) {
  const resolvedParams = params ? await params : undefined
  const { t } = getTranslations(resolvedParams)

  return (
    <div className="page-container">
      <div className="mx-auto max-w-6xl">
        <header className="dashboard-header">
          <div>
            <p className="section-kicker">Customers</p>
            <h1 className="section-title mt-2 text-4xl font-semibold">{t('customers.title')}</h1>
            <p className="mt-3 text-sm text-[color:var(--muted)]">{t('customers.subtitle')}</p>
          </div>
          <div className="dashboard-actions">
            <button className="ghost-btn">{t('actions.filter')}</button>
            <button className="primary-btn">{t('actions.export')}</button>
          </div>
        </header>

        <section className="dashboard-panel">
          <h3>{t('customers.title')}</h3>
          <div className="panel-placeholder">Table Placeholder</div>
        </section>
      </div>
    </div>
  )
}
