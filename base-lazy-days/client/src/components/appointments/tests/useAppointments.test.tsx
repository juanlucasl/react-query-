import { act, renderHook } from '@testing-library/react-hooks';

import { createQueryClientWrapper } from '../../../test-utils';
import { useAppointments } from '../hooks/useAppointments';
import { AppointmentDateMap } from '../types';

/**
 * Returns the total number of appointments on an AppointmentDateMap object.
 * @param appointments
 */
const getAppointmentCount = (appointments: AppointmentDateMap) =>
  Object.values(appointments).reduce(
    (runningCount, appointmentsOnDate) =>
      runningCount + appointmentsOnDate.length,
    0,
  );

describe('useAppointments hook', () => {
  test('filter appointments by availability', async () => {
    const { result, waitFor } = renderHook(useAppointments, {
      wrapper: createQueryClientWrapper(),
    });

    // Wait for the appointments to populate.
    await waitFor(() => getAppointmentCount(result.current.appointments) > 0);

    const filteredAppointmentLength = getAppointmentCount(
      result.current.appointments,
    );

    // Set to filter to all appointments.
    act(() => result.current.setShowAll(true));

    // Wait for the appointments to show more than when filtered.
    await waitFor(() => {
      return (
        getAppointmentCount(result.current.appointments) >
        filteredAppointmentLength
      );
    });
  });
});
