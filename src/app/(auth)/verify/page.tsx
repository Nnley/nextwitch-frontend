import { VerifyAccount } from '@/components/features/auth/VerifyAccount'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { redirect } from 'next/navigation'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('auth.verify')

  return {
    title: t('heading'),
  }
}

export default async function VerifyAccountPage({ searchParams }: { searchParams: Promise<{ token: string }> }) {
  const searchParamsResolved = await searchParams

  if (!searchParamsResolved.token) {
    return redirect('/signup')
  }

  return <VerifyAccount />
}
