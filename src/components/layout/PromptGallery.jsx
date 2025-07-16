import React, { useState } from 'react';
import Chip from '../common/Chip';
import ChipGroup from '../common/ChipGroup';
import PromptGroup from '../chat/PromptGroup'; // Import PromptGroup

const samplePrompts = [
  { id: 'p1', category: 'Creative Writing', text: 'Write a short story about a lost robot.', tags: ['story', 'sci-fi'] },
  { id: 'p2', category: 'Coding', text: 'Generate a Python function to sort a list.', tags: ['python', 'algorithm'] },
  { id: 'p3', category: 'Brainstorming', text: 'Ideas for a sustainable G_city project.', tags: ['ideas', 'eco'] },
  { id: 'p4', category: 'Creative Writing', text: 'Describe a sunset on Mars.', tags: ['description', 'space'] },
  { id: 'p5', category: 'Summarization', text: 'Summarize the concept of blockchain.', tags: ['summary', 'tech'] },
];

const categories = ['All', 'Creative Writing', 'Coding', 'Brainstorming', 'Summarization'];

const PromptGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  // Keep selectedPrompt state, PromptGroup in single mode will manage internal selection
  // and report the single selected item via onSelectPrompt
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  const filteredPrompts = selectedCategory === 'All'
    ? samplePrompts
    : samplePrompts.filter(p => p.category === selectedCategory);

  const handlePromptSelect = (selectedItems) => {
    // PromptGroup in single mode passes an array with 0 or 1 item
    const prompt = selectedItems.length > 0 ? selectedItems[0] : null;
    console.log("Prompt selected:", prompt);
    setSelectedPrompt(prompt);
    // Here you would typically do something with the selected prompt,
    // e.g., populate the main chat input.
  };

  return (
    <div className="p-1 space-y-4">
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Categories</h3>
        <ChipGroup
          value={selectedCategory}
          onChange={(newCategory) => setSelectedCategory(newCategory)}
          chipProps={{ color: "primary", size: "sm" }}
        >
          {categories.map(cat => (
            <Chip key={cat} value={cat}>
              {cat}
            </Chip>
          ))}
        </ChipGroup>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">
          {selectedCategory === 'All' ? 'All Prompts' : `${selectedCategory} Prompts`}
        </h3>
        {filteredPrompts.length > 0 ? (
          // Use PromptGroup to render prompts
          <PromptGroup
            prompts={filteredPrompts}
            selectionMode="multiple" // Use single selection mode for PromptGallery
            onSelectPrompt={handlePromptSelect}
          />
        ) : (
          <p className="text-sm text-muted-foreground">No prompts found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default PromptGallery;