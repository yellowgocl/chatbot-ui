// src/components/common/Button.jsx
import React from 'react';
import clsx from 'clsx';

const Button = React.forwardRef(
  ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    rounded = false, // New prop for rounded corners
    leftIcon: LeftIcon, // New prop for left icon component
    rightIcon: RightIcon, // New prop for right icon component
    loading = false, // New prop for loading state
    active = false, // From IconButton
    'aria-label': ariaLabel, // From IconButton
    ...props
  }, ref) => {

    // Validation for icon usage without children
    if (LeftIcon && RightIcon && !children) {
        console.error("Button: Cannot use both leftIcon and rightIcon without children.");
        // Decide how to handle this: return null, throw error, or render with default? 
        // For now, we'll proceed but log an error.
    }

    const isIconOnly = (LeftIcon || RightIcon) && !children && !rounded;

    const baseClasses = clsx(
      'inline-flex items-center justify-center font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
      // Apply rounded-full if rounded prop is true or if it's an icon-only button
      (rounded || isIconOnly) ? 'rounded-full' : 'rounded-md',
      loading && 'opacity-50 cursor-not-allowed'
    );

    const sizeClasses = {
      sm: isIconOnly ? 'p-1.5' : 'px-3 py-1.5 text-xs',
      md: isIconOnly ? 'p-2' : 'px-4 py-2 text-sm',
      lg: isIconOnly ? 'p-2.5' : 'px-6 py-3 text-base',
    };

    // Merged variant styles from Button and IconButton
    const variantStyles = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary-light',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-muted border border-border',
      ghost: 'hover:bg-muted text-muted-foreground hover:text-foreground',
      danger: 'btn-danger', // Keep btn-danger for now, could convert to direct tailwind if needed
      toolbar: clsx(
        'shadow-md border',
        active
          ? 'bg-primary text-primary-foreground hover:bg-primary-light border-primary'
          : 'bg-background hover:bg-muted text-muted-foreground hover:text-foreground border-border'
      ),
    };

    return (
      <button
        ref={ref}
        aria-label={ariaLabel}
        className={clsx(
          baseClasses,
          sizeClasses[size],
          variantStyles[variant],
          className
        )}
        disabled={loading || props.disabled} // Disable if loading or explicitly disabled
        {...props}
      >
        {LeftIcon && <LeftIcon className={clsx('h-5 w-5', children && 'mr-2')} />} {/* Render left icon with margin if children exist */}
        {children}
        {RightIcon && <RightIcon className={clsx('h-5 w-5', children && 'ml-2')} />} {/* Render right icon with margin if children exist */}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
