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
import Button from '../common/Button';

const ChatHeader = ({ title }) => {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-border">
      <div className="flex items-center">
        <h2 className="text-lg font-medium text-foreground">{title}</h2>
        <Button variant="ghost" size="sm" className="ml-2" aria-label="Edit title" leftIcon={PencilIcon} />
      </div>
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm" aria-label="Add image" leftIcon={ImagePlusIcon} />
        <Button variant="ghost" size="sm" aria-label="View code" leftIcon={CodeBracketIcon} />
        <Button variant="ghost" size="sm" aria-label="Share" leftIcon={ShareIcon} />
        <Button variant="ghost" size="sm" aria-label="Save" leftIcon={ArrowDownTrayIcon} />
        <div className="h-5 w-px bg-border mx-1"></div>
        <Button variant="ghost" size="sm" aria-label="Retry" leftIcon={RetryIcon} />
        <Button variant="ghost" size="sm" aria-label="More options" leftIcon={EllipsisVerticalIcon} />
      </div>
    </div>
  );
};
export default ChatHeader;