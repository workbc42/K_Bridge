'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const locales = ['ko', 'en', 'th', 'vi', 'zh']

const items = [
  { key: 'dashboard', label: 'Dashboard', href: '/dashboard' },
  { key: 'orders', label: 'Orders', href: '/dashboard/orders' },
  { key: 'customers', label: 'Customers', href: '/dashboard/customers' },
  { key: 'more', label: 'More', href: '/dashboard/settings' },
]

export default function MobileBottomNav() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  const locale = locales.includes(segments[0]) ? segments[0] : null
  const basePath = locale ? `/${locale}` : ''

  return (
    <nav className="mobile-bottom-nav">
      {items.map((item) => {
        const href = `${basePath}${item.href}`
        const active = pathname === href
        return (
          <Link key={item.key} href={href} className={active ? 'is-active' : ''}>
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
