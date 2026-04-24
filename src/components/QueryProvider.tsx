'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type QueryProviderProps = {
  children: React.ReactNode;
};

const QueryProvider = ({ children }: QueryProviderProps) => {
  const [queryClient] = useState(
    // avoid refetching immediately on the client-side ( default stale time is 0 seconds)
    () => new QueryClient({ defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } } }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryProvider;
