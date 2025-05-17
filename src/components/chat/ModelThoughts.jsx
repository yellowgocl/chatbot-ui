// src/components/chat/ModelThoughts.jsx
import React, { useState } from 'react';
import { SparklesIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'; // Sparkles could be solid too

const ModelThoughts = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-secondary rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-3 text-sm text-left text-muted-foreground hover:text-foreground"
      >
        <div className="flex items-center">
          <SparklesIcon className="h-5 w-5 mr-2 text-primary" /> {/* Adjusted size */}
          <span>Thoughts <span className="text-xs">(experimental)</span></span>
        </div>
        {isOpen ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />} {/* Adjusted size */}
      </button>
      {isOpen && (
        <div className="p-3 border-t border-border text-sm text-muted-foreground">
          Model thoughts would appear here...
        </div>
      )}
    </div>
  );
};
export default ModelThoughts;