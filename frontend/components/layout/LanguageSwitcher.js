'use client'

import { useState } from 'react'

const languages = [
  { code: 'ko', label: 'KO' },
  { code: 'en', label: 'EN' },
  { code: 'th', label: 'TH' },
  { code: 'vi', label: 'VI' },
  { code: 'zh', label: 'ZH' },
]

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState('ko')

  return (
    <div className="header-dropdown">
      <button type="button" className="header-button" onClick={() => setOpen(!open)}>
        {lang.toUpperCase()}
      </button>
      {open ? (
        <div className="dropdown-menu">
          {languages.map((item) => (
            <button
              key={item.code}
              type="button"
              className={item.code === lang ? 'dropdown-item is-active' : 'dropdown-item'}
              onClick={() => {
                setLang(item.code)
                setOpen(false)
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
