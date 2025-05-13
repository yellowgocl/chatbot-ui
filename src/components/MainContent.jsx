import React from 'react';
import {
  ListBulletIcon,
  CodeBracketIcon,
  ShareIcon,
  ArrowDownTrayIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  EllipsisVerticalIcon,
  PlusCircleIcon,
  SparklesIcon,
  ArrowSmallLeftIcon,
} from '@heroicons/react/24/outline';
import IconButton from './IconButton';

const PromptSuggestion = ({ text }) => (
  <button className="px-4 py-2 bg-white border border-studio-border rounded-lg text-sm text-studio-secondary-text hover:bg-gray-50 hover:border-gray-400">
    {text}
  </button>
);

const MainContent = () => {
  return (
    <main className="flex-1 flex flex-col bg-studio-panel-bg overflow-y-auto">
      <div className="px-6 py-4 border-b border-studio-border flex items-center justify-between">
        <h2 className="text-lg font-medium text-studio-primary-text">Chat Prompt</h2>
        <div className="flex items-center space-x-1">
          <IconButton icon={ListBulletIcon} ariaLabel="View mode" />
          <IconButton icon={CodeBracketIcon} ariaLabel="Get code" />
          <IconButton icon={ShareIcon} ariaLabel="Share" />
          <IconButton icon={ArrowDownTrayIcon} ariaLabel="Save" />
          <div className="h-6 border-l border-studio-border mx-2"></div>
          <IconButton icon={ArrowUturnLeftIcon} ariaLabel="Undo" />
          <IconButton icon={ArrowUturnRightIcon} ariaLabel="Redo" />
          <IconButton icon={EllipsisVerticalIcon} ariaLabel="More options" />
        </div>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-xl">
          <h1 className="text-4xl font-semibold text-studio-blue mb-8">
            Welcome to AI Studio
          </h1>
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Type something or pick one from prompt gallery"
              className="w-full p-4 pr-48 border border-studio-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-2">
              <IconButton icon={PlusCircleIcon} ariaLabel="Add content" className="text-gray-500 hover:text-gray-700" />
              <button className="flex items-center space-x-2 bg-studio-button-bg hover:bg-studio-button-hover-bg text-studio-primary-text font-medium py-2.5 px-4 rounded-lg text-sm">
                <SparklesIcon className="w-4 h-4 text-yellow-500" />
                <span>Run</span>
                <ArrowSmallLeftIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <PromptSuggestion text="Image to recipe in JSON." />
            <PromptSuggestion text="Find time complexity & optimize it." />
            <PromptSuggestion text="Craft a blog post with an image." />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;