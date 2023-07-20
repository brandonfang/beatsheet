'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC } from 'react'

type TProps = {
  children: React.ReactNode
}

const ReactQueryProvider: FC<TProps> = ({ children }) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default ReactQueryProvider
