import React, { useState, memo } from 'react';
// import { Terminal, PenTool } from 'lucide-react';
import { BuildingLibraryIcon, CloudIcon } from '@heroicons/react/20/solid'; // Smaller icon for close

const ModeToggle = () => {
  // true = Developer, false = Designer
  const [isDeveloper, setIsDeveloper] = useState(true);

  const handleToggle = () => {
    setIsDeveloper(!isDeveloper);
  };

  // Define colors for reusability
  const developerColor = 'bg-blue-200';
  const designerColor = 'bg-yellow-200';
  const activeTextColor = 'text-black';
  const inactiveTextColor = 'text-gray-400';

  return (
    <div className="flex items-center justify-center bg-white">
      <div className="flex items-center space-x-4">

        {/* Developer Label */}
        <span className={`font-bold text-sm transition-colors duration-300 ${isDeveloper ? activeTextColor : inactiveTextColor}`}>
          Standard
        </span>

        {/* The Main Toggle Switch Container */}
        <div
          onClick={handleToggle}
          className={`relative flex items-center w-16 h-8 px-[2px] rounded-full cursor-pointer transition-colors duration-300 ease-in-out
            ${isDeveloper ? developerColor : designerColor}`}
        >
          {/* The Sliding Thumb */}
          <div
            className={`absolute bg-white p-1 w-7 h-7 rounded-full shadow-md flex items-center justify-center
              transform transition-transform duration-300 ease-in-out
              ${isDeveloper ? 'translate-x-0' : 'translate-x-8'}`}
          >
            {/* 
              Icon explanation:
              - We use absolute positioning and opacity transitions for a smooth fade effect.
              - The icon that should be visible has opacity-100, the other has opacity-0.
            */}
            <div className="relative w-full h-full flex items-center justify-center">
              < CloudIcon
                size={24}
                className={`transition-opacity duration-300 absolute ${isDeveloper ? 'opacity-100' : 'opacity-0'}`}
              />
              < BuildingLibraryIcon
                size={24}
                className={`transition-opacity duration-300 absolute  ${!isDeveloper ? 'opacity-100' : 'opacity-0'}`} 
              />
            </div>
          </div>
        </div>

        {/* Designer Label */}
        <span className={`font-bold text-sm transition-colors duration-300 ${!isDeveloper ? activeTextColor : inactiveTextColor}`}>
          Internal
        </span>
      </div>
    </div>
  );
};

export default ModeToggle;