// src/components/common/ChipGroup.jsx
import React from 'react';
import clsx from 'clsx';
import Chip from './Chip'; // Assuming Chip is in the same folder or adjust path

const ChipGroup = ({
  children,
  className,
  value, // For controlled component: can be single value or array for multiple
  onChange, // (newValue) => void
  multiple = false,
  mandatory = false, // If true, at least one chip must be selected (if multiple)
  max, // Max number of chips that can be selected
  chipProps = {}, // Props to pass down to all Chip components
  ...props
}) => {
  const handleChipSelect = (chipValue) => {
    if (typeof onChange !== 'function') return;

    let newValue;
    if (multiple) {
      const currentValueArray = Array.isArray(value) ? [...value] : (value ? [value] : []);
      if (currentValueArray.includes(chipValue)) {
        // Deselect if not mandatory or if more than one is selected
        if (!mandatory || currentValueArray.length > 1) {
          newValue = currentValueArray.filter(v => v !== chipValue);
        } else {
          newValue = currentValueArray; // Cannot deselect the last one if mandatory
        }
      } else {
        // Select
        if (max && currentValueArray.length >= max) {
          // Optional: if max is 1, replace current selection
          if (max === 1) {
            newValue = [chipValue];
          } else {
             // Do nothing or provide feedback that max is reached
            return;
          }
        } else {
          newValue = [...currentValueArray, chipValue];
        }
      }
    } else { // Single selection
      if (value === chipValue) {
        newValue = mandatory ? chipValue : undefined; // Deselect if not mandatory
      } else {
        newValue = chipValue;
      }
    }
    onChange(newValue);
  };

  return (
    <div className={clsx("flex flex-wrap gap-2", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === Chip) {
          const chipValue = child.props.value; // Assuming Chip has a 'value' prop for identification
          const isSelected = multiple
            ? Array.isArray(value) && value.includes(chipValue)
            : value === chipValue;

          return React.cloneElement(child, {
            ...chipProps, // Default props for all chips
            ...child.props, // Original props of the chip
            selected: isSelected,
            variant: child.props.variant || chipProps.variant || 'selectable', // Default to selectable
            onSelect: chipValue !== undefined ? () => handleChipSelect(chipValue) : child.props.onSelect,
          });
        }
        return child;
      })}
    </div>
  );
};

export default ChipGroup;