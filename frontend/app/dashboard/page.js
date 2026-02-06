export default function DashboardHome() {
  const metrics = [
    { label: '오늘 접수', value: '12건', detail: '+8% vs 어제' },
    { label: '처리 대기', value: '4건', detail: '평균 5분' },
    { label: '완료', value: '36건', detail: '만족도 4.8/5' },
    { label: '오늘 매출', value: '₩432,000', detail: '+12%' },
  ]

  return (
    <div className="page-container">
      <div className="mx-auto max-w-6xl">
        <header className="dashboard-header">
          <div>
            <p className="section-kicker">Overview</p>
            <h1 className="section-title mt-2 text-4xl font-semibold">운영 대시보드</h1>
            <p className="mt-3 text-sm text-[color:var(--muted)]">
              오늘의 주문 현황과 주요 지표를 확인하세요.
            </p>
          </div>
          <div className="dashboard-actions">
            <button className="primary-btn">리포트 생성</button>
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

        <section className="dashboard-grid">
          <div className="dashboard-panel">
            <h3>주문 추이</h3>
            <div className="panel-placeholder">Chart Placeholder</div>
          </div>
          <div className="dashboard-panel">
            <h3>Top 고객</h3>
            <div className="panel-placeholder">Chart Placeholder</div>
          </div>
          <div className="dashboard-panel">
            <h3>인기 메뉴</h3>
            <div className="panel-placeholder">Chart Placeholder</div>
          </div>
          <div className="dashboard-panel">
            <h3>운영 효율</h3>
            <div className="panel-placeholder">Chart Placeholder</div>
          </div>
        </section>
      </div>
    </div>
  )
}
