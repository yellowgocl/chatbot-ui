import React, { useState } from 'react';
import {
  ChatBubbleLeftEllipsisIcon,
  AdjustmentsHorizontalIcon as StreamIcon, // Using Adjustments for Stream as a placeholder
  VideoCameraIcon,
  PuzzlePieceIcon,
  ClockIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

const NavItem = ({ icon: Icon, label, isActive, onClick, hasSubmenu, isSubmenuOpen }) => (
  <button
    onClick={onClick}
    className={clsx(
      'flex items-center w-full space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
      isActive
        ? 'bg-studio-active-item-bg text-studio-active-item-text'
        : 'text-studio-secondary-text hover:bg-gray-200 hover:text-studio-primary-text'
    )}
  >
    <Icon className={clsx('w-5 h-5', isActive ? 'text-studio-active-item-text' : 'text-studio-secondary-text')} />
    <span>{label}</span>
    {hasSubmenu && (
      <ChevronDownIcon className={clsx('w-4 h-4 ml-auto transition-transform', isSubmenuOpen ? 'rotate-180' : '')} />
    )}
  </button>
);

const LeftSidebar = () => {
  const [activeItem, setActiveItem] = useState('Chat');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const navItems = [
    { id: 'Chat', label: 'Chat', icon: ChatBubbleLeftEllipsisIcon },
    { id: 'Stream', label: 'Stream', icon: StreamIcon },
    { id: 'Video Gen', label: 'Video Gen', icon: VideoCameraIcon },
    { id: 'Starter Apps', label: 'Starter Apps', icon: PuzzlePieceIcon },
  ];

  return (
    <aside className="w-64 bg-studio-sidebar-bg p-4 flex flex-col border-r border-studio-border">
      <nav className="space-y-1 flex-grow">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeItem === item.id}
            onClick={() => setActiveItem(item.id)}
          />
        ))}
        <NavItem
          icon={ClockIcon}
          label="History"
          isActive={activeItem === 'History'}
          onClick={() => {
            setActiveItem('History');
            setIsHistoryOpen(!isHistoryOpen);
          }}
          hasSubmenu
          isSubmenuOpen={isHistoryOpen}
        />
        {isHistoryOpen && (
          <div className="pl-8 space-y-1">
            {/* Placeholder for history sub-items */}
            <a href="#" className="block text-xs text-studio-secondary-text hover:text-studio-primary-text py-1">Recent item 1</a>
            <a href="#" className="block text-xs text-studio-secondary-text hover:text-studio-primary-text py-1">Recent item 2</a>
          </div>
        )}
      </nav>
      <div className="mt-auto space-y-3">
        <p className="text-xs text-studio-secondary-text p-2 bg-gray-200 rounded-md">
          This experimental model is for feedback and testing only. No production use.
        </p>
        <button className="p-2 rounded-md hover:bg-gray-200 text-studio-secondary-text">
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
};

export default LeftSidebar;