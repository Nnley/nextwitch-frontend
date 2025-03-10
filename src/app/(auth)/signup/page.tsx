import { CreateAccountForm } from '@/components/features/auth/forms/CreateAccountForm'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('auth.register')

  return {
    title: t('title'),
  }
}

export default function SignupPage() {
  return <CreateAccountForm />
}
