'use client'

import { Button, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, Input } from '@/components/ui'
import { useCreateUserMutation } from '@/graphql/generated/output'
import { createAccountSchema, TypeCreateAccountSchema } from '@/schemas/auth/create-account.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { AuthWrapper } from '../AuthWrapper'

export const CreateAccountForm: React.FC = () => {
  const t = useTranslations('auth.register')

  const [isSuccess, setIsSuccess] = React.useState<boolean>(false)

  const form = useForm<TypeCreateAccountSchema>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  const [create, { loading: isLoadingCreate }] = useCreateUserMutation({
    onCompleted() {
      setIsSuccess(true)
    },
    onError(error) {
      console.error(error)
      toast.error(t('errorMessage'))
    },
  })

  const { isValid } = form.formState

  const onSubmit = (data: TypeCreateAccountSchema) => {
    create({
      variables: {
        data: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      },
    })
  }

  if (isSuccess) {
    return (
      <AuthWrapper
        heading={t('success.heading')}
        backButtonLabel={t('success.backButtonLabel')}
        backButtonHref='/account/login'
        className='text-center space-y-4'
      >
        <div className='flex flex-col items-center space-y-6 pt-8'>
          <div className='animate-bounce'>
            <CheckCircle className='h-16 w-16 text-green-500' />
          </div>

          <div className='space-y-4'>
            <h2 className='text-2xl font-semibold text-green-500'>{t('success.welcomeMessage')}</h2>

            <p className='text-muted-foreground text-lg max-w-sm mx-auto'>{t('success.verificationMessage')}</p>
          </div>

          <div className='bg-muted/30 rounded-lg p-4 mt-6 max-w-sm'>
            <p className='text-sm text-muted-foreground'>{t('success.spamMessage')}</p>
          </div>
        </div>
      </AuthWrapper>
    )
  }

  return (
    <AuthWrapper heading={t('heading')} backButtonLabel={t('backButtonLabel')} backButtonHref='/account/login'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-y-3'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('usernameLabel')}</FormLabel>
                <FormControl>
                  <Input placeholder='johndoe' disabled={isLoadingCreate} {...field} />
                </FormControl>
                <FormDescription>{t('usernameDescription')}</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('emailLabel')}</FormLabel>
                <FormControl>
                  <Input placeholder='johndoe@example.com' type='email' disabled={isLoadingCreate} {...field} />
                </FormControl>
                <FormDescription>{t('emailDescription')}</FormDescription>
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
                  <Input placeholder='******' type='password' disabled={isLoadingCreate} {...field} />
                </FormControl>
                <FormDescription>{t('passwordDescription')}</FormDescription>
              </FormItem>
            )}
          />

          <Button className='mt-2 w-full' disabled={!isValid || isLoadingCreate}>
            {t('submitButton')}
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  )
}
