'use client'

import { Button, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, Input } from '@/components/ui'
import { useResetPasswordMutation } from '@/graphql/generated/output'
import { resetPasswordSchema, TypeResetPasswordSchema } from '@/schemas/auth/reset-password.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { AuthWrapper } from '../AuthWrapper'

export const ResetPasswordForm: React.FC = () => {
  const t = useTranslations('auth.resetPassword')

  const [isSuccess, setIsSuccess] = React.useState<boolean>(false)

  const form = useForm<TypeResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const [resetPassword, { loading: isLoading }] = useResetPasswordMutation({
    onCompleted() {
      setIsSuccess(true)
    },
    onError(error) {
      console.error(error)
      toast.error(t('errorMessage'))
    },
  })

  const { isValid } = form.formState

  const onSubmit = (data: TypeResetPasswordSchema) => {
    resetPassword({
      variables: {
        data: {
          email: data.email,
        },
      },
    })
  }

  if (isSuccess) {
    return (
      <AuthWrapper heading={t('heading')} className='text-center space-y-4'>
        <div className='flex flex-col items-center space-y-6 pt-8'>
          <div className='animate-bounce'>
            <CheckCircle className='h-16 w-16 text-green-500' />
          </div>

          <div className='space-y-4'>
            <h2 className='text-2xl font-semibold text-green-500'>{t('successAlertTitle')}</h2>

            <p className='text-muted-foreground text-lg max-w-sm mx-auto'>{t('successAlertDescription')}</p>
          </div>

          <div className='bg-muted/30 rounded-lg p-4 mt-6 max-w-sm'>
            <p className='text-sm text-muted-foreground'>{t('spamMessage')}</p>
          </div>
        </div>
      </AuthWrapper>
    )
  }

  return (
    <AuthWrapper heading={t('heading')} backButtonLabel={t('backButtonLabel')} backButtonHref='/login'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-y-3'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('emailLabel')}</FormLabel>
                <FormControl>
                  <Input placeholder='johndoe@example.com' type='email' disabled={isLoading} {...field} />
                </FormControl>
                <FormDescription>{t('emailDescription')}</FormDescription>
              </FormItem>
            )}
          />

          <Button className='mt-2 w-full' disabled={!isValid || isLoading}>
            {t('submitButton')}
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  )
}
