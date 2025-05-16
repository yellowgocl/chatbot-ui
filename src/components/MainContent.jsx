// src/components/MainContent.jsx
import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import {
  PencilIcon,
  EllipsisVerticalIcon,
  CodeBracketIcon,
  ShareIcon,
  DocumentDuplicateIcon,
  ArrowUturnLeftIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  PlusIcon // 确保 PlusIcon 已导入
} from '@heroicons/react/24/outline';
import { SparklesIcon as SparklesIconSolid } from '@heroicons/react/20/solid';
import { useVirtualizer } from '@tanstack/react-virtual';
// src/components/MainContent.jsx


// --- Mock data and ChatMessage component (as defined before, ensure messageData.id is unique) ---
const generateMockMessages = (count) => {
  const messages = [];
  for (let i = 0; i < count; i++) {
    messages.push({
      id: `msg-${Date.now()}-${i}`, // Ensure unique ID, especially if adding new messages
      sender: i % 3 === 0 ? 'bot' : 'user',
      text: `This is message ${i + 1}. Lorem ipsum dolor sit amet.`,
      timestamp: new Date().toISOString(),
    });
  }
  // No reverse here, assuming new messages are added to the end of the array
  return messages;
};

const ChatMessage = React.memo(({ messageData, style }) => {
  // ... (ChatMessage implementation remains the same)
  const isBot = messageData.sender === 'bot';
  return (
    <div style={style} className={`py-2 ${isBot ? '' : 'text-right flex flex-col items-end'}`}>
      <div className={`inline-block p-3 rounded-lg max-w-[75%] text-sm leading-relaxed shadow-sm ${
        isBot
        ? 'bg-gray-100 text-studio-text-primary text-left'
        : 'bg-studio-accent text-white text-left'
      }`}>
        <p>{messageData.text}</p>
      </div>
      {isBot && (
        <div className="mt-1.5 flex space-x-1.5" style={{ justifyContent: 'flex-start' }}>
          <button className="text-studio-text-tertiary hover:text-studio-text-secondary p-0.5 rounded hover:bg-gray-100">
            <HandThumbUpIcon className="h-4 w-4" />
          </button>
          <button className="text-studio-text-tertiary hover:text-studio-text-secondary p-0.5 rounded hover:bg-gray-100">
            <HandThumbDownIcon className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
});
// --- End Mock data and ChatMessage component ---


const MainContent = () => {
  const [promptText, setPromptText] = useState('');
  const [userContextMessage, setUserContextMessage] = useState('');
  
  // Store messages in state so we can add new ones
  const [messages, setMessages] = useState(() => generateMockMessages(50)); // Start with fewer messages for testing additions

  const parentRef = useRef(null);

  // Keep track of whether the user has scrolled away from the bottom
  const [userScrolledUp, setUserScrolledUp] = useState(false);
  const lastScrollOffsetRef = useRef(0);


  const rowVirtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 70,
    overscan: 10,
    // This will be called on scroll. We can use it to detect if user scrolled up.
    onScroll: (instance) => {
        if (!parentRef.current) return;
        const { scrollHeight, scrollTop, clientHeight } = parentRef.current;
        const isAtBottom = scrollHeight - scrollTop - clientHeight < 20; // 20px threshold

        // A more robust check for user scrolling up manually
        const currentScrollOffset = instance.scrollOffset;
        if (currentScrollOffset < lastScrollOffsetRef.current && !isAtBottom) {
             // Scrolled up and not programmatically (e.g., by adding new messages that shift content)
            if (Math.abs(currentScrollOffset - lastScrollOffsetRef.current) > 5) { // Ignore minor adjustments
                 setUserScrolledUp(true);
            }
        } else if (isAtBottom) {
            setUserScrolledUp(false);
        }
        lastScrollOffsetRef.current = currentScrollOffset;
    }
  });

  // Function to scroll to bottom
  const scrollToEnd = useCallback((behavior = 'auto') => {
    if (messages.length > 0 && rowVirtualizer) {
      // A short timeout can sometimes help ensure the DOM is ready after updates
      setTimeout(() => {
          rowVirtualizer.scrollToIndex(messages.length - 1, { align: 'end', behavior });
          setUserScrolledUp(false); // Reset userScrolledUp when programmatically scrolling to end
      }, 0);
    }
  }, [messages.length, rowVirtualizer]);

  // Scroll to bottom on initial load
  useEffect(() => {
    scrollToEnd('auto'); // 'auto' for initial load (instant)
  }, [scrollToEnd]); // Only depends on scrollToEnd which depends on messages.length and rowVirtualizer


  // --- Simulate adding a new message ---
  const handleSendMessage = () => {
    if (!promptText.trim()) return;
    const newMessageUser = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text: promptText,
      timestamp: new Date().toISOString(),
    };
    const newMessageBot = {
      id: `msg-${Date.now()}-bot`,
      sender: 'bot',
      text: `Echo: ${promptText}`,
      timestamp: new Date().toISOString(),
    };

    // Add new messages to the end
    setMessages(prevMessages => [...prevMessages, newMessageUser, newMessageBot]);
    setPromptText(''); // Clear input

    // Scroll to bottom only if user hasn't scrolled up significantly
    // or if it's a new message they just sent.
    // For this demo, we'll always scroll after sending.
    // In a real app, you'd check `userScrolledUp`.
    // if (!userScrolledUp) {
    //   scrollToEnd('smooth');
    // }
    // For now, always scroll after sending:
    scrollToEnd('smooth');

  };
  // --- End simulate new message ---


  return (
    <main className="flex-1 flex flex-col bg-studio-panel-bg overflow-hidden">
      {/* Top static header part */}
      <div className="px-6 pt-6">
        {/* ... (header content as before) ... */}
      </div>

      {/* Scrollable chat content area */}
      <div ref={parentRef} className="flex-grow overflow-y-auto px-6 custom-scrollbar">
        {/* ... (User Input Area and Thoughts Section as before) ... */}

        {/* Virtualized Chat List */}
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
          className="pb-6"
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => {
            const message = messages[virtualItem.index];
            return (
              <ChatMessage
                key={message.id} // Make sure key is stable and unique
                messageData={message}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                  paddingRight: '0.5rem',
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Bottom Prompt Input Bar */}
      <div className="bg-studio-panel-bg px-6 pt-3 pb-4 border-t border-studio-border">
        <div className="flex items-center space-x-3">
          <button className="text-studio-text-secondary hover:text-studio-text-primary p-2 rounded-full hover:bg-gray-100">
            <PlusIcon className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())} // Send on Enter
            placeholder="Start typing a prompt"
            className="flex-1 px-3.5 py-2.5 border border-studio-input-border rounded-lg focus:ring-1 focus:ring-studio-accent focus:border-studio-accent text-sm placeholder-studio-text-tertiary"
          />
          <button
            onClick={handleSendMessage} // Use the new handler
            className="bg-studio-accent hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center space-x-1.5 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={!promptText.trim()}
          >
            <span>Run</span>
            <span className="text-xs text-indigo-200">⌘↩</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default MainContent;