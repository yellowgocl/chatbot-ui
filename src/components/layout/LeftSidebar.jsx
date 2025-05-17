// src/components/layout/LeftSidebar.jsx
import React from 'react';
import clsx from 'clsx';
import {
  ChatBubbleOvalLeftEllipsisIcon,
  PlayCircleIcon, // Or VideoCameraIcon
  CpuChipIcon,    // Or SparklesIcon for Starter Apps
  ClockIcon,      // Or ArrowPathIcon for History
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import IconButton from '../common/IconButton';

const NavItem = ({ icon: Icon, label, active, children, isSidebarOpen }) => (
  <div>
    <a
      href="#"
      className={clsx(
        "flex items-center py-2.5 rounded-lg transition-colors group",
        isSidebarOpen ? "px-3" : "justify-center mx-auto w-10 h-10", // Adjusted for icon-only state
        active
          ? isSidebarOpen ? "bg-primary/10 text-primary" : "bg-primary text-primary-foreground" // Different active for collapsed
          : isSidebarOpen
            ? "text-muted-foreground hover:bg-secondary hover:text-foreground"
            : "text-muted-foreground hover:bg-secondary hover:text-primary"
      )}
      title={!isSidebarOpen ? label : undefined} // Show tooltip when collapsed
    >
      <Icon className={clsx("h-5 w-5", isSidebarOpen && "mr-3")} />
      {isSidebarOpen && <span>{label}</span>}
      {isSidebarOpen && children && <ChevronUpIcon className="h-4 w-4 ml-auto" />}
    </a>
    {isSidebarOpen && children && <div className="pl-6 mt-1 space-y-1">{children}</div>}
  </div>
);

const LeftSidebar = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { icon: ChatBubbleOvalLeftEllipsisIcon, label: "Chat", active: true },
    { icon: PlayCircleIcon, label: "Stream" },
    { icon: PlayCircleIcon, label: "Video Gen" }, // Using PlayCircleIcon as placeholder
    { icon: CpuChipIcon, label: "Starter Apps" },
    { icon: ClockIcon, label: "History", hasSubmenu: true },
  ];

  return (
    <aside
      className={clsx(
        "bg-secondary border-r border-border flex flex-col transition-all duration-300 ease-in-out relative shrink-0",
        // Adjusted width for collapsed state to show icons with margin
        isOpen ? "w-sidebar p-4" : "w-[72px] p-4 py-4 flex flex-col items-center"
      )}
    >
      <nav className={clsx("flex-1 space-y-1", !isOpen && "flex flex-col items-center")}>
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={item.active}
            isSidebarOpen={isOpen}
          >
            {isOpen && item.hasSubmenu && ( // Only show sub-items if sidebar is open
              <a href="#" className="block text-xs text-muted-foreground hover:text-foreground py-1">
                React Bootstrap Product Li...
              </a>
            )}
          </NavItem>
        ))}
      </nav>
      {isOpen && ( // Only show text and full button if open
        <>
          <div className="mt-auto text-xs text-muted-foreground/80 p-2 text-center">
            This experimental model is for feedback and testing only. No production use.
          </div>
          <div className="absolute bottom-4 -right-3 z-10">
            <IconButton
              onClick={toggleSidebar}
              variant="secondary"
              size="sm"
              className="rounded-full shadow-md bg-background hover:bg-muted border border-border"
              aria-label="Collapse sidebar"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </IconButton>
          </div>
        </>
      )}
      {/* Button to expand when collapsed - positioned differently */}
      {!isOpen && (
         <div className="mt-auto">
             <IconButton
                onClick={toggleSidebar}
                variant="ghost" // Or secondary if preferred
                size="md" // Make it a bit more prominent
                className="rounded-md shadow-sm bg-background hover:bg-muted border border-border"
                aria-label="Expand sidebar"
            >
                <ChevronRightIcon className="h-5 w-5" />
            </IconButton>
         </div>
      )}
    </aside>
  );
};

export default LeftSidebar;