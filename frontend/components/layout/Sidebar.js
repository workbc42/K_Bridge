'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslations } from '@/lib/i18n-client'

const navItems = [
  { key: 'dashboard', labelKey: 'nav.dashboard', href: '/dashboard' },
  { key: 'orders', labelKey: 'nav.orders', href: '/dashboard/orders', badge: 4 },
  { key: 'customers', labelKey: 'nav.customers', href: '/dashboard/customers' },
  { key: 'payments', labelKey: 'nav.payments', href: '/dashboard/payments' },
  { key: 'analytics', labelKey: 'nav.analytics', href: '/dashboard/analytics' },
  { key: 'settings', labelKey: 'nav.settings', href: '/dashboard/settings' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { t, basePath } = useTranslations()
  const [collapsed, setCollapsed] = useState(
    () => typeof window !== 'undefined' && window.localStorage.getItem('kmeal-sidebar') === 'collapsed',
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-sidebar', collapsed ? 'collapsed' : 'expanded')
  }, [collapsed])

  const toggleCollapsed = () => {
    const next = !collapsed
    setCollapsed(next)
    const value = next ? 'collapsed' : 'expanded'
    window.localStorage.setItem('kmeal-sidebar', value)
    document.documentElement.setAttribute('data-sidebar', value)
  }

  return (
    <aside className={`sidebar${collapsed ? ' is-collapsed' : ''}`}>
      <div className="sidebar-header">
        <Link href={`${basePath}/dashboard`} className="sidebar-logo">
          <span className="logo-mark" />
          <span className="logo-text">K-Meal Bridge</span>
        </Link>
        <button type="button" className="sidebar-toggle" onClick={toggleCollapsed}>
          {collapsed ? '>' : '<'}
        </button>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => {
            const href = `${basePath}${item.href}`
            const isActive = pathname === href
            return (
              <li key={item.key}>
                <Link className={`sidebar-link${isActive ? ' is-active' : ''}`} href={href}>
                  <span className="sidebar-dot" />
                  <span className="sidebar-label">{t(item.labelKey)}</span>
                  {item.badge ? <span className="sidebar-badge">{item.badge}</span> : null}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
