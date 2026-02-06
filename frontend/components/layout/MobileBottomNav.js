'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items = [
  { key: 'dashboard', label: 'Dashboard', href: '/dashboard' },
  { key: 'orders', label: 'Orders', href: '/dashboard/orders' },
  { key: 'customers', label: 'Customers', href: '/dashboard/customers' },
  { key: 'more', label: 'More', href: '/dashboard/settings' },
]

export default function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="mobile-bottom-nav">
      {items.map((item) => {
        const active = pathname === item.href
        return (
          <Link key={item.key} href={item.href} className={active ? 'is-active' : ''}>
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
