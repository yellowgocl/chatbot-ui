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
import AccessDenied from './components/AccessDenied'; // Import AccessDenied component

// A mock authentication function
const checkAuth = () => {
  // In a real application, this would check a token, session, or user role
  // For now, let's simulate a user without permission
  return false; // Set to true to bypass access denied for testing
};

function App() {
  return (
    <Router>
      <LayoutSwitcher />
    </Router>
  );
}

function LayoutSwitcher() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isAuthenticated = checkAuth(); // Check authentication status

  // If not authenticated and trying to access a non-login page, redirect to AccessDenied
  if (!isAuthenticated && !isLoginPage && location.pathname !== '/access-denied') {
    return <Navigate to="/access-denied" replace />;
  }

  return (
    <>
      {isLoginPage ? (
        <LoginLayout />
      ) : (
        <AppLayout isAuthenticated={isAuthenticated} /> // Pass isAuthenticated to AppLayout
      )}
    </>
  );
}

function LoginLayout() {
  return (
    <div className="flex flex-col h-screen bg-white">
      <Header isLoginPage={true} />
      <main className="flex-1 flex items-center justify-center overflow-y-auto">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function AppLayout({ isAuthenticated }) { // Receive isAuthenticated prop
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
    <div className="flex flex-col h-screen bg-secondary">
      <Header isLoginPage={false} />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar isOpen={isLeftSidebarOpen} toggleSidebar={toggleLeftSidebar} />
        <main className="flex-1 flex flex-col overflow-y-auto bg-background">
          <Routes>
            {/* Access Denied Route */}
            <Route path="/access-denied" element={<AccessDenied />} />

            {/* Protected Routes */}
            {isAuthenticated ? (
              <>
                <Route path="/" element={<Navigate to="/chat" replace />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/history" element={<HistoryPage />} />
              </>
            ) : (
              // If not authenticated, redirect any protected route access to /access-denied
              <Route path="*" element={<Navigate to="/access-denied" replace />} />
            )}

            {/* Catch-all for 404 within the app layout, only if authenticated */}
            {isAuthenticated && <Route path="*" element={<div>404 - Page Not Found</div>} />}
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
  );
}

export default App;