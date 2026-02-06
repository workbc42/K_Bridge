import { redirect } from 'next/navigation'

export default function LocalePage({ params }) {
  const { locale } = params
  redirect(`/${locale}/dashboard`)
}
