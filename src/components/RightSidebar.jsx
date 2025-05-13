import React, { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import {
  ChevronUpIcon,
  ArrowPathIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';
import IconButton from './IconButton';
import ToggleSwitch from './ToggleSwitch';
import ModelSelector from './ModelSelector';

const RightSidebar = () => {
  const [temp, setTemp] = useState(1);
  const [structuredOutput, setStructuredOutput] = useState(false);
  const [codeExecution, setCodeExecution] = useState(true); // Default based on image
  const [functionCalling, setFunctionCalling] = useState(true); // Default based on image
  const [grounding, setGrounding] = useState(true); // Default based on image

  return (
    <div className="flex h-full">
      <aside className="w-[350px] bg-studio-panel-bg border-l border-studio-border flex flex-col flex-shrink-0">
        <div className="px-6 py-4 border-b border-studio-border flex items-center justify-between">
          <h3 className="text-base font-medium text-studio-primary-text">Run settings</h3>
          <div className="flex items-center space-x-1">
            <IconButton icon={ArrowPathIcon} ariaLabel="Reset settings" />
            <IconButton icon={XMarkIcon} ariaLabel="Close settings" />
          </div>
        </div>

        <div className="flex-grow p-6 space-y-6 overflow-y-auto">
          <div>
            <ModelSelector />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="token-count" className="block text-sm font-medium text-studio-secondary-text">
                Token count
              </label>
              <span className="text-sm text-studio-secondary-text">0 / 1,048,576</span>
            </div>
            {/* Placeholder for token visualization if any */}
          </div>

          <div>
            <label htmlFor="temperature" className="block text-sm font-medium text-studio-secondary-text mb-1">
              Temperature
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                id="temperature"
                min="0"
                max="2"
                step="0.1"
                value={temp}
                onChange={(e) => setTemp(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" // `accent-blue-600` styles the thumb and track in modern browsers
              />
              <input
                type="number"
                value={temp}
                onChange={(e) => setTemp(parseFloat(e.target.value))}
                min="0"
                max="2"
                step="0.1"
                className="w-16 p-1.5 border border-studio-border rounded-md text-sm text-center focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="border-t border-studio-border pt-4">
            <Disclosure defaultOpen>
              {({ open }) => (
                <div>
                  <Disclosure.Button className="flex w-full justify-between items-center rounded-lg py-2 text-left text-sm font-medium text-studio-primary-text hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    <span>Tools</span>
                    <ChevronUpIcon
                      className={`${open ? 'rotate-180 transform' : ''
                        } h-5 w-5 text-studio-secondary-text`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="pt-4 pb-2 space-y-4 text-sm text-gray-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-studio-primary-text">Structured output</span>
                        <button className="ml-2 text-xs text-blue-600 hover:underline">Edit</button>
                      </div>
                      <ToggleSwitch enabled={structuredOutput} onChange={setStructuredOutput} srLabel="Structured output" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-studio-primary-text">Code execution</span>
                      <ToggleSwitch enabled={codeExecution} onChange={setCodeExecution} srLabel="Code execution" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-studio-primary-text">Function calling</span>
                        <button className="ml-2 text-xs text-blue-600 hover:underline">Edit</button>
                      </div>
                      <ToggleSwitch enabled={functionCalling} onChange={setFunctionCalling} srLabel="Function calling" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-studio-primary-text">Grounding with Google Search</span>
                      <ToggleSwitch enabled={grounding} onChange={setGrounding} srLabel="Grounding with Google Search" />
                    </div>
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          </div>

          <div className="border-t border-studio-border pt-4">
            <Disclosure>
              {({ open }) => (
                <div>
                  <Disclosure.Button className="flex w-full justify-between items-center rounded-lg py-2 text-left text-sm font-medium text-studio-primary-text hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    <span>Advanced settings</span>
                    <ChevronUpIcon
                      className={`${open ? 'rotate-180 transform' : ''
                        } h-5 w-5 text-studio-secondary-text`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500">
                    More advanced settings would go here.
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          </div>
        </div>
      </aside>
      <div className="w-16 bg-studio-bg flex-shrink-0 flex flex-col items-center space-y-3 py-6 border-l border-studio-border">
          <IconButton icon={AdjustmentsHorizontalIcon} ariaLabel="Filter" className="bg-white shadow-md hover:bg-gray-100" />
          <IconButton icon={PhotoIcon} ariaLabel="Add image" className="bg-white shadow-md hover:bg-gray-100" />
      </div>
    </div>
  );
};

export default RightSidebar;