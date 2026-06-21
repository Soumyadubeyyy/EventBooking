import React from 'react';

export const Input = React.forwardRef(({ className = '', label, error, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-violet-800 dark:text-violet-300 mb-1.5">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`flex h-10 w-full rounded-lg border bg-white dark:bg-slate-800 px-3 py-2 text-sm text-violet-900 dark:text-violet-100 placeholder:text-violet-300 dark:placeholder:text-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${
          error
            ? 'border-red-400 focus:ring-red-500'
            : 'border-violet-200 dark:border-violet-700'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
