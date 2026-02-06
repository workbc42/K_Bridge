'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from '@/lib/i18n-client'

const items = [
  { key: 'dashboard', labelKey: 'nav.dashboard', href: '/dashboard' },
  { key: 'orders', labelKey: 'nav.orders', href: '/dashboard/orders' },
  { key: 'customers', labelKey: 'nav.customers', href: '/dashboard/customers' },
  { key: 'more', labelKey: 'nav.more', href: '/dashboard/settings' },
]

export default function MobileBottomNav() {
  const pathname = usePathname()
  const { t, basePath } = useTranslations()

  return (
    <nav className="mobile-bottom-nav">
      {items.map((item) => {
        const href = `${basePath}${item.href}`
        const active = pathname === href
        return (
          <Link key={item.key} href={href} className={active ? 'is-active' : ''}>
            <span>{t(item.labelKey)}</span>
          </Link>
        )
      })}
    </nav>
  )
}
