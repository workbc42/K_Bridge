export default function CustomersPage() {
  return (
    <div className="page-container">
      <div className="mx-auto max-w-6xl">
        <header className="dashboard-header">
          <div>
            <p className="section-kicker">Customers</p>
            <h1 className="section-title mt-2 text-4xl font-semibold">고객 관리</h1>
            <p className="mt-3 text-sm text-[color:var(--muted)]">
              고객 목록과 주문 히스토리를 관리합니다.
            </p>
          </div>
          <div className="dashboard-actions">
            <button className="ghost-btn">필터</button>
            <button className="primary-btn">내보내기</button>
          </div>
        </header>

        <section className="dashboard-panel">
          <h3>고객 목록</h3>
          <div className="panel-placeholder">Table Placeholder</div>
        </section>
      </div>
    </div>
  )
}
