import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="flex justify-center items-center py-24 md:py-32">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-lg">
        <div className="mx-auto mb-6 h-20 w-20 rounded-2xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
          <Search className="h-10 w-10 text-violet-400 dark:text-violet-600" />
        </div>
        <h1 className="text-6xl font-extrabold text-violet-950 dark:text-white mb-4">404</h1>
        <p className="text-xl text-violet-700 dark:text-violet-400 mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg">
            Go back to Events
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};
