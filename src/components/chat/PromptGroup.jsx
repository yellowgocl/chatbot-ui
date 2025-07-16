import React, { useState } from 'react';
import PromptItem from './PromptItem';

const PromptGroup = ({ prompts, selectionMode = 'multiple', onSelectPrompt }) => {
  const [selectedPrompts, setSelectedPrompts] = useState([]);

  const handleSelect = (prompt) => {
    if (selectionMode === 'single') {
      const newSelectedPrompts = selectedPrompts[0]?.id === prompt.id ? [] : [prompt];
      setSelectedPrompts(newSelectedPrompts);
      if (onSelectPrompt) {
        onSelectPrompt(newSelectedPrompts);
      }
    } else if (selectionMode === 'multiple') {
      const isSelected = selectedPrompts.some(selected => selected.id === prompt.id);
      const newSelectedPrompts = isSelected
        ? selectedPrompts.filter(selected => selected.id !== prompt.id)
        : [...selectedPrompts, prompt];
      setSelectedPrompts(newSelectedPrompts);
       if (onSelectPrompt) {
        onSelectPrompt(newSelectedPrompts);
      }
    }
  };

  return (
    <div className="prompt-group">
      {prompts.map(prompt => (
        <PromptItem
          key={prompt.id}
          prompt={prompt}
          isSelected={selectedPrompts.some(selected => selected.id === prompt.id)}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
};

export default PromptGroup;