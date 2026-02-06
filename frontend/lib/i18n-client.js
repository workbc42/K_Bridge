'use client'

import { usePathname } from 'next/navigation'
import { getLocaleFromPathname, getTranslations } from './i18n'

export const useTranslations = () => {
  const pathname = usePathname() || ''
  const pathLocale = getLocaleFromPathname(pathname)
  const { t, locale } = getTranslations(pathLocale)
  const basePath = pathLocale ? `/${pathLocale}` : ''

  return {
    t,
    locale,
    pathLocale,
    basePath,
  }
}
