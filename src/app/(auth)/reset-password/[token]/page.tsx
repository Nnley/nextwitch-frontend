import { UpdatePasswordForm } from '@/components/features/auth/forms/UpdatePasswordForm'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { redirect } from 'next/navigation'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('auth.updatePassword')

  return {
    title: t('heading'),
  }
}

export default async function UpdatePasswordPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params

  if (!token) {
    return redirect('/reset-password')
  }

  return <UpdatePasswordForm token={token} />
}
