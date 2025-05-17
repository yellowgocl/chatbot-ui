// src/components/layout/MainContent.jsx
import React from 'react';
import ChatHeader from '../chat/ChatHeader';
import ChatInputArea from '../chat/ChatInputArea';
import ModelThoughts from '../chat/ModelThoughts';
import Message from '../chat/Message';
import PromptBar from '../chat/PromptBar';

const MainContent = () => {
  return (
    <div className="flex-1 flex flex-col p-6 space-y-4 overflow-y-auto">
      <ChatHeader title="Greeting and Assistance" />
      
      {/* User Input Example (from image) */}
      <div className="ml-auto max-w-xl">
        <div className="bg-primary/10 text-primary-dark p-3 rounded-lg rounded-br-none">
          Helo
        </div>
      </div>

      <ModelThoughts />

      {/* Model Response Example */}
      <Message author="model" text="Hello! How can I help you today?" />
      
      {/* Spacer to push PromptBar to bottom */}
      <div className="flex-grow"></div>

      <PromptBar />
    </div>
  );
};

export default MainContent;