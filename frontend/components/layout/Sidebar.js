'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const locales = ['ko', 'en', 'th', 'vi', 'zh']

const navItems = [
  { key: 'dashboard', label: 'Dashboard', href: '/dashboard' },
  { key: 'orders', label: 'Orders', href: '/dashboard/orders', badge: 4 },
  { key: 'customers', label: 'Customers', href: '/dashboard/customers' },
  { key: 'payments', label: 'Payments', href: '/dashboard/payments' },
  { key: 'analytics', label: 'Analytics', href: '/dashboard/analytics' },
  { key: 'settings', label: 'Settings', href: '/dashboard/settings' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const segments = pathname.split('/').filter(Boolean)
  const locale = locales.includes(segments[0]) ? segments[0] : null
  const basePath = locale ? `/${locale}` : ''

  useEffect(() => {
    const stored = window.localStorage.getItem('kmeal-sidebar')
    if (stored === 'collapsed') {
      setCollapsed(true)
      document.documentElement.setAttribute('data-sidebar', 'collapsed')
    } else {
      document.documentElement.setAttribute('data-sidebar', 'expanded')
    }
  }, [])

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
                  <span className="sidebar-label">{item.label}</span>
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
