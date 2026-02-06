import { getTranslations } from '@/lib/i18n'

export default function SettingsPage({ params } = {}) {
  const { t } = getTranslations(params)

  return (
    <div className="page-container">
      <div className="mx-auto max-w-6xl">
        <header className="dashboard-header">
          <div>
            <p className="section-kicker">Settings</p>
            <h1 className="section-title mt-2 text-4xl font-semibold">{t('settings.title')}</h1>
            <p className="mt-3 text-sm text-[color:var(--muted)]">{t('settings.subtitle')}</p>
          </div>
        </header>

        <section className="settings-grid">
          <div className="settings-card">
            <h3>Profile</h3>
            <p>계정 정보 및 기본 설정</p>
          </div>
          <div className="settings-card">
            <h3>Notifications</h3>
            <p>알림 채널 및 수신 설정</p>
          </div>
          <div className="settings-card">
            <h3>Integrations</h3>
            <p>Manychat/배달앱 연동 설정</p>
          </div>
        </section>
      </div>
    </div>
  )
}
