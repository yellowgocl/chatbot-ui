import React from 'react';

const PageHeader = ({ title, children }) => {
  return (
    <div className="flex justify-between items-center pb-4 border-b border-border">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <div className="flex items-center space-x-4">
        {children}
      </div>
    </div>
  );
};

export default PageHeader;