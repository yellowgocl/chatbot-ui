// src/components/sidebar/PromptGallery.jsx
import React, { useState } from 'react';
import Chip from '../common/Chip';
import ChipGroup from '../common/ChipGroup';

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
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  const filteredPrompts = selectedCategory === 'All'
    ? samplePrompts
    : samplePrompts.filter(p => p.category === selectedCategory);

  const handlePromptSelect = (prompt) => {
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
          filteredPrompts.map(prompt => (
            <div
              key={prompt.id}
              className="prompt-label"
              onClick={() => handlePromptSelect(prompt)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handlePromptSelect(prompt)}
            >
              <p className="text-sm text-foreground mb-1 line-clamp-2">{prompt.text}</p>
              {/* <div className="flex flex-wrap gap-1 mt-1.5">
                {prompt.tags.map(tag => (
                  <Chip key={tag} size="sm" variant="default" color="secondary" className="pointer-events-none">
                    {tag}
                  </Chip>
                ))}
              </div> */}
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No prompts found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default PromptGallery;