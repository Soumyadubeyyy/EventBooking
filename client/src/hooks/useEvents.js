import { useQuery } from '@tanstack/react-query';
import { getEvents, getEventById } from '../api/events.api';

export function useEvents(params = {}) {
  return useQuery({
    queryKey: ['events', params],
    queryFn: () => getEvents(params),
    staleTime: 1000 * 60 * 2,
    keepPreviousData: true,
  });
}

export function useEvent(id) {
  return useQuery({
    queryKey: ['events', id],
    queryFn: () => getEventById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 2,
  });
}
