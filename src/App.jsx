// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import MainContent from './components/MainContent';
import RightSidebar from './components/RightSidebar';

function App() {
  // This state now primarily means: "if on a large screen, should the sidebar be expanded?"
  // On small screens, the sidebar will always be 'content-collapsed' via CSS.
  const [isSidebarExpandedOnLargeScreen, setIsSidebarExpandedOnLargeScreen] = useState(true);

  const toggleSidebarExpansion = () => {
    setIsSidebarExpandedOnLargeScreen(prev => !prev);
  };

  return (
    <div className="h-screen flex flex-col bg-studio-bg text-studio-primary-text">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar
          isExpandedOnLargeScreen={isSidebarExpandedOnLargeScreen}
          onToggleExpansion={toggleSidebarExpansion}
        />
        <div className="flex flex-1 overflow-hidden">
          <MainContent />
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}

export default App;