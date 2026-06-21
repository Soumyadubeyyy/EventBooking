import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMyBookings, cancelBooking } from '../api/bookings.api';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Calendar, MapPin, TicketX, CheckCircle2, Ticket } from 'lucide-react';

export const MyBookings = () => {
  const queryClient = useQueryClient();

  const { data: bookingsResponse, isLoading, isError } = useQuery({
    queryKey: ['bookings'],
    queryFn: () => getMyBookings(),
  });

  const cancelMutation = useMutation({
    mutationFn: (id) => cancelBooking(id),
    onSuccess: () => {
      toast.success('Booking cancelled successfully.');
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error.message || 'Failed to cancel booking.');
    },
  });

  const bookings = bookingsResponse?.data?.bookings || bookingsResponse?.bookings || [];

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="h-10 w-48 bg-violet-100 dark:bg-slate-800 rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-56 bg-violet-100 dark:bg-slate-800 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-20 text-center text-red-500 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-100 dark:border-red-900/30 max-w-md mx-auto p-8">
        Failed to load bookings. Please try again.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-extrabold text-violet-950 dark:text-white mb-10">Your Tickets</h1>

      {bookings.length === 0 ? (
        <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-3xl border border-violet-100 dark:border-violet-900/40 shadow-sm">
          <Ticket className="h-16 w-16 text-violet-200 dark:text-violet-800 mx-auto mb-6" />
          <h3 className="text-xl font-bold text-violet-900 dark:text-violet-200 mb-2">No bookings yet</h3>
          <p className="text-violet-500 dark:text-violet-600">Browse events and book your first experience!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bookings.map((booking, index) => {
            const isConfirmed = booking.status === 'confirmed' || booking.status === 'CONFIRMED';
            const isCancelled = booking.status === 'cancelled' || booking.status === 'CANCELLED';

            return (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full flex flex-col overflow-hidden">
                  {/* Status bar */}
                  <div className={`h-1.5 w-full ${isCancelled ? 'bg-red-400' : 'bg-emerald-400'}`} />

                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex flex-col gap-3">
                      <span>{booking.event?.name || 'Unknown Event'}</span>
                      <span
                        className={`inline-flex items-center w-fit text-xs px-3 py-1.5 rounded-full font-semibold ${
                          isCancelled
                            ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30'
                            : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30'
                        }`}
                      >
                        {isConfirmed && <CheckCircle2 className="w-3 h-3 mr-1.5" />}
                        {isCancelled && <TicketX className="w-3 h-3 mr-1.5" />}
                        {booking.status?.toUpperCase()}
                      </span>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-3 text-sm text-violet-700 dark:text-violet-400 flex-1">
                    {booking.event?.dateTime && (
                      <div className="flex items-center gap-3 bg-violet-50/50 dark:bg-violet-900/20 p-3 rounded-lg">
                        <Calendar className="h-4 w-4 text-violet-400 dark:text-violet-600 shrink-0" />
                        <span className="font-medium">
                          {new Date(booking.event.dateTime).toLocaleDateString('en-US', {
                            weekday: 'short', month: 'short', day: 'numeric',
                          })}
                          {' at '}
                          {new Date(booking.event.dateTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    )}
                    {booking.event?.venue && (
                      <div className="flex items-center gap-3 bg-violet-50/50 dark:bg-violet-900/20 p-3 rounded-lg">
                        <MapPin className="h-4 w-4 text-violet-400 dark:text-violet-600 shrink-0" />
                        <span className="font-medium">{booking.event.venue}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center bg-violet-50 dark:bg-violet-900/30 p-3 rounded-lg">
                      <span className="font-medium text-violet-800 dark:text-violet-300">Seats Reserved</span>
                      <span className="text-xl font-extrabold text-violet-700 dark:text-violet-200">{booking.seats || booking.seatsBooked}</span>
                    </div>
                  </CardContent>

                  {isConfirmed && (
                    <CardFooter className="pt-4 pb-5 border-t border-violet-50 dark:border-violet-900/30 mt-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                        isLoading={cancelMutation.isPending && cancelMutation.variables === booking._id}
                        onClick={() => {
                          if (window.confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
                            cancelMutation.mutate(booking._id);
                          }
                        }}
                      >
                        <TicketX className="mr-2 h-4 w-4" /> Cancel Reservation
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
