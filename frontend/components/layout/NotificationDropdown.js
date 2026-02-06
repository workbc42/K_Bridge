'use client'

import { useState } from 'react'
import { useTranslations } from '@/lib/i18n-client'

const items = [
  { id: '1', title: '새 주문 접수', detail: 'ORD-2401 · 김치찌개 x1', time: '2분 전' },
  { id: '2', title: '결제 완료', detail: 'ORD-2402 · 21,000원', time: '10분 전' },
]

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false)
  const { t } = useTranslations()

  return (
    <div className="header-dropdown">
      <button type="button" className="header-button" onClick={() => setOpen(!open)}>
        {t('notifications.title')}
      </button>
      {open ? (
        <div className="dropdown-menu wide">
          <div className="dropdown-title">{t('notifications.title')}</div>
          {items.map((item) => (
            <div key={item.id} className="dropdown-item">
              <div className="dropdown-strong">{item.title}</div>
              <div className="dropdown-muted">{item.detail}</div>
              <div className="dropdown-muted">{item.time}</div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
