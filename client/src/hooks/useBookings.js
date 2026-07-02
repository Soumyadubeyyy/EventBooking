import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMyBookings, createBooking, cancelBooking } from '../api/bookings.api';
import toast from 'react-hot-toast';

export function useMyBookings() {
  return useQuery({
    queryKey: ['bookings', 'mine'],
    queryFn: getMyBookings,
    staleTime: 1000 * 60,
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      toast.success('Booking confirmed! 🎉');
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: () => {
      // Error toast is handled by the axios interceptor
    },
  });
}

export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelBooking,
    onSuccess: () => {
      toast.success('Booking cancelled successfully');
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: () => {
      // Error toast is handled by the axios interceptor
    },
  });
}
