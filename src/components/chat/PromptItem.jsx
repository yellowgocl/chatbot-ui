import React from 'react';
import { CheckIcon } from '@heroicons/react/24/solid'; // Assuming @heroicons/react is used
import clsx from 'clsx';

const PromptItem = ({ prompt, isSelected, onSelect }) => {
  return (
    <div
      className={clsx(
        'prompt-label cursor-pointer hover:bg-gray-100 p-2 rounded-md flex items-center justify-between',
        isSelected ? 'bg-blue-100 border border-blue-500' : ''
      )}
      onClick={() => onSelect(prompt)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(prompt)}
    >
      {/* Text element with original relevant classes, flex-grow to take space */}
      <p className="text-sm text-foreground line-clamp-2 flex-grow mr-2">{prompt.text}</p>

      {/* Icon container - maintains size and shape, changes appearance based on selection */}
      <div className={clsx(
        'h-5 w-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors duration-300',
        isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300' // Added bg-blue-500 when selected, kept gray border when not
      )}>
        {/* Check Icon with animation - always render but control visibility/scale and color */}
        <CheckIcon className={clsx(
          'h-4 w-4 transition-all duration-300 ease-out',
          isSelected ? 'opacity-100 scale-100 text-white' : 'opacity-0 scale-0 text-blue-600' // Animate opacity, scale, and change color to white when selected
        )} />
      </div>

      {/* Optional: Add back tags div if needed */}
      {/* <div className="flex flex-wrap gap-1 mt-1.5">
        {prompt.tags.map(tag => (
          <Chip key={tag} size="sm" variant="default" color="secondary" className="pointer-events-none">
            {tag}
          </Chip>
        ))}
      </div> */}
    </div>
  );
};

export default PromptItem;