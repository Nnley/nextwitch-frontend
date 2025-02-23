import { CreateAccountForm } from '@/components/features/auth/forms/CreateAccountForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Account',
}

export default function CreateAccountPage() {
  return <CreateAccountForm />
}
