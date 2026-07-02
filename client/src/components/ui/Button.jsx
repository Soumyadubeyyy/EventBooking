import React from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Button = React.forwardRef(
  ({ className = '', variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none';

    const variants = {
      primary:
        'bg-violet-700 text-white hover:bg-violet-800 focus-visible:ring-violet-600 shadow-sm shadow-violet-200 dark:shadow-violet-900/30',
      secondary:
        'bg-violet-100 text-violet-900 hover:bg-violet-200 focus-visible:ring-violet-500 dark:bg-violet-900/40 dark:text-violet-200 dark:hover:bg-violet-800/50',
      outline:
        'border border-violet-300 bg-transparent hover:bg-violet-50 text-violet-700 dark:border-violet-700 dark:text-violet-300 dark:hover:bg-violet-900/30',
      danger:
        'bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500 shadow-sm',
      ghost:
        'hover:bg-violet-50 text-violet-700 dark:text-violet-300 dark:hover:bg-violet-900/30',
    };

    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-10 px-5 py-2 text-sm',
      lg: 'h-12 px-8 text-base',
      icon: 'h-10 w-10',
    };

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
      <motion.button
        ref={ref}
        whileHover={!props.disabled && !isLoading ? { scale: 1.02 } : {}}
        whileTap={!props.disabled && !isLoading ? { scale: 0.97 } : {}}
        className={classes}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
