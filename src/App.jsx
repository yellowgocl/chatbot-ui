// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import Header from './components/layout/Header';
import LeftSidebar from './components/layout/LeftSidebar';
import RightSidebar from './components/layout/RightSidebar';
import FarRightToolbar from './components/layout/FarRightToolbar';
import ChatPage from './pages/ChatPage';
import HistoryPage from './pages/HistoryPage';
import LoginPage from './pages/LoginPage';

function App() {
  // App component's sole responsibility is the Router
  return (
    <Router>
      {/* Main layout rendering is now handled directly based on location */}
      <LayoutSwitcher />
    </Router>
  );
}

// This component determines the current route and renders the appropriate top-level layout
function LayoutSwitcher() {
  const location = useLocation(); // useLocation is correctly inside the Router context
  const isLoginPage = location.pathname === '/login';

  return (
    <> {/* Use Fragment as LayoutSwitcher will return one of two top-level elements */}
      {isLoginPage ? (
        // Render Login Layout
        <LoginLayout />
      ) : (
        // Render Main Application Layout
        <AppLayout />
      )}
    </>
  );
}

// Component for the Login Page Layout
function LoginLayout() {
  return (
    <div className="flex flex-col h-screen bg-white"> {/* Login page background, replace with your pattern */}
      {/* Header for the login page - user icon will be hidden */} 
      <Header isLoginPage={true} />

      {/* Main content area for the login form, centered */}
      <main className="flex-1 flex items-center justify-center overflow-y-auto">
        {/* Routes specific to the login layout - only the login page should be rendered here */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          {/* Add a catch-all to redirect any other path to login if in this layout */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  );
}

// Component for the Main Application Layout
function AppLayout() {
  // State and handlers for sidebars and toolbar, specific to the app layout
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);
  const [rightSidebarView, setRightSidebarView] = useState('promptGallery');

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
    <div className="flex flex-col h-screen bg-secondary"> {/* Main app background */}
      {/* Header for the main app layout - user icon will be visible */}
      <Header isLoginPage={false} />

      <div className="flex flex-1 overflow-hidden"> {/* Container for sidebar(s) and main content */}
        {/* Render LeftSidebar */}
        <LeftSidebar isOpen={isLeftSidebarOpen} toggleSidebar={toggleLeftSidebar} />

        {/* Main content area for app pages */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-background">
          {/* Routes specific to the app layout */}
          <Routes>
            {/* Application routes */}
            <Route path="/" element={<Navigate to="/chat" replace />} /> {/* Default redirect */}
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/history" element={<HistoryPage />} />
            {/* Add more application routes here as needed */}

            {/* Catch-all for 404 within the app layout */}
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </main>

        {/* Render RightSidebar and FarRightToolbar */}
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
  );
}

export default App;