import { NextResponse } from 'next/server'

let locales = ['ko', 'en', 'th']

export function middleware(request) {
    const { pathname } = request.nextUrl

    // Skip if path is internal or static
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/static') ||
        pathname.includes('.') // file extension
    ) {
        return
    }

    // Check if pathname already has locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) return

    // Redirect if there is no locale
    const locale = 'ko'
    request.nextUrl.pathname = `/${locale}${pathname}`
    return NextResponse.redirect(request.nextUrl)
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next|api|favicon.ico).*)',
    ],
}
