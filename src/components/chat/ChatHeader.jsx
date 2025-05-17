// src/components/chat/ChatHeader.jsx
import React from 'react';
import {
  PencilIcon,
  CodeBracketIcon,
  ShareIcon,
  ArrowDownTrayIcon, // For Save
  ArrowPathIcon as RetryIcon, // For Retry/Fork
  EllipsisVerticalIcon,
  PhotoIcon as ImagePlusIcon, // Or PlusCircleIcon
} from '@heroicons/react/24/outline';
import IconButton from '../common/IconButton';

const ChatHeader = ({ title }) => {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-border">
      <div className="flex items-center">
        <h2 className="text-lg font-medium text-foreground">{title}</h2>
        <IconButton variant="ghost" size="sm" className="ml-2" aria-label="Edit title">
          <PencilIcon className="h-4 w-4" />
        </IconButton>
      </div>
      <div className="flex items-center space-x-1">
        <IconButton variant="ghost" size="sm" aria-label="Add image">
          <ImagePlusIcon className="h-4 w-4" />
        </IconButton>
        <IconButton variant="ghost" size="sm" aria-label="View code">
          <CodeBracketIcon className="h-4 w-4" />
        </IconButton>
        <IconButton variant="ghost" size="sm" aria-label="Share">
          <ShareIcon className="h-4 w-4" />
        </IconButton>
        <IconButton variant="ghost" size="sm" aria-label="Save">
          <ArrowDownTrayIcon className="h-4 w-4" />
        </IconButton>
        <div className="h-5 w-px bg-border mx-1"></div>
        <IconButton variant="ghost" size="sm" aria-label="Retry">
          <RetryIcon className="h-4 w-4" />
        </IconButton>
        <IconButton variant="ghost" size="sm" aria-label="More options">
          <EllipsisVerticalIcon className="h-4 w-4" />
        </IconButton>
      </div>
    </div>
  );
};
export default ChatHeader;