import { screen } from '@testing-library/react';

import { renderWithQueryClient } from '../../../test-utils';
import { Treatments } from '../Treatments';

describe('Treatments', () => {
  test('renders without error', () => {
    renderWithQueryClient(<Treatments />);
  });

  test('renders response from query', async () => {
    renderWithQueryClient(<Treatments />);

    const treatmentTitles = await screen.findAllByRole('heading', {
      name: /massage|facial|scrub/i,
    });

    expect(treatmentTitles).toHaveLength(3);
  });
});
