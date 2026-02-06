export default function SettingsPage() {
  const sections = [
    { title: '프로필 설정', desc: '운영자 정보 및 계정 관리' },
    { title: '알림 설정', desc: '알림톡/이메일 설정' },
    { title: '보안', desc: '권한 및 접근 제어' },
    { title: '언어 및 지역', desc: '기본 언어/시간대' },
    { title: '외관', desc: '테마 및 레이아웃' },
    { title: '연동 설정', desc: 'Manychat/배달앱 연동' },
  ]

  return (
    <div className="page-container">
      <div className="mx-auto max-w-6xl">
        <header className="dashboard-header">
          <div>
            <p className="section-kicker">Settings</p>
            <h1 className="section-title mt-2 text-4xl font-semibold">설정</h1>
            <p className="mt-3 text-sm text-[color:var(--muted)]">
              시스템 설정과 운영 환경을 관리합니다.
            </p>
          </div>
        </header>

        <section className="settings-grid">
          {sections.map((section) => (
            <div key={section.title} className="settings-card">
              <h3>{section.title}</h3>
              <p>{section.desc}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
