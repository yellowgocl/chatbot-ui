// src/App.jsx
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Header from './components/layout/Header';
import LeftSidebar from './components/layout/LeftSidebar';
import MainContent from './components/layout/MainContent';
import RightSidebar from './components/layout/RightSidebar';
import FarRightToolbar from './components/layout/FarRightToolbar';

function App() {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true); // Unified state for the whole right panel
  const [rightSidebarView, setRightSidebarView] = useState('runSettings'); // 'runSettings' or 'promptGallery'

  // Handle responsive left sidebar
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)'); // lg breakpoint
    const handleChange = (e) => {
      setIsLeftSidebarOpen(e.matches);
      // If collapsing due to screen size and it was showing prompt gallery, switch to run settings
      if (!e.matches && rightSidebarView === 'promptGallery') {
        // This behavior might be optional or configured differently
        // For simplicity, we keep the current view.
      }
    };
    handleChange(mediaQuery);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []); // Removed rightSidebarView dependency to avoid complex loops

  const toggleLeftSidebar = () => setIsLeftSidebarOpen(!isLeftSidebarOpen);

  const handleToggleRightPanel = (viewToOpen) => {
    if (isRightPanelOpen && rightSidebarView === viewToOpen) {
      setIsRightPanelOpen(false); // Close if it's the current view and panel is open
    } else {
      setRightSidebarView(viewToOpen);
      setIsRightPanelOpen(true); // Open or switch view
    }
  };

  const toggleRunSettings = () => handleToggleRightPanel('runSettings');
  const togglePromptGallery = () => handleToggleRightPanel('promptGallery');

  const closeRightPanel = () => setIsRightPanelOpen(false);

  const handleResetRunSettings = () => {
    // This function would ideally trigger a reset in the RunSettings form.
    // For now, it's a placeholder. You'd need to lift state or use a ref/context.
    console.log("Reset Run Settings triggered");
  };


  return (
    <div className="flex flex-col h-screen bg-secondary">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar isOpen={isLeftSidebarOpen} toggleSidebar={toggleLeftSidebar} />
        <main className="flex-1 flex flex-col overflow-y-auto bg-background">
          <MainContent />
        </main>
        {/* RightSidebar now controlled by isRightPanelOpen and rightSidebarView */}
        <RightSidebar
          isOpen={isRightPanelOpen}
          toggleSidebar={closeRightPanel} // The 'X' button in RightSidebar now just closes the panel
          activeView={rightSidebarView}
          onResetSettings={handleResetRunSettings}
        />
        <FarRightToolbar
          onToggleRunSettings={toggleRunSettings}
          isRunSettingsVisible={isRightPanelOpen && rightSidebarView === 'runSettings'}
          onTogglePromptGallery={togglePromptGallery}
          isPromptGalleryVisible={isRightPanelOpen && rightSidebarView === 'promptGallery'}
        />
      </div>
    </div>
  );
}

export default App;