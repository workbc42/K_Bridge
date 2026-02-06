'use client'

import { useState } from 'react'

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false)

  return (
    <div className="header-dropdown">
      <button type="button" className="header-button" onClick={() => setOpen(!open)}>
        Admin
      </button>
      {open ? (
        <div className="dropdown-menu">
          <button type="button" className="dropdown-item">Profile</button>
          <button type="button" className="dropdown-item">Settings</button>
          <button type="button" className="dropdown-item">Logout</button>
        </div>
      ) : null}
    </div>
  )
}
