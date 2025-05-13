import React from 'react';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import MainContent from './components/MainContent';
import RightSidebar from './components/RightSidebar';

function App() {
  return (
    <div className="h-screen flex flex-col bg-studio-bg text-studio-primary-text">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />
        <div className="flex flex-1 overflow-hidden"> {/* This inner flex container is important for RightSidebar layout */}
          <MainContent />
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}

export default App;