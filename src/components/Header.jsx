import React from 'react';
import { KeyIcon, Cog6ToothIcon, UserCircleIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import IconButton from './IconButton';

const Header = () => {
  return (
    <header className="bg-studio-panel-bg text-studio-primary-text h-16 flex items-center justify-between px-6 border-b border-studio-border shadow-sm">
      <div className="text-xl font-semibold text-studio-primary-text">Google AI Studio</div>
      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-2 px-4 py-2 rounded-md bg-studio-get-api-key-bg text-studio-get-api-key-text hover:bg-opacity-80 text-sm font-medium">
          <KeyIcon className="w-5 h-5" />
          <span>Get API key</span>
        </button>
        <nav className="flex items-center space-x-5 text-sm font-medium text-studio-secondary-text">
          <a href="#" className="hover:text-studio-primary-text">Studio</a>
          <a href="#" className="hover:text-studio-primary-text">Dashboard</a>
          <a href="#" className="flex items-center space-x-1 hover:text-studio-primary-text">
            <span>Documentation</span>
            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
          </a>
        </nav>
        <IconButton icon={Cog6ToothIcon} ariaLabel="Settings" />
        <div className="w-8 h-8 rounded-full bg-studio-avatar-bg flex items-center justify-center text-white text-sm font-bold">
          诏 {/* Or use UserCircleIcon if you prefer an icon */}
          {/* <UserCircleIcon className="w-7 h-7 text-white" /> */}
        </div>
      </div>
    </header>
  );
};

export default Header;