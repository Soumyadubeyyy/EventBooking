import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Button } from './Button';
import { Ticket, LogOut, User, Sun, Moon, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-violet-100 dark:border-violet-900/40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="p-1.5 rounded-lg bg-violet-100 dark:bg-violet-900/40 group-hover:bg-violet-200 dark:group-hover:bg-violet-800/40 transition-colors">
            <Ticket className="h-5 w-5 text-violet-700 dark:text-violet-400" />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-violet-950 dark:text-white">
            Event<span className="text-violet-600 dark:text-violet-400">Hub</span>
          </span>
        </Link>

        {/* Nav Links + Actions */}
        <div className="flex items-center space-x-1 md:space-x-2">
          <Link
            to="/"
            className="hidden sm:inline-flex items-center text-sm font-medium text-violet-600 hover:text-violet-900 dark:text-violet-400 dark:hover:text-violet-200 px-3 py-2 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-colors"
          >
            Events
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/my-bookings"
                className="hidden sm:inline-flex items-center space-x-1.5 text-sm font-medium text-violet-600 hover:text-violet-900 dark:text-violet-400 dark:hover:text-violet-200 px-3 py-2 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                <span>My Bookings</span>
              </Link>

              <div className="hidden md:flex items-center space-x-2 pl-3 ml-1 border-l border-violet-100 dark:border-violet-800">
                <div className="flex items-center space-x-1.5 text-sm text-violet-700 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/30 px-3 py-1.5 rounded-lg">
                  <User className="h-3.5 w-3.5" />
                  <span className="font-medium">{user?.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-violet-600">
                  <LogOut className="h-4 w-4 mr-1.5" />
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-2 pl-3 ml-1 border-l border-violet-100 dark:border-violet-800">
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                Log in
              </Button>
              <Button variant="primary" size="sm" onClick={() => navigate('/register')}>
                Sign up
              </Button>
            </div>
          )}

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="ml-2 p-2.5 rounded-lg text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </motion.button>
        </div>
      </div>
    </nav>
  );
};
