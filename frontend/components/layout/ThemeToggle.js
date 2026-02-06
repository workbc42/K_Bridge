'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const stored = window.localStorage.getItem('kmeal-theme')
    if (stored) {
      setTheme(stored)
      document.documentElement.setAttribute('data-theme', stored)
    }
  }, [])

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    window.localStorage.setItem('kmeal-theme', next)
  }

  return (
    <button type="button" className="header-button" onClick={toggleTheme}>
      {theme === 'light' ? 'Light' : 'Dark'}
    </button>
  )
}
