// src/components/chat/Message.jsx
import React from 'react';
import clsx from 'clsx';
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/outline'; // Or solid if preferred
import IconButton from '../common/IconButton';

const Message = ({ author, text }) => {
  const isModel = author === 'model';
  return (
    <div className={clsx("flex my-2", isModel ? 'justify-start' : 'justify-end')}>
      <div className="max-w-xl">
        <div
          className={clsx(
            "p-3 rounded-lg text-sm",
            isModel
              ? "bg-secondary text-foreground rounded-bl-none"
              : "bg-primary/10 text-primary-dark rounded-br-none ml-auto"
          )}
        >
          {text}
        </div>
        {isModel && (
          <div className="mt-1.5 flex items-center space-x-1 pl-1">
            <IconButton variant="ghost" size="sm" aria-label="Good response">
              <HandThumbUpIcon className="h-3.5 w-3.5 text-muted-foreground hover:text-primary" /> {/* Adjusted size */}
            </IconButton>
            <IconButton variant="ghost" size="sm" aria-label="Bad response">
              <HandThumbDownIcon className="h-3.5 w-3.5 text-muted-foreground hover:text-danger" /> {/* Adjusted size */}
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;