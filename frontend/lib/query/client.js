import { QueryClient } from '@tanstack/react-query'

let queryClient

export const getQueryClient = () => {
  if (!queryClient) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 30 * 1000,
          refetchOnWindowFocus: false,
        },
      },
    })
  }

  return queryClient
}
