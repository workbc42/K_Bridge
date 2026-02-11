'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from '@/lib/i18n-client'

const navItems = [
  { key: 'dashboard', labelKey: 'nav.dashboard', href: '/dashboard' },
  { key: 'orders', labelKey: 'nav.orders', href: '/dashboard/orders' },
  { key: 'customers', labelKey: 'nav.customers', href: '/dashboard/customers' },
  { key: 'payments', labelKey: 'nav.payments', href: '/dashboard/payments' },
  { key: 'analytics', labelKey: 'nav.analytics', href: '/dashboard/analytics' },
  { key: 'settings', labelKey: 'nav.settings', href: '/dashboard/settings' },
]

export default function MobileDrawer({ open, onClose }) {
  const pathname = usePathname()
  const { t, basePath } = useTranslations()
  if (!open) return null

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <aside className="drawer" onClick={(event) => event.stopPropagation()}>
        <div className="drawer-header">
          <span className="logo-text">K-Meal Bridge</span>
          <button type="button" className="drawer-close" onClick={onClose}>
            Close
          </button>
        </div>
        <nav className="drawer-nav">
          <ul>
            {navItems.map((item) => {
              const href = `${basePath}${item.href}`
              const active = pathname === href
              return (
                <li key={item.key}>
                  <Link className={active ? 'drawer-link is-active' : 'drawer-link'} href={href} onClick={onClose}>
                    {t(item.labelKey)}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>
    </div>
  )
}
