'use client'

import { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import MobileDrawer from '@/components/layout/MobileDrawer'
import MobileBottomNav from '@/components/layout/MobileBottomNav'

export default function DashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="dashboard-shell">
      <Sidebar />
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="dashboard-content">
        <Header onMenu={() => setMobileOpen(true)} />
        <main className="dashboard-main">{children}</main>
      </div>
      <MobileBottomNav />
    </div>
  )
}
