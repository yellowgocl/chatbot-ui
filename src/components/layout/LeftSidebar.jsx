// src/components/layout/LeftSidebar.jsx
import React from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom'; // Import NavLink
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import IconButton from '../common/IconButton';
import { sidebarNavItems } from '../../config/menu'; // Import configured items

// NavItem now uses NavLink
const NavItem = ({ icon: Icon, label, path, children, isSidebarOpen }) => (
  <div>
    <NavLink
      to={path}
      className={({ isActive }) => clsx(
        "flex items-center py-2.5 rounded-lg transition-colors group",
        isSidebarOpen ? "px-3" : "justify-center mx-auto w-10 h-10",
        isActive
          ? isSidebarOpen ? "bg-primary/10 text-primary" : "bg-primary text-primary-foreground"
          : isSidebarOpen
            ? "text-muted-foreground hover:bg-secondary hover:text-foreground"
            : "text-muted-foreground hover:bg-secondary hover:text-primary"
      )}
      title={!isSidebarOpen ? label : undefined}
    >
      <Icon className={clsx("h-5 w-5", isSidebarOpen && "mr-3")} />
      {isSidebarOpen && <span>{label}</span>}
      {/* {isSidebarOpen && children && <ChevronUpIcon className="h-4 w-4 ml-auto" />} */} {/* Submenu indicator if needed */}
    </NavLink>
    {/* {isSidebarOpen && children && <div className="pl-6 mt-1 space-y-1">{children}</div>} */} {/* Submenu items */}
  </div>
);

const LeftSidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside
      className={clsx(
        "bg-secondary border-r border-border flex flex-col transition-all duration-300 ease-in-out relative shrink-0",
        isOpen ? "w-sidebar p-4" : "w-[72px] p-4 py-4 flex flex-col items-center"
      )}
    >
      <nav className={clsx("flex-1 space-y-1", !isOpen && "flex flex-col items-center")}>
        {sidebarNavItems.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            path={item.path}
            isSidebarOpen={isOpen}
          >
            {/* Render sub-items if 'item.subItems' exists and isOpen */}
            {isOpen && item.subItems && item.subItems.map(subItem => (
              <NavLink
                key={subItem.id}
                to={subItem.path}
                className={({ isActive }) => clsx(
                  "block text-xs py-1 pl-9 pr-3 rounded", // Adjust styling for sub-items
                  isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {subItem.label}
              </NavLink>
            ))}
          </NavItem>
        ))}
      </nav>
      {isOpen && (
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
      {!isOpen && (
         <div className="mt-auto">
             <IconButton
                onClick={toggleSidebar}
                variant="ghost"
                size="md"
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