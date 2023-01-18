import { act, renderHook } from '@testing-library/react-hooks';

import { createQueryClientWrapper } from '../../../test-utils';
import { useStaff } from '../hooks/useStaff';

describe('useStaff hook', () => {
  test('filter staff', async () => {
    const { result, waitFor } = renderHook(() => useStaff(), {
      wrapper: createQueryClientWrapper(),
    });

    // Wait for the staff to populate.
    await waitFor(() => result.current.staff.length === 4);

    // Set to filter to 'scrub'.
    act(() => result.current.setFilter('scrub'));

    // Wait for the staff list to display only 2.
    await waitFor(() => result.current.staff.length === 2);
  });
});
