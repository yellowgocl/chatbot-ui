// src/components/layout/LeftSidebar.jsx
import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import Button from '../common/Button';
import { sidebarNavItems } from '../../config/menu';

// Function to generate random text (for demonstration)
const generateRandomText = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// NavItem now handles click to toggle submenu and renders sub-items with marquee on hover
const NavItem = ({ icon: Icon, label, path, children, isSidebarOpen, hasSubmenu, subItems }) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const toggleSubmenu = (e) => {
    if (hasSubmenu) {
      e.preventDefault();
      setIsSubmenuOpen(!isSubmenuOpen);
    }
  };

  // Generate random text for sub-items if they don't have a label
  const processedSubItems = useMemo(() => {
    return subItems ? subItems.map(item => ({
      ...item,
      // Generate slightly longer random text to ensure truncation for demo
      label: item.label || generateRandomText(40 + Math.random() * 30)
    })) : [];
  }, [subItems]);

  return (
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
              : "text-muted-foreground hover:bg-secondary hover:text-primary",
           hasSubmenu && isSidebarOpen && "justify-between"
        )}
        title={!isSidebarOpen ? label : undefined}
        onClick={toggleSubmenu}
      >
        <div className="flex items-center">
           <Icon className={clsx("h-5 w-5", isSidebarOpen && "mr-3")} />
           {isSidebarOpen && <span>{label}</span>}
        </div>

        {isSidebarOpen && hasSubmenu && (
          <div className="ml-auto">
             {isSubmenuOpen ? (
               <ChevronUpIcon className="h-4 w-4 transition-transform duration-300 rotate-0" />
             ) : (
               <ChevronDownIcon className="h-4 w-4 transition-transform duration-300 rotate-180" />
             )}
          </div>
        )}
      </NavLink>

      {isSidebarOpen && hasSubmenu && isSubmenuOpen && (
        <div className="pl-6 mt-1 space-y-1">
          {processedSubItems.map(subItem => (
            // Use a div as a container for the NavLink and make it a 'group'
            <div key={subItem.id} className="relative group">
              <NavLink
                to={subItem.path}
                className={({ isActive }) => clsx(
                  "block text-xs py-1 pl-3 pr-3 rounded text-left w-full overflow-hidden", // Add overflow-hidden
                  isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground",
                   // Remove truncate class from here
                )}
                // Remove title prop as we are using marquee instead of static tooltip
                // title={subItem.label.length > 20 ? undefined : subItem.label}
              >
                 {/* Inner div for marquee effect */}
                <div className={clsx(
                    "whitespace-nowrap", // Ensure text stays on one line
                    // Apply marquee animation only on group hover and if text is likely truncated
                    subItem.label.length > 20 && "group-hover:animate-marquee group-hover:hover:paused" // Apply animation on hover
                )}>
                   {subItem.label}
                </div>
              </NavLink>
              {/* Remove static tooltip */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const LeftSidebar = ({ isOpen, toggleSidebar }) => {
  const expandButton = useMemo(() => {
    const styles = clsx(isOpen ? "absolute bottom-2 -right-5 z-10" : "mt-auto")
    return <div className={styles}>
        <Button
          onClick={toggleSidebar}
          variant="ghost"
          size="md"
          className="bg-white hover:bg-muted border border-border"
          aria-label={ isOpen ? "Collapse sidebar" : "Expand sidebar" }
          leftIcon={isOpen ? ChevronLeftIcon : ChevronRightIcon }
      />
    </div>
  }, [toggleSidebar, isOpen])

  // Inject some dummy sub-items for demonstration
  const sidebarNavItemsWithSubitems = useMemo(() => {
    return sidebarNavItems.map(item => {
      if (item.id === 'history') {
        return {
          ...item,
          hasSubmenu: true, // Ensure hasSubmenu is true for History
          subItems: [
            { id: 'history-1', path: '/history/1' },
            { id: 'history-2', path: '/history/2' },
            { id: 'history-3', path: '/history/3' },
            { id: 'history-4', path: '/history/4' },
            { id: 'history-5', path: '/history/5' },
          ]
        };
      }
      return item;
    });
  }, [sidebarNavItems]);


  return (
    <aside
      className={clsx(
        "bg-secondary border-r border-border flex flex-col transition-all duration-300 ease-in-out relative shrink-0",
        isOpen ? "w-sidebar p-4" : "w-[72px] p-4 py-4 flex flex-col items-center"
      )}
    >
      <nav className={clsx("flex-1 space-y-1", !isOpen && "flex flex-col items-center")}>
        {sidebarNavItemsWithSubitems.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            path={item.path}
            isSidebarOpen={isOpen}
            hasSubmenu={item.hasSubmenu}
            subItems={item.subItems} // Pass subItems prop
          />
        ))}
      </nav>
      {expandButton}
    </aside>
  );
};

export default LeftSidebar;
