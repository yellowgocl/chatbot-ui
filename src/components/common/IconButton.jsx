// src/components/common/IconButton.jsx
import React from 'react';
import clsx from 'clsx';

const IconButton = React.forwardRef(
  ({ children, variant = 'ghost', size = 'md', className, 'aria-label': ariaLabel, active = false, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary';

    // General padding sizes, shape will be determined by variant or a new prop if needed
    const sizeClasses = {
      sm: 'p-1.5',
      md: 'p-2',
      lg: 'p-2.5',
    };

    // Define base shape for variants, 'toolbar' variant will always be circular
    let shapeClass = 'rounded-md'; // Default shape
    if (variant === 'toolbar') {
      shapeClass = 'rounded-full';
    }

    const variantStyles = {
      primary: clsx(
        'bg-primary text-primary-foreground hover:bg-primary-light',
        shapeClass // Apply shape, typically rounded-md for primary unless overridden
      ),
      secondary: clsx(
        'bg-secondary text-secondary-foreground hover:bg-muted border border-border',
        shapeClass // Apply shape
      ),
      ghost: clsx(
        'hover:bg-muted text-muted-foreground hover:text-foreground',
        shapeClass // Apply shape
      ),
      toolbar: clsx(
        'shadow-md border', // Base styles for toolbar variant
        shapeClass, // Ensures rounded-full
        active
          ? 'bg-primary text-primary-foreground hover:bg-primary-light border-primary' // Active state: blue background
          : 'bg-background hover:bg-muted text-muted-foreground hover:text-foreground border-border' // Inactive state: white/light gray background
      ),
    };

    return (
      <button
        ref={ref}
        aria-label={ariaLabel}
        className={clsx(
          baseClasses,
          sizeClasses[size], // Apply padding
          // Note: shapeClass is now part of variantStyles to handle variant-specific shapes correctly
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
IconButton.displayName = 'IconButton';
export default IconButton;