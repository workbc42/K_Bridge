const features = [
  {
    title: 'Multi-language ordering',
    desc: 'Order Korean delivery in your language with guided menu translation.',
  },
  {
    title: 'Local payment support',
    desc: 'Pay with foreign cards or local options without extra steps.',
  },
  {
    title: 'Live order tracking',
    desc: 'Track your delivery status in real time with friendly updates.',
  },
]

const steps = [
  {
    label: '1. Pick your restaurant',
    detail: 'Browse curated places with translated menus and reviews.',
  },
  {
    label: '2. Build your order',
    detail: 'Add items, customize, and see totals instantly.',
  },
  {
    label: '3. We bridge the gap',
    detail: 'We place the order and keep you updated until arrival.',
  },
]

export default function Home() {
  return (
    <div className="app-shell">
      <main className="mx-auto max-w-6xl px-6 py-16">
        <section className="glass-panel rounded-3xl px-8 py-12 md:px-12 fade-in">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <span className="tag inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs uppercase tracking-[0.2em]">
                Seoul-ready delivery
              </span>
              <h1 className="section-title mt-6 text-4xl font-semibold leading-tight md:text-5xl">
                K-Meal Bridge
                <span className="block text-2xl text-[color:var(--muted)] md:text-3xl">
                  A delivery assistant for foreigners in Korea
                </span>
              </h1>
              <p className="mt-4 text-lg text-[color:var(--muted)]">
                Skip the language barrier. Discover Korean restaurants, place orders with confidence,
                and get real-time updates from the team that knows the local delivery culture.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="rounded-full bg-[color:var(--primary)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[rgba(42,91,94,0.25)]">
                  Join the waitlist
                </button>
                <button className="rounded-full border border-[color:var(--primary)] px-6 py-3 text-sm font-semibold text-[color:var(--primary)]">
                  View MVP roadmap
                </button>
              </div>
            </div>
            <div className="grid gap-4 md:w-[320px]">
              <div className="grid-card rounded-2xl p-5 fade-in stagger-1">
                <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">Beta cities</p>
                <p className="mt-2 text-2xl font-semibold">Seoul · Busan</p>
              </div>
              <div className="grid-card rounded-2xl p-5 fade-in stagger-2">
                <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">Languages</p>
                <p className="mt-2 text-2xl font-semibold">EN · CN · JP · TH · VI</p>
              </div>
              <div className="grid-card rounded-2xl p-5 fade-in stagger-3">
                <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">Service mode</p>
                <p className="mt-2 text-2xl font-semibold">Concierge ordering</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="section-title text-3xl font-semibold">Why K-Meal Bridge works</h2>
            <p className="max-w-xl text-sm text-[color:var(--muted)]">
              Built for newcomers, travelers, and anyone who wants Korean delivery without the confusion.
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="grid-card rounded-2xl p-6">
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm text-[color:var(--muted)]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <div className="grid-card rounded-3xl p-8">
            <h2 className="section-title text-3xl font-semibold">How it feels to order</h2>
            <div className="mt-6 grid gap-4">
              {steps.map((step) => (
                <div key={step.label} className="rounded-2xl border border-[color:var(--surface-2)] bg-[color:var(--surface-2)]/60 p-4">
                  <p className="text-sm font-semibold text-[color:var(--accent-2)]">{step.label}</p>
                  <p className="mt-2 text-sm text-[color:var(--muted)]">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid-card rounded-3xl p-8">
            <h2 className="section-title text-3xl font-semibold">MVP focus</h2>
            <ul className="mt-5 grid gap-3 text-sm text-[color:var(--muted)]">
              <li>Translated onboarding and menu discovery</li>
              <li>Order request workflow with status updates</li>
              <li>Concierge payment support for foreign cards</li>
              <li>Support chat for delivery questions</li>
            </ul>
            <div className="mt-6 rounded-2xl bg-[color:var(--surface-2)]/70 p-4 text-sm">
              <p className="font-semibold text-[color:var(--accent-2)]">Target launch</p>
              <p className="mt-1 text-[color:var(--muted)]">Q2 2026 pilot with limited restaurant partners</p>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="grid-card flex flex-col items-start justify-between gap-6 rounded-3xl p-8 md:flex-row md:items-center">
            <div>
              <h2 className="section-title text-3xl font-semibold">Be part of the pilot</h2>
              <p className="mt-3 text-sm text-[color:var(--muted)]">
                Join early testers and help shape the ordering experience in Korea.
              </p>
            </div>
            <button className="rounded-full bg-[color:var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[rgba(224,122,95,0.3)]">
              Get early access
            </button>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-6xl px-6 pb-10 text-xs text-[color:var(--muted)]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[color:var(--surface-2)] pt-6">
          <span>Made for foreigners in Korea</span>
          <span>Contact: workbc42@gmail.com</span>
        </div>
      </footer>
    </div>
  )
}
