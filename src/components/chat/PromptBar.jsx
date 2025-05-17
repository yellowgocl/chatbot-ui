// src/components/chat/PromptBar.jsx
import React, { useState, useEffect, useRef } from 'react'; // Added useRef
import { PlusIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import IconButton from '../common/IconButton';
import Button from '../common/Button';

const PromptBar = () => {
  const [prompt, setPrompt] = useState('');
  const [isMac, setIsMac] = useState(false);
  const textareaRef = useRef(null); // For auto-resizing

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
    }
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height
      const scrollHeight = textarea.scrollHeight;
      const maxHeight = parseInt(getComputedStyle(textarea).maxHeight, 10) || Infinity; // 12rem to px
      textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  }, [prompt]); // Re-run when prompt changes


  const shortcutHint = `Run ${isMac ? '⌘+↵' : 'Shift+↵ for new line'}`; // Corrected shortcut text based on common patterns and image style

  const handleSend = () => {
    if (prompt.trim()) {
      console.log('Sending prompt:', prompt);
      setPrompt('');
      if (textareaRef.current) { // Reset height after send
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    // Send on Cmd/Ctrl + Enter OR just Enter if Shift is not pressed
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey || !e.shiftKey)) {
      if (!e.shiftKey) { // Prevent newline if only Enter is pressed (and not for Cmd/Ctrl+Enter which implies send)
        e.preventDefault();
      }
      handleSend();
    }
  };

  return (
    <div className="sticky bottom-0 bg-background pt-2 pb-3 px-2 md:px-0">
      <div className="max-w-3xl mx-auto">
        <div
          className="flex items-end p-1 pr-1.5 space-x-1.5 border border-border rounded-xl shadow-sm bg-white 
                     focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all"
        >
          {/* Textarea - Takes up most space */}
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Start typing a prompt"
            rows="1"
            className="flex-1 resize-none py-2 px-2 focus:outline-none text-sm bg-transparent placeholder-muted-foreground self-center"
            style={{ maxHeight: '10rem' }} // Max height before scrolling (approx 160px)
          />

          {/* Right-side controls container */}
          <div className="flex items-center space-x-1 shrink-0">
            {/* Plus Icon Button - Outline style */}
            <IconButton
              variant="ghost" // Ghost makes it look like an outline button without bg until hover
              size="md" // Uses p-2
              aria-label="Add attachment or context"
              className="text-muted-foreground hover:text-foreground hover:bg-secondary border border-transparent hover:border-border rounded-md" // More outline-like
            >
              <PlusIcon className="h-5 w-5" />
            </IconButton>

            {/* Run Button - Specific styling from image */}
            <Button
              variant="secondary" // This should be a light gray button as per your theme
              size="md" // px-4 py-2 text-sm
              onClick={handleSend}
              disabled={!prompt.trim()}
              // The image's Run button is slightly darker than typical secondary,
              // with text also slightly darker. If `btn-secondary` isn't enough,
              // you might need a custom class or adjust the theme.
              // For now, relying on btn-secondary from tailwind.config.js
              className="flex justify-center items-center font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300" // Overriding for closer match
            >
              <span className="hidden sm:inline mr-1.5">{shortcutHint.split(" ")[0]}</span> {/* "Run" */}
              <span className="hidden sm:inline ml-1.5 text-sm text-muted-foreground">{shortcutHint.split(" ").slice(1).join(" ")}</span> {/* Shortcut part */}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptBar;