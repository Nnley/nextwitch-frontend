'use client'

import { client } from '@/lib/apollo-client'
import { ApolloProvider } from '@apollo/client'
import type { PropsWithChildren } from 'react'

export function ApolloClientProvider({ children }: PropsWithChildren) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
