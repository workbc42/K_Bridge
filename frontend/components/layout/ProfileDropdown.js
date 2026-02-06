'use client'

import { useState } from 'react'
import { useTranslations } from '@/lib/i18n-client'

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false)
  const { t } = useTranslations()

  return (
    <div className="header-dropdown">
      <button type="button" className="header-button" onClick={() => setOpen(!open)}>
        Admin
      </button>
      {open ? (
        <div className="dropdown-menu">
          <button type="button" className="dropdown-item">{t('profile.profile')}</button>
          <button type="button" className="dropdown-item">{t('profile.settings')}</button>
          <button type="button" className="dropdown-item">{t('profile.logout')}</button>
        </div>
      ) : null}
    </div>
  )
}
