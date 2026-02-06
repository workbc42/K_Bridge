'use client'

import NotificationDropdown from './NotificationDropdown'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'
import ProfileDropdown from './ProfileDropdown'
import { useTranslations } from '@/lib/i18n-client'

export default function Header({ onMenu }) {
  const { t } = useTranslations()

  return (
    <header className="header">
      <div className="header-left">
        <button type="button" className="header-menu" onClick={onMenu}>
          {t('header.menu')}
        </button>
        <div className="header-search">
          <input type="text" placeholder={t('header.searchPlaceholder')} />
        </div>
      </div>
      <div className="header-right">
        <NotificationDropdown />
        <LanguageSwitcher />
        <ThemeToggle />
        <ProfileDropdown />
      </div>
    </header>
  )
}
