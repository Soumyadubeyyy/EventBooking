import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getEventById } from '../api/events.api';
import { createBooking } from '../api/bookings.api';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import toast from 'react-hot-toast';
import { Calendar, MapPin, Users, Ticket, ArrowLeft, Plus, Minus, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  const [seats, setSeats] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const { data: eventResponse, isLoading, isError, refetch } = useQuery({
    queryKey: ['event', id],
    queryFn: () => getEventById(id),
  });

  const bookMutation = useMutation({
    mutationFn: (bookingData) => createBooking(bookingData),
    onSuccess: () => {
      toast.success('Booking confirmed! 🎉');
      setShowModal(false);
      refetch();
      queryClient.invalidateQueries({ queryKey: ['events'] });
      navigate('/my-bookings');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error.message || 'Failed to book seats.');
      setShowModal(false);
    },
  });

  const event = eventResponse?.data?.event || eventResponse?.event;

  const handleBookClick = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to book seats.');
      navigate('/login');
      return;
    }
    setShowModal(true);
  };

  const confirmBooking = () => {
    bookMutation.mutate({ eventId: event._id, seats: Number(seats) });
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
        <div className="h-10 w-24 bg-violet-100 dark:bg-slate-800 rounded-lg" />
        <div className="h-96 bg-violet-100 dark:bg-slate-800 rounded-3xl" />
      </div>
    );
  }

  if (isError || !event) {
    return (
      <div className="py-20 text-center max-w-lg mx-auto mt-8">
        <div className="bg-red-50 dark:bg-red-900/20 p-10 rounded-2xl border border-red-100 dark:border-red-900/30">
          <p className="text-red-600 dark:text-red-400 font-medium text-lg">Event not found.</p>
          <Button variant="ghost" className="mt-4" onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to events
          </Button>
        </div>
      </div>
    );
  }

  const isSoldOut = event.availableSeats === 0;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
      <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to events
      </Button>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-violet-100 dark:border-violet-900/40 overflow-hidden">
        {/* Accent */}
        <div className={`h-2 w-full ${isSoldOut ? 'bg-red-400' : 'bg-gradient-to-r from-violet-500 to-purple-500'}`} />

        <div className="p-8 md:p-14">
          <h1 className="text-3xl md:text-5xl font-extrabold text-violet-950 dark:text-white mb-8 leading-tight">
            {event.name}
          </h1>

          {/* Info chips */}
          <div className="flex flex-wrap gap-4 mb-10">
            <div className="flex items-center space-x-3 bg-violet-50 dark:bg-violet-900/30 px-5 py-3 rounded-xl border border-violet-100 dark:border-violet-900/40">
              <Calendar className="h-5 w-5 text-violet-500 dark:text-violet-400" />
              <span className="font-medium text-violet-800 dark:text-violet-300">
                {new Date(event.dateTime).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                {' at '}
                {new Date(event.dateTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div className="flex items-center space-x-3 bg-violet-50 dark:bg-violet-900/30 px-5 py-3 rounded-xl border border-violet-100 dark:border-violet-900/40">
              <MapPin className="h-5 w-5 text-violet-500 dark:text-violet-400" />
              <span className="font-medium text-violet-800 dark:text-violet-300">{event.venue}</span>
            </div>
            <div className={`flex items-center space-x-3 px-5 py-3 rounded-xl border ${
              isSoldOut
                ? 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/30'
                : 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-900/30'
            }`}>
              <Users className={`h-5 w-5 ${isSoldOut ? 'text-red-500' : 'text-emerald-500'}`} />
              <span className={`font-semibold ${isSoldOut ? 'text-red-600 dark:text-red-400' : 'text-emerald-700 dark:text-emerald-400'}`}>
                {isSoldOut ? 'Sold Out' : `${event.availableSeats} / ${event.totalSeats} seats left`}
              </span>
            </div>
            {event.category && (
              <div className="flex items-center space-x-3 bg-violet-50 dark:bg-violet-900/30 px-5 py-3 rounded-xl border border-violet-100 dark:border-violet-900/40">
                <span className="font-medium text-violet-800 dark:text-violet-300 capitalize">{event.category}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-14">
            <h3 className="text-xl font-bold text-violet-950 dark:text-violet-100 mb-4">About this experience</h3>
            <p className="text-lg leading-relaxed text-violet-800/80 dark:text-violet-300/80 whitespace-pre-line">{event.description}</p>
          </div>

          {/* Booking Section */}
          <div className="bg-violet-50 dark:bg-violet-900/20 p-8 rounded-2xl border border-violet-100 dark:border-violet-800/40">
            <h3 className="text-xl font-bold text-violet-950 dark:text-violet-100 mb-6 flex items-center">
              <Ticket className="mr-2.5 h-5 w-5 text-violet-500" /> Reserve your spot
            </h3>

            {!isSoldOut ? (
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                {/* Seat Stepper */}
                <div>
                  <label className="block text-sm font-semibold text-violet-800 dark:text-violet-300 mb-2">
                    Number of Seats
                  </label>
                  <div className="flex items-center gap-0">
                    <button
                      type="button"
                      onClick={() => setSeats((s) => Math.max(1, s - 1))}
                      disabled={seats <= 1}
                      className="h-11 w-11 flex items-center justify-center rounded-l-lg border border-violet-200 dark:border-violet-700 bg-white dark:bg-slate-800 text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <div className="h-11 w-16 flex items-center justify-center border-y border-violet-200 dark:border-violet-700 bg-white dark:bg-slate-800 text-lg font-bold text-violet-900 dark:text-violet-100 tabular-nums">
                      {seats}
                    </div>
                    <button
                      type="button"
                      onClick={() => setSeats((s) => Math.min(event.availableSeats, s + 1))}
                      disabled={seats >= event.availableSeats}
                      className="h-11 w-11 flex items-center justify-center rounded-r-lg border border-violet-200 dark:border-violet-700 bg-white dark:bg-slate-800 text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex-1"></div>
                <div className="text-right">
                  <div className="text-sm font-medium text-violet-600 dark:text-violet-400 mb-1">Total</div>
                  <div className="text-2xl font-bold text-violet-900 dark:text-violet-100">{seats} {seats === 1 ? 'Seat' : 'Seats'}</div>
                </div>

                <Button variant="primary" size="lg" className="w-full sm:w-auto" onClick={handleBookClick}>
                  <Ticket className="mr-2 h-5 w-5" /> Book Now
                </Button>
              </div>
            ) : (
              <div className="flex items-center p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl border border-red-100 dark:border-red-900/30 font-medium">
                <span className="h-2.5 w-2.5 bg-red-500 rounded-full mr-3 animate-pulse" />
                Sorry, this event is completely sold out.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Confirm Your Booking"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={confirmBooking} isLoading={bookMutation.isPending}>
              <CheckCircle2 className="mr-2 h-4 w-4" /> Confirm Booking
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="bg-violet-50 dark:bg-violet-900/20 p-5 rounded-xl border border-violet-100 dark:border-violet-800/40 space-y-3">
            <p className="font-bold text-violet-950 dark:text-violet-100 text-lg">{event.name}</p>
            <div className="flex items-center gap-2 text-sm text-violet-700 dark:text-violet-400">
              <Calendar className="h-4 w-4" />
              {new Date(event.dateTime).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              {' at '}
              {new Date(event.dateTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="flex items-center gap-2 text-sm text-violet-700 dark:text-violet-400">
              <MapPin className="h-4 w-4" />
              {event.venue}
            </div>
          </div>
          <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-xl border border-violet-100 dark:border-violet-800/40">
            <span className="text-sm font-medium text-violet-700 dark:text-violet-400">Seats</span>
            <span className="text-2xl font-extrabold text-violet-900 dark:text-violet-100">{seats}</span>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};
