import { screen } from '@testing-library/react';
import { rest } from 'msw';

// import { defaultQueryClientOptions } from '../../../react-query/queryClient';
import { server } from '../../../mocks/server';
import { renderWithQueryClient } from '../../../test-utils';
// import { renderWithClient } from '../../../test-utils';
import { AllStaff } from '../AllStaff';

describe('All Staff', () => {
  test('renders without error', () => {
    renderWithQueryClient(<AllStaff />);
  });

  test('renders response from query', async () => {
    renderWithQueryClient(<AllStaff />);

    const staffNAmes = await screen.findAllByRole('heading', {
      name: /sandra|divya|mateo|michael/i,
    });

    expect(staffNAmes).toHaveLength(4);
  });

  test('handles query error', async () => {
    // (re)set handler to return a 500 error for staff
    server.resetHandlers(
      rest.get('http://localhost:3030/staff', (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    renderWithQueryClient(<AllStaff />);

    // check for alert toast.
    const alertToast = await screen.findByRole('alert');

    expect(alertToast).toHaveTextContent(/status code 500/i);
  });
});
