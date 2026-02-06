import Link from 'next/link'

export default function OrderDetailPage({ params }) {
  const { id, locale } = params || {}
  const basePath = locale ? `/${locale}` : ''

  return (
    <div className="page-container">
      <div className="mx-auto max-w-4xl">
        <header className="dashboard-header">
          <div>
            <p className="section-kicker">Orders</p>
            <h1 className="section-title mt-2 text-4xl font-semibold">주문 상세</h1>
            <p className="mt-3 text-sm text-[color:var(--muted)]">주문 ID: {id}</p>
          </div>
          <div className="dashboard-actions">
            <Link className="ghost-btn" href={`${basePath}/dashboard/orders`}>
              목록으로
            </Link>
            <button className="primary-btn">상태 변경</button>
          </div>
        </header>

        <section className="dashboard-panel">
          <h3>주문 정보</h3>
          <div className="panel-placeholder">주문 상세 정보 Placeholder</div>
        </section>

        <section className="dashboard-panel">
          <h3>고객 히스토리</h3>
          <div className="panel-placeholder">최근 주문 / 추천 정보</div>
        </section>
      </div>
    </div>
  )
}
