'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const locales = ['ko', 'en', 'th', 'vi', 'zh']

const navItems = [
  { key: 'dashboard', label: 'Dashboard', href: '/dashboard' },
  { key: 'orders', label: 'Orders', href: '/dashboard/orders' },
  { key: 'customers', label: 'Customers', href: '/dashboard/customers' },
  { key: 'payments', label: 'Payments', href: '/dashboard/payments' },
  { key: 'analytics', label: 'Analytics', href: '/dashboard/analytics' },
  { key: 'settings', label: 'Settings', href: '/dashboard/settings' },
]

export default function MobileDrawer({ open, onClose }) {
  if (!open) return null

  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  const locale = locales.includes(segments[0]) ? segments[0] : null
  const basePath = locale ? `/${locale}` : ''

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
                    {item.label}
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
