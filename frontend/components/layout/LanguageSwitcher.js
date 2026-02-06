'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const languages = [
  { code: 'ko', label: 'KO' },
  { code: 'en', label: 'EN' },
  { code: 'th', label: 'TH' },
  { code: 'vi', label: 'VI' },
  { code: 'zh', label: 'ZH' },
]

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const segments = pathname.split('/').filter(Boolean)
  const current = languages.find((lang) => lang.code === segments[0])?.code || 'ko'
  const [open, setOpen] = useState(false)

  const handleChange = (next) => {
    if (segments[0] && languages.some((lang) => lang.code === segments[0])) {
      segments[0] = next
      router.push('/' + segments.join('/'))
    } else {
      router.push(`/${next}${pathname}`)
    }
    setOpen(false)
  }

  return (
    <div className="header-dropdown">
      <button type="button" className="header-button" onClick={() => setOpen(!open)}>
        {current.toUpperCase()}
      </button>
      {open ? (
        <div className="dropdown-menu">
          {languages.map((item) => (
            <button
              key={item.code}
              type="button"
              className={item.code === current ? 'dropdown-item is-active' : 'dropdown-item'}
              onClick={() => handleChange(item.code)}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
