'use client';

import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/query/client'
import { ThemeProvider } from 'next-themes'

export default function AppProviders({ children }) {
  const client = getQueryClient()
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}
