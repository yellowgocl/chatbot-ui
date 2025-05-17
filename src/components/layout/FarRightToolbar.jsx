// src/components/layout/FarRightToolbar.jsx
import React from 'react';
// Use CommandLineIcon or CodeBracketSquareIcon for the prompt gallery/command line like features
import { CommandLineIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import IconButton from '../common/IconButton';

const FarRightToolbar = ({
  onToggleRunSettings,
  isRunSettingsVisible,
  onTogglePromptGallery,
  isPromptGalleryVisible,
}) => {
  return (
    <div className="bg-secondary border-l border-border p-2 flex flex-col items-center space-y-2 shrink-0">
      {/* Command Line / Prompt Gallery Button - Now First */}
      <IconButton
        variant="toolbar"
        size="md"
        active={isPromptGalleryVisible}
        onClick={onTogglePromptGallery}
        aria-label={isPromptGalleryVisible ? "Hide Prompt Gallery" : "Show Prompt Gallery"}
      >
        <CommandLineIcon className="h-5 w-5" />
      </IconButton>

      {/* Run Settings Button - Now Second */}
      <IconButton
        variant="toolbar"
        size="md"
        active={isRunSettingsVisible}
        onClick={onToggleRunSettings}
        aria-label={isRunSettingsVisible ? "Hide settings" : "Show settings"}
      >
        <AdjustmentsHorizontalIcon className="h-5 w-5" />
      </IconButton>
    </div>
  );
};

export default FarRightToolbar;