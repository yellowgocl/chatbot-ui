// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Router components
import clsx from 'clsx';
import Header from './components/layout/Header';
import LeftSidebar from './components/layout/LeftSidebar';
// MainContent is now replaced by page components
import RightSidebar from './components/layout/RightSidebar';
import FarRightToolbar from './components/layout/FarRightToolbar';
import ChatPage from './pages/ChatPage'; // Import ChatPage
import HistoryPage from './pages/HistoryPage'; // Import HistoryPage

function App() {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);
  const [rightSidebarView, setRightSidebarView] = useState('runSettings');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const handleChange = (e) => setIsLeftSidebarOpen(e.matches);
    handleChange(mediaQuery);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleLeftSidebar = () => setIsLeftSidebarOpen(!isLeftSidebarOpen);

  const handleToggleRightPanel = (viewToOpen) => {
    if (isRightPanelOpen && rightSidebarView === viewToOpen) {
      setIsRightPanelOpen(false);
    } else {
      setRightSidebarView(viewToOpen);
      setIsRightPanelOpen(true);
    }
  };

  const toggleRunSettings = () => handleToggleRightPanel('runSettings');
  const togglePromptGallery = () => handleToggleRightPanel('promptGallery');
  const closeRightPanel = () => setIsRightPanelOpen(false);
  const handleResetRunSettings = () => console.log("Reset Run Settings triggered");

  return (
    <Router> {/* Wrap the entire application with Router */}
      <div className="flex flex-col h-screen bg-secondary">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <LeftSidebar isOpen={isLeftSidebarOpen} toggleSidebar={toggleLeftSidebar} />
          <main className="flex-1 flex flex-col overflow-y-auto bg-background">
            {/* Define Routes */}
            <Routes>
              <Route path="/" element={<Navigate to="/chat" replace />} /> {/* Default redirect */}
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/history" element={<HistoryPage />} />
              {/* Add more routes here as needed */}
              <Route path="*" element={<div>404 - Page Not Found</div>} /> {/* Catch-all for 404 */}
            </Routes>
          </main>
          <RightSidebar
            isOpen={isRightPanelOpen}
            toggleSidebar={closeRightPanel}
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
    </Router>
  );
}

export default App;