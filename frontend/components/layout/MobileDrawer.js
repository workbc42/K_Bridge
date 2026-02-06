'use client'

import Link from 'next/link'

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
            {navItems.map((item) => (
              <li key={item.key}>
                <Link className="drawer-link" href={item.href} onClick={onClose}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  )
}
