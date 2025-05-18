// src/pages/HistoryPage.jsx
import React from 'react';

const HistoryPage = () => {
  return (
    <div className="flex-1 flex flex-col p-6 space-y-4">
      <div className="pb-4 border-b border-border">
        <h2 className="text-xl font-semibold text-foreground">Chat History</h2>
      </div>
      <div className="bg-secondary p-6 rounded-lg shadow">
        <p className="text-muted-foreground">
          This is where your past chat sessions would be listed.
        </p>
        {/* Example list items */}
        <ul className="mt-4 space-y-2">
          {[1,2,3,4,5].map(i => (
            <li key={i} className="p-3 border border-border rounded-md hover:bg-background cursor-pointer">
              <h3 className="font-medium text-foreground">Chat Session - {new Date(Date.now() - i * 24*60*60*1000).toLocaleDateString()}</h3>
              <p className="text-xs text-muted-foreground mt-1">A brief snippet of the conversation...</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HistoryPage;