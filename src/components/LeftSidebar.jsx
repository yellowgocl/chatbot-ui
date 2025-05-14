// src/components/LeftSidebar.jsx
import React, { useState } from 'react';
import {
  ChatBubbleLeftEllipsisIcon,
  AdjustmentsHorizontalIcon as StreamIcon,
  VideoCameraIcon,
  PuzzlePieceIcon,
  ClockIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

// AdaptiveNavItem: Ensure left alignment for icons in collapsed state
const AdaptiveNavItem = ({ icon: Icon, label, isActive, onClick, isVisuallyCollapsed, hasSubmenu, isSubmenuOpen }) => (
  <button
    onClick={onClick}
    title={isVisuallyCollapsed ? label : undefined}
    className={clsx(
      'flex items-center w-full rounded-lg transition-colors group',
      // Default (small screens & lg:collapsed): items are aligned to the start (left)
      // Padding will create the visual centering of the icon within its space.
      'px-3 h-12 justify-start', // Default: px-3 for collapsed padding, justify-start
      // Large screens, expanded:
      !isVisuallyCollapsed && 'lg:space-x-3 lg:px-4 lg:py-2.5 lg:text-sm lg:font-medium lg:h-auto',
      isActive
        ? 'bg-studio-active-item-bg text-studio-active-item-text'
        : 'text-studio-secondary-text hover:bg-gray-200 hover:text-studio-primary-text'
    )}
  >
    <Icon
      className={clsx(
        'flex-shrink-0',
        // Icon size: larger for collapsed state, smaller for expanded
        'w-6 h-6', // Default (collapsed) icon size
        !isVisuallyCollapsed && 'lg:w-5 lg:h-5', // Expanded icon size on large screens
        isActive ? 'text-studio-active-item-text' : 'text-studio-secondary-text group-hover:text-studio-primary-text'
      )}
    />
    {/* Text and submenu icon only visible on large screens AND when not visually collapsed */}
    <span className={clsx('hidden', !isVisuallyCollapsed && 'lg:inline ml-3')}>{label}</span> {/* Added ml-3 to match original spacing */}
    {hasSubmenu && !isVisuallyCollapsed && (
      <ChevronDownIcon className={clsx('hidden w-4 h-4 ml-auto transition-transform lg:inline', isSubmenuOpen ? 'rotate-180' : '')} />
    )}
  </button>
);


const LeftSidebar = ({ isExpandedOnLargeScreen, onToggleExpansion }) => {
  const [activeItem, setActiveItem] = useState('Chat');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const navItems = [
    { id: 'Chat', label: 'Chat', icon: ChatBubbleLeftEllipsisIcon },
    { id: 'Stream', label: 'Stream', icon: StreamIcon },
    { id: 'Video Gen', label: 'Video Gen', icon: VideoCameraIcon },
    { id: 'Starter Apps', label: 'Starter Apps', icon: PuzzlePieceIcon },
  ];

  const handleNavItemClick = (itemId) => {
    setActiveItem(itemId);
  };

  const handleHistoryClick = () => {
    setActiveItem('History');
    if (isExpandedOnLargeScreen) {
      setIsHistoryOpen(!isHistoryOpen);
    }
  };

  return (
    <aside
      className={clsx(
        'bg-studio-sidebar-bg flex flex-col border-r border-studio-border transition-all duration-200 ease-in-out',
        // Default: collapsed width. Padding is handled by NavItems now.
        // The main aside padding will be for the overall sidebar content area.
        'w-16 pt-4 pb-4', // Default collapsed width and vertical padding
        // Large screens: width and padding depends on `isExpandedOnLargeScreen`
        isExpandedOnLargeScreen ? 'lg:w-64 lg:p-4' : 'lg:w-12 lg:pt-4 lg:pb-4'
      )}
    >
      {/* Nav items have their own padding for alignment */}
      <nav className={clsx("flex-grow space-y-1", // Use space-y-1 for consistent spacing between items
            isExpandedOnLargeScreen ? 'lg:space-y-1' : 'lg:space-y-1' // keep consistent spacing
        )}>
        {navItems.map((item) => (
          <AdaptiveNavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeItem === item.id}
            onClick={() => handleNavItemClick(item.id)}
            isVisuallyCollapsed={!isExpandedOnLargeScreen}
          />
        ))}
        <AdaptiveNavItem
          icon={ClockIcon}
          label="History"
          isActive={activeItem === 'History'}
          onClick={handleHistoryClick}
          isVisuallyCollapsed={!isExpandedOnLargeScreen}
          hasSubmenu={isExpandedOnLargeScreen}
          isSubmenuOpen={isHistoryOpen && isExpandedOnLargeScreen}
        />
        {isHistoryOpen && isExpandedOnLargeScreen && (
          <div className="hidden lg:block pl-8 space-y-1 text-xs">
            <a href="#" className="block text-studio-secondary-text hover:text-studio-primary-text py-1">Recent item 1</a>
            <a href="#" className="block text-studio-secondary-text hover:text-studio-primary-text py-1">Recent item 2</a>
          </div>
        )}
      </nav>

      {/* Bottom section: Experimental model text & Toggle Button */}
      <div className="mt-auto px-2 lg:px-0"> {/* Add horizontal padding for collapsed state here, remove from lg:expanded */}
        <div
          className={clsx(
            'p-2 bg-gray-200 rounded-md text-xs text-studio-secondary-text mb-3',
            'hidden',
            isExpandedOnLargeScreen && 'lg:block'
          )}
        >
          This experimental model is for
          feedback and testing only. No
          production use.
        </div>
        <div className={clsx(
            "hidden lg:flex",
            isExpandedOnLargeScreen ? "justify-end" : "justify-center" // Center button when collapsed on LG
        )}>
          <button
            onClick={onToggleExpansion}
            className="p-1.5 rounded-md hover:bg-gray-300 text-studio-secondary-text focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label={isExpandedOnLargeScreen ? "Collapse sidebar" : "Expand sidebar"}
            title={isExpandedOnLargeScreen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isExpandedOnLargeScreen ? (
              <ChevronLeftIcon className="w-5 h-5" />
            ) : (
              <ChevronRightIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;