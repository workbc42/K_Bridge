'use client'

import NotificationDropdown from './NotificationDropdown'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'
import ProfileDropdown from './ProfileDropdown'

export default function Header({ onMenu }) {
  return (
    <header className="header">
      <div className="header-left">
        <button type="button" className="header-menu" onClick={onMenu}>
          Menu
        </button>
        <div className="header-search">
          <input type="text" placeholder="Search orders, customers..." />
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
