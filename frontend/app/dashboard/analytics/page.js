export default function AnalyticsPage() {
  return (
    <div className="page-container">
      <div className="mx-auto max-w-6xl">
        <header className="dashboard-header">
          <div>
            <p className="section-kicker">Analytics</p>
            <h1 className="section-title mt-2 text-4xl font-semibold">통계</h1>
            <p className="mt-3 text-sm text-[color:var(--muted)]">
              주문/매출/고객 분석 지표를 확인합니다.
            </p>
          </div>
          <div className="dashboard-actions">
            <button className="ghost-btn">기간 선택</button>
            <button className="primary-btn">리포트 다운로드</button>
          </div>
        </header>

        <section className="dashboard-grid">
          <div className="dashboard-panel">
            <h3>주문 추이</h3>
            <div className="panel-placeholder">Chart Placeholder</div>
          </div>
          <div className="dashboard-panel">
            <h3>매출 분석</h3>
            <div className="panel-placeholder">Chart Placeholder</div>
          </div>
          <div className="dashboard-panel">
            <h3>카테고리 분포</h3>
            <div className="panel-placeholder">Chart Placeholder</div>
          </div>
          <div className="dashboard-panel">
            <h3>고객 분석</h3>
            <div className="panel-placeholder">Chart Placeholder</div>
          </div>
        </section>
      </div>
    </div>
  )
}
