'use client'

import { useVerifyAccountMutation } from '@/graphql/generated/output'
import { Loader } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
import { AuthWrapper } from './AuthWrapper'

export const VerifyAccount: React.FC = () => {
  const t = useTranslations('auth.verify')

  const router = useRouter()
  const searchParams = useSearchParams()

  const token = searchParams.get('token') ?? ''

  const [verify] = useVerifyAccountMutation({
    onCompleted: () => {
      toast.success(t('successMessage'))
      router.push('/dashboard/settings')
    },
    onError: error => {
      toast.error(t('errorMessage'))
    },
  })

  React.useEffect(() => {
    verify({
      variables: {
        data: {
          token,
        },
      },
    })
  }, [token])

  return (
    <AuthWrapper heading={t('heading')}>
      <div className='flex justify-center'>
        <Loader className='size-8 animate-spin' />
      </div>
    </AuthWrapper>
  )
}
