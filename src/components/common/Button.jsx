// src/components/common/Button.jsx
import React from 'react';
import clsx from 'clsx';

const Button = React.forwardRef(
  ({ children, variant = 'primary', size = 'md', className, ...props }, ref) => {
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    };

    const variantClasses = {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      ghost: 'btn-ghost',
      danger: 'btn-danger',
      // Add more variants from tailwind.config.js if needed
    };

    return (
      <button
        ref={ref}
        className={clsx(
          'btn', // Base styles from index.css
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;