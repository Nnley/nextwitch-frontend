'use client'

import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  Input,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui'
import { useLoginUserMutation } from '@/graphql/generated/output'
import { loginSchema, TypeLoginSchema } from '@/schemas/auth/login.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { AuthWrapper } from '../AuthWrapper'

export const LoginForm: React.FC = () => {
  const t = useTranslations('auth.login')

  const router = useRouter()

  const [isShow2FA, setIsShow2FA] = React.useState<boolean>(false)

  const form = useForm<TypeLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  })

  const [login, { loading: isLoadingLogin }] = useLoginUserMutation({
    onCompleted(data) {
      if (data.login.message) {
        setIsShow2FA(true)
      } else {
        toast.success(t('successMessage'))
        router.push('/dashboard/settings')
      }
    },
    onError(error) {
      console.error(error)
      toast.error(t('errorMessage'))
    },
  })

  const { isValid } = form.formState

  const onSubmit = (data: TypeLoginSchema) => {
    login({
      variables: {
        data: {
          login: data.login,
          password: data.password,
          pin: data.pin,
        },
      },
    })
  }

  const renderContent = () => {
    if (isShow2FA) {
      return (
        <FormField
          control={form.control}
          name='pin'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('pinLabel')}</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} disabled={isLoadingLogin} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>{t('pinDescription')}</FormDescription>
            </FormItem>
          )}
        />
      )
    } else {
      return (
        <>
          <FormField
            control={form.control}
            name='login'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('loginLabel')}</FormLabel>
                <FormControl>
                  <Input placeholder='johndoe' disabled={isLoadingLogin} {...field} />
                </FormControl>
                <FormDescription>{t('loginDescription')}</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('passwordLabel')}</FormLabel>
                <FormControl>
                  <Input placeholder='******' type='password' disabled={isLoadingLogin} {...field} />
                </FormControl>
                <FormDescription>{t('passwordDescription')}</FormDescription>
              </FormItem>
            )}
          />
        </>
      )
    }
  }

  return (
    <AuthWrapper heading={t('heading')} backButtonLabel={t('backButtonLabel')} backButtonHref='/signup'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-y-3 justify-items-center'>
          {renderContent()}

          <Button className='mt-2 w-full' disabled={!isValid || isLoadingLogin}>
            {t('submitButton')}
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  )
}
