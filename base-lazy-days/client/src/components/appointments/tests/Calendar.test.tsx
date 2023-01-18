import { screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';

import { server } from '../../../mocks/server';
import { renderWithQueryClient } from '../../../test-utils';
// import { defaultQueryClientOptions } from '../../../react-query/queryClient';
import { Calendar } from '../Calendar';

// mocking useUser to mimic a logged-in user
// jest.mock('../../user/hooks/useUser', () => ({
//   __esModule: true,
//   useUser: () => ({ user: mockUser }),
// }));

describe('Calendar', () => {
  test('Reserve appointment error', async () => {
    // (re)set handler to return a 500 error for appointments
    server.resetHandlers(
      rest.get(
        'http://localhost:3030/appointments/:month/:year',
        (req, res, ctx) => {
          return res(ctx.status(500));
        },
      ),
    );

    renderWithQueryClient(<Calendar />);

    // Account for race condition where some machines might run the query
    // after one toast appears, where others might run after both.
    // Wait until there are two alerts, one from fetch and one from pre-fetch.
    await waitFor(() => {
      const alertToasts = screen.getAllByRole('alert');
      expect(alertToasts).toHaveLength(2);
      alertToasts.map((toast) =>
        expect(toast).toHaveTextContent('Request failed with status code 500'),
      );
    });
  });
});
