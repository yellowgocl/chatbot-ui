// src/components/chat/ChatInputArea.jsx
import React from 'react';
import { PencilIcon, SparklesIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import Button from '../common/Button';

const ChatInputArea = () => {
  // The image shows this area as initially empty or containing a system prompt.
  // "Helo" is typed in the PromptBar at the very bottom.
  const initialContent = ""; // Or a default system prompt if desired

  return (
    <div className="relative border border-border rounded-lg bg-white shadow-sm">
      <textarea
        defaultValue={initialContent}
        // The image doesn't show a placeholder for this specific box
        className="w-full min-h-[120px] sm:min-h-[140px] md:min-h-[160px] p-3 pr-20  /* Right padding for icons */
                   resize-none focus:outline-none text-sm bg-transparent 
                   placeholder-muted-foreground"
      />
      <div className="absolute top-2.5 right-2.5 flex items-center space-x-0.5"> {/* Adjusted positioning & spacing */}
        <Button variant="ghost" size="sm" aria-label="Edit" className="text-muted-foreground hover:text-foreground" leftIcon={PencilIcon} />
        <Button variant="ghost" size="sm" aria-label="Tune" className="text-muted-foreground hover:text-foreground" leftIcon={SparklesIcon} />
        <Button variant="ghost" size="sm" aria-label="More" className="text-muted-foreground hover:text-foreground" leftIcon={EllipsisVerticalIcon} />
      </div>
    </div>
  );
};

export default ChatInputArea;