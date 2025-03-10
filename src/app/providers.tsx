import { Toaster } from '@/components/ui'
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
        <ThemeProvider attribute='class' defaultTheme='dark' disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </NextIntlClientProvider>
    </ApolloClientProvider>
  )
}
