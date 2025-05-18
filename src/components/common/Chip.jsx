// src/components/common/Chip.jsx
import React from 'react';
import clsx from 'clsx';
import { XMarkIcon } from '@heroicons/react/20/solid'; // Smaller icon for close

const Chip = ({
  children,
  variant = 'default', // 'default', 'outline', 'selectable'
  color = 'primary',   // 'primary', 'secondary', 'accent', 'danger', 'success', 'warning'
  size = 'md',         // 'sm', 'md', 'lg'
  selected = false,
  onSelect,
  onClose,
  className,
  closable = false,
  disabled = false,
  ...props
}) => {
  const isSelectable = variant === 'selectable' || !!onSelect;

  const baseStyles = 'inline-flex items-center justify-center border font-medium transition-all duration-150';

  const sizeStyles = {
    sm: 'px-3 py-1 text-xs rounded-full',
    md: 'px-3.5 py-1.5 text-sm rounded-full',
    lg: 'px-4 py-2 text-sm rounded-full',
  };

  // Define color schemes. These can be expanded in tailwind.config.js if needed.
  // For now, we use existing primary, secondary, etc., and adjust text/border.
  const colorStyles = {
    default: {
      primary: 'bg-primary/10 border-primary/30 text-primary hover:bg-primary/20',
      secondary: 'bg-muted border-border text-muted-foreground hover:bg-border',
      // Add more colors (accent, danger etc.)
    },
    outline: {
      primary: 'border-primary text-primary hover:bg-primary/10',
      secondary: 'border-border text-muted-foreground hover:bg-secondary',
    },
    selectable: { // Styles for when the chip is selectable
      primary: selected
        ? 'bg-primary border-primary text-primary-foreground'
        : 'bg-background border-border text-foreground hover:bg-primary/10 hover:border-primary/50',
      secondary: selected
        ? 'bg-secondary border-border text-secondary-foreground ring-1 ring-primary' // Example for selected secondary
        : 'bg-background border-border text-muted-foreground hover:bg-secondary/70',
    }
  };

  const currentColorScheme = colorStyles[variant] || colorStyles['default'];
  const chipColorStyle = currentColorScheme[color] || currentColorScheme['secondary'];

  const chipClasses = clsx(
    baseStyles,
    sizeStyles[size],
    chipColorStyle,
    {
      'cursor-pointer': isSelectable && !disabled,
      'opacity-75 cursor-not-allowed': disabled,
    },
    className
  );

  const handleChipClick = () => {
    if (disabled) return;
    if (onSelect) {
      onSelect();
    }
  };

  return (
    <div
      className={chipClasses}
      onClick={isSelectable ? handleChipClick : undefined}
      role={isSelectable ? "button" : undefined}
      tabIndex={isSelectable && !disabled ? 0 : undefined}
      onKeyDown={(e) => {
        if (isSelectable && !disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleChipClick();
        }
      }}
      {...props}
    >
      {children}
      {closable && onClose && !disabled && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // Prevent chip click if selectable
            onClose();
          }}
          className={clsx(
            "ml-1.5 -mr-0.5 p-0.5 rounded-full inline-flex items-center justify-center hover:bg-black/10 focus:outline-none focus:ring-1 focus:ring-current",
            size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4' // Adjust icon size
          )}
          aria-label="Remove"
        >
          <XMarkIcon className="h-full w-full" />
        </button>
      )}
    </div>
  );
};

export default Chip;