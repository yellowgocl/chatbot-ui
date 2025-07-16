import React from 'react';
import PageHeader from '../components/common/PageHeader';
// ChatInputArea is part of the Chat System Context, not the bottom prompt bar
// import ChatInputArea from '../components/chat/ChatInputArea';
import ModelThoughts from '../components/chat/ModelThoughts';
import Message from '../components/chat/Message';
import PromptBar from '../components/chat/PromptBar';

import ModeToggle from '../components/common/ModeToggle';

const ChatPage = () => {
  // You might want to manage chat messages state here
  // const [messages, setMessages] = useState([
  //   { id: 1, author: 'user', text: 'Helo'},
  //   { id: 2, author: 'model', text: 'Hello! How can I help you today?' }
  // ]);

  return (
    <div className="flex-1 flex flex-col pb-6 px-6 space-y-4 overflow-y-auto relative">
      <PageHeader>
        <ModeToggle />
      </PageHeader>

      {/* Example: User Input (from image) - This would be part of a message list */}
      <Message author="user" text="Helo" />
      {/* <div className="ml-auto max-w-xl">
        <div className="bg-primary/10 text-primary-dark p-3 rounded-lg rounded-br-none">
          Helo
        </div>
      </div> */}

      <ModelThoughts />
      <ModelThoughts />
      <ModelThoughts />
      <ModelThoughts />
      <ModelThoughts />
      <ModelThoughts />

      {/* Example: Model Response - This would be part of a message list */}
      <Message author="model" text="Hello! How can I help you today?" />

      {/* Spacer to push PromptBar to bottom if messages don't fill screen */}
      <div className="flex-grow"></div>

      <PromptBar /> {/* This is the input bar at the very bottom */}
    </div>
  );
};

export default ChatPage;