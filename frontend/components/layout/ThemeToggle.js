'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from '@/lib/i18n-client'

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    return window.localStorage.getItem('kmeal-theme') || 'light'
  })
  const { t } = useTranslations()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('kmeal-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
  }

  return (
    <button type="button" className="header-button" onClick={toggleTheme}>
      {theme === 'light' ? t('theme.light') : t('theme.dark')}
    </button>
  )
}
