import ko from '@/messages/ko.json'
import en from '@/messages/en.json'

const messages = { ko, en }
export const supportedLocales = Object.keys(messages)
export const defaultLocale = 'ko'

export const resolveLocale = (locale) => {
  if (supportedLocales.includes(locale)) return locale
  return defaultLocale
}

export const getLocaleFromPathname = (pathname = '') => {
  const segment = pathname.split('/').filter(Boolean)[0]
  return supportedLocales.includes(segment) ? segment : null
}

const interpolate = (value, vars) => {
  if (!vars) return value
  return value.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    if (typeof vars[key] === 'undefined') return match
    return String(vars[key])
  })
}

export const translate = (locale, key, vars) => {
  const resolvedLocale = resolveLocale(locale)
  const dictionary = messages[resolvedLocale] || messages[defaultLocale]
  const parts = key.split('.')
  let current = dictionary
  for (const part of parts) {
    if (!current || typeof current !== 'object' || !(part in current)) {
      return key
    }
    current = current[part]
  }
  if (typeof current !== 'string') return key
  return interpolate(current, vars)
}

export const getTranslations = (paramsOrLocale) => {
  const locale =
    typeof paramsOrLocale === 'string'
      ? paramsOrLocale
      : paramsOrLocale && typeof paramsOrLocale === 'object'
        ? paramsOrLocale.locale
        : undefined

  const resolvedLocale = resolveLocale(locale)
  const basePath = supportedLocales.includes(locale) ? `/${locale}` : ''

  return {
    locale: resolvedLocale,
    basePath,
    t: (key, vars) => translate(resolvedLocale, key, vars),
  }
}
