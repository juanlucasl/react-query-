import { render, RenderResult } from '@testing-library/react';
import { ReactElement } from 'react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';

import { generateQueryClient } from '../react-query/queryClient';

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {
    // Don't print errors to the console.
  },
});

/**
 * Generates a unique QueryClient for each test.
 */
const generateTestQueryClient = () => {
  const testQueryClient = generateQueryClient();
  const options = testQueryClient.getDefaultOptions();
  options.queries = {
    ...options.queries,
    retry: false,
  };

  return testQueryClient;
};

export function renderWithQueryClient(
  ui: ReactElement,
  client?: QueryClient,
): RenderResult {
  const queryClient = client ?? generateTestQueryClient();

  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
}

// import { defaultQueryClientOptions } from '../react-query/queryClient';

export const createQueryClientWrapper = (): React.FC => {
  const queryClient = generateTestQueryClient();
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
