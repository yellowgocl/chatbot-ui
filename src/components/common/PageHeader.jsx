import React from 'react';

const PageHeader = ({ title, children }) => {
  return (
    <div className="sticky w-fit left-[100%] top-3 right-3 z-10 flex justify-between items-center pb-4 shadow-lg backdrop-blur-md bg-background/80 rounded-lg p-4 border border-gray-100">
      {title && <h2 className="text-xl font-semibold text-foreground">{title}</h2>}
      <div className="flex items-center space-x-4">
        {children}
      </div>
    </div>
  );
};

export default PageHeader;