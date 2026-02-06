export default function PaymentsPage() {
  return (
    <div className="page-container">
      <div className="mx-auto max-w-6xl">
        <header className="dashboard-header">
          <div>
            <p className="section-kicker">Payments</p>
            <h1 className="section-title mt-2 text-4xl font-semibold">결제/정산</h1>
            <p className="mt-3 text-sm text-[color:var(--muted)]">
              결제 내역과 정산 상태를 관리합니다.
            </p>
          </div>
          <div className="dashboard-actions">
            <button className="primary-btn">정산 리포트</button>
            <button className="ghost-btn">필터</button>
          </div>
        </header>

        <section className="dashboard-grid">
          <div className="dashboard-panel">
            <h3>오늘 매출</h3>
            <div className="panel-placeholder">₩432,000</div>
          </div>
          <div className="dashboard-panel">
            <h3>환불 요청</h3>
            <div className="panel-placeholder">3건</div>
          </div>
        </section>

        <section className="dashboard-panel">
          <h3>결제 내역</h3>
          <div className="panel-placeholder">Table Placeholder</div>
        </section>
      </div>
    </div>
  )
}
