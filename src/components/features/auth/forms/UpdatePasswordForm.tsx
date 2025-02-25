'use client'

import { Button, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, Input } from '@/components/ui'
import { useUpdatePasswordMutation } from '@/graphql/generated/output'
import { TypeUpdatePasswordSchema, updatePasswordSchema } from '@/schemas/auth/update-password.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { AuthWrapper } from '../AuthWrapper'

interface Props {
  token: string
}

export const UpdatePasswordForm: React.FC<Props> = ({ token }) => {
  const t = useTranslations('auth.updatePassword')

  const router = useRouter()

  const form = useForm<TypeUpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: '',
      passwordRepeat: '',
    },
  })

  const [updatePassword, { loading: isLoading }] = useUpdatePasswordMutation({
    onCompleted: () => {
      toast.success(t('successMessage'))
      router.push('/login')
    },
    onError: error => {
      toast.error(t('errorMessage'))
    },
  })

  const { isValid } = form.formState

  const onSubmit = (data: TypeUpdatePasswordSchema) => {
    updatePassword({
      variables: {
        data: {
          token,
          password: data.password,
          confirmPassword: data.passwordRepeat,
        },
      },
    })
  }

  return (
    <AuthWrapper heading={t('heading')} backButtonLabel={t('backButtonLabel')} backButtonHref='/login'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-y-3'>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('passwordLabel')}</FormLabel>
                <FormControl>
                  <Input placeholder='******' type='password' disabled={isLoading} {...field} />
                </FormControl>
                <FormDescription>{t('passwordDescription')}</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='passwordRepeat'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('passwordRepeatLabel')}</FormLabel>
                <FormControl>
                  <Input placeholder='******' type='password' disabled={isLoading} {...field} />
                </FormControl>
                <FormDescription>{t('passwordRepeatDescription')}</FormDescription>
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
