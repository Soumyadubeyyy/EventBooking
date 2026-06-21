import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getEvents } from '../api/events.api';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Calendar, MapPin, Users, Sparkles, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Home = () => {
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setPage(1); // Reset to page 1 on new search
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput]);

  const { data: eventsData, isLoading, isError, isFetching } = useQuery({
    queryKey: ['events', { page, search: debouncedSearch }],
    queryFn: () => getEvents({ page, limit: 9, search: debouncedSearch }),
    keepPreviousData: true,
  });

  const events = eventsData?.data?.events || eventsData?.events || [];
  const pagination = eventsData?.data?.pagination || eventsData?.pagination || null;

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-200/40 via-transparent to-purple-200/30 dark:from-violet-900/20 dark:to-purple-900/10 rounded-3xl" />
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
          >
            <Sparkles className="h-4 w-4" />
            Curated experiences just for you
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-violet-950 dark:text-white mb-6 leading-tight"
          >
            Discover & Book{' '}
            <span className="bg-gradient-to-r from-violet-700 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
              Amazing Events
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-violet-700 dark:text-violet-400 max-w-2xl mx-auto leading-relaxed"
          >
            Browse upcoming events, reserve your seats instantly, and manage all your bookings in one place.
          </motion.p>
        </div>
      </section>

      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-violet-400 dark:text-violet-500" />
        </div>
        <input
          type="text"
          placeholder="Search for events by name or description..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-violet-200 dark:border-violet-800/60 bg-white dark:bg-slate-900 text-violet-900 dark:text-violet-100 placeholder:text-violet-400 dark:placeholder:text-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm transition-all"
        />
        {isFetching && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <div className="h-4 w-4 border-2 border-violet-200 border-t-violet-500 rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Events Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-72 bg-violet-100 dark:bg-slate-800 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : isError ? (
        <div className="text-center text-red-500 py-12 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-100 dark:border-red-900/30">
          Failed to load events. Please try again later.
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-violet-100 dark:border-violet-900/40 shadow-sm">
          <Calendar className="mx-auto h-14 w-14 text-violet-200 dark:text-violet-800 mb-5" />
          <p className="text-lg font-medium text-violet-400 dark:text-violet-600">No events found.</p>
          <p className="text-sm text-violet-300 dark:text-violet-700 mt-1">Try adjusting your search terms.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => {
              const seatsLeft = event.availableSeats;
              const isSoldOut = seatsLeft === 0;
              const isLow = seatsLeft > 0 && seatsLeft <= 10;
              const eventDate = new Date(event.dateTime);

              return (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Card hover className="h-full flex flex-col overflow-hidden">
                    {/* Color accent bar */}
                    <div className={`h-1.5 w-full ${isSoldOut ? 'bg-red-400' : isLow ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                    <CardHeader>
                      <div className="flex items-center justify-between gap-2">
                        <CardTitle className="text-lg">{event.name}</CardTitle>
                        {event.category && (
                          <span className="text-xs font-semibold bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 px-2.5 py-1 rounded-full capitalize shrink-0">
                            {event.category}
                          </span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-4 text-sm text-violet-700 dark:text-violet-400">
                      <p className="line-clamp-2 leading-relaxed">{event.description}</p>
                      <div className="space-y-2.5 pt-4 border-t border-violet-50 dark:border-violet-900/30">
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-4 w-4 text-violet-400 dark:text-violet-600 shrink-0" />
                          <span>{eventDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })} &middot; {eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-4 w-4 text-violet-400 dark:text-violet-600 shrink-0" />
                          <span className="truncate">{event.venue}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Users className={`h-4 w-4 shrink-0 ${isSoldOut ? 'text-red-400' : isLow ? 'text-amber-400' : 'text-emerald-400'}`} />
                          <span className={`font-semibold ${isSoldOut ? 'text-red-500' : isLow ? 'text-amber-500' : 'text-emerald-600 dark:text-emerald-400'}`}>
                            {isSoldOut ? 'Sold out' : `${seatsLeft} / ${event.totalSeats} seats available`}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-4 border-t border-violet-50 dark:border-violet-900/30">
                      <Link to={`/events/${event._id}`} className="w-full">
                        <Button variant={isSoldOut ? 'secondary' : 'primary'} className="w-full">
                          {isSoldOut ? 'View Event' : 'View & Book'}
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {pagination && pagination.pages > 1 && (
            <div className="flex items-center justify-center gap-4 pt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              <div className="text-sm font-semibold text-violet-800 dark:text-violet-300">
                Page {page} of {pagination.pages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                disabled={page === pagination.pages}
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
