import React from 'react';
import accessDeniedImage from '../assets/access-denied.jpg';

const AccessDenied = () => {
  return (
    <div className="fixed inset-0 top-[56px] bg-background text-foreground flex items-center justify-center z-50">
      <div className="text-center max-w-md p-10 mx-auto">
        <h2 className="text-7xl font-extrabold text-primary-DEFAULT mb-4">403</h2>
        <h1 className="text-4xl font-bold text-primary-DEFAULT mb-6">Access Denied</h1>
        <p className="text-lg text-muted-foreground mb-4">
          Sorry, but you don't have permission to access this page.
        </p>
        
        <img src={accessDeniedImage} alt="Access Denied" className="mt-8 mx-auto h-auto" />
      </div>
    </div>
  );
};

export default AccessDenied;