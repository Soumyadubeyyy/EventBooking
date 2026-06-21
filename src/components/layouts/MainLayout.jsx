import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../ui/Navbar';

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#F2EEF9] dark:bg-slate-950 text-violet-950 dark:text-slate-100 font-sans selection:bg-violet-400/30 flex flex-col transition-colors duration-200">
      <Navbar />
      <main className="container mx-auto px-4 md:px-6 py-8 flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-violet-100 dark:border-violet-900/40 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-violet-400 dark:text-violet-600">
          &copy; {new Date().getFullYear()} EventHub &mdash; Your premium event booking platform.
        </div>
      </footer>
    </div>
  );
};
