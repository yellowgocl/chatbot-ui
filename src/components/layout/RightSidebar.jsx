// src/components/layout/RightSidebar.jsx
import React from 'react';
import clsx from 'clsx';
import { XMarkIcon, ArrowPathIcon as RefreshIcon } from '@heroicons/react/24/outline';
import IconButton from '../common/IconButton';
import RunSettings from './RunSettings'; // New import
import PromptGallery from './PromptGallery'; // To be created

const RightSidebar = ({ isOpen, toggleSidebar, activeView, onResetSettings }) => {
  // activeView can be 'runSettings' or 'promptGallery'

  if (!isOpen) return null;

  const viewTitle = activeView === 'runSettings' ? 'Run settings' : 'Prompt Gallery';

  return (
    <aside className={clsx(
      "bg-secondary border-l border-border flex flex-col transition-all duration-300 ease-in-out overflow-y-auto",
      isOpen ? `w-right-sidebar p-4` : "w-0 p-0" // Ensure w-right-sidebar is defined in tailwind.config.js
    )}>
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h2 className="text-lg font-semibold text-foreground">{viewTitle}</h2>
        <div className="flex items-center space-x-1">
          {activeView === 'runSettings' && ( // Only show reset for Run Settings view
            <IconButton variant="ghost" size="sm" aria-label="Reset settings" onClick={onResetSettings}>
              <RefreshIcon className="h-4 w-4" />
            </IconButton>
          )}
          <IconButton variant="ghost" size="sm" onClick={toggleSidebar} aria-label="Close panel">
            <XMarkIcon className="h-5 w-5" />
          </IconButton>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeView === 'runSettings' && <RunSettings />}
        {activeView === 'promptGallery' && <PromptGallery />}
      </div>
    </aside>
  );
};

export default RightSidebar;