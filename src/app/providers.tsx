'use client'

import { ApolloClientProvider } from '@/providers/apollo-client-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'

interface Props {
  children: React.ReactNode
  messages: AbstractIntlMessages
}

export const Providers = ({ children, messages }: Props) => {
  return (
    <ApolloClientProvider>
      <NextIntlClientProvider messages={messages}>
        <ThemeProvider>{children}</ThemeProvider>
      </NextIntlClientProvider>
    </ApolloClientProvider>
  )
}
