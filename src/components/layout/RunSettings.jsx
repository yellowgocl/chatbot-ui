// src/components/sidebar/RunSettings.jsx
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { runSettingsSchema } from '../../schemas/runSettingsSchema';
import CustomSelect from '../common/Select';
import CustomSwitch from '../common/Switch';
import ErrorMessage from '../common/ErrorMessage';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const modelOptions = [
  { value: 'gemini-2.5-pro-preview-05-06', label: 'Gemini 2.5 Pro Preview 05-06' },
  { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash' },
  { value: 'gemini-1.0-pro', label: 'Gemini 1.0 Pro' },
];

const CollapsibleSection = ({ title, isOpen, setIsOpen, children }) => (
  <div className="border-t border-border pt-3 mt-3">
    <button
      type="button"
      className="flex items-center justify-between w-full py-2 text-sm font-medium text-left text-foreground hover:text-primary"
      onClick={() => setIsOpen(!isOpen)}
    >
      <span>{title}</span>
      {isOpen ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
    </button>
    {isOpen && <div className="mt-2 space-y-2">{children}</div>}
  </div>
);

const RunSettings = () => {
  const { control, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    resolver: yupResolver(runSettingsSchema),
    defaultValues: {
      model: modelOptions[0].value,
      temperature: 0.9,
      structuredOutput: false,
      codeExecution: true,
      functionCalling: true,
      groundingWithGoogleSearch: false,
    }
  });

  const temperature = watch('temperature');
  const [isToolsOpen, setIsToolsOpen] = React.useState(true);
  const [isAdvancedSettingsOpen, setIsAdvancedSettingsOpen] = React.useState(false);

  const onSubmit = (data) => {
    console.log('Run Settings Data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
      {/* Header for Run Settings (can be added if needed, or rely on RightSidebar's header) */}
      {/* <div className="flex items-center justify-between mb-4">
        <h3 className="text-md font-semibold text-foreground">Model Configuration</h3>
      </div> */}
      <div className="flex-1 space-y-4 pt-2"> {/* Added pt-2 for spacing if no dedicated header */}
        <CustomSelect
          name="model"
          control={control}
          options={modelOptions}
          rules={{ required: 'Model is required' }}
        />

        <div>
          <label htmlFor="token-count" className="block text-sm font-medium text-foreground mb-1">Token count</label>
          <div className="text-sm text-muted-foreground">166 / 1,048,576</div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="temperature" className="block text-sm font-medium text-foreground">Temperature</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="1"
              className="w-16 text-sm p-1 border border-border rounded-md text-right bg-background"
              value={temperature}
              onChange={(e) => setValue('temperature', parseFloat(e.target.value), { shouldValidate: true })}
            />
          </div>
          <Controller
            name="temperature"
            control={control}
            render={({ field }) => (
              <input
                type="range"
                id="temperature"
                min="0"
                max="1"
                step="0.01"
                {...field}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
            )}
          />
          {errors.temperature && <ErrorMessage message={errors.temperature.message} />}
        </div>

        <CollapsibleSection title="Tools" isOpen={isToolsOpen} setIsOpen={setIsToolsOpen}>
          <CustomSwitch name="structuredOutput" control={control} label="Structured output" />
          {errors.structuredOutput && <ErrorMessage message={errors.structuredOutput.message} />}
          <CustomSwitch name="codeExecution" control={control} label="Code execution" />
          {errors.codeExecution && <ErrorMessage message={errors.codeExecution.message} />}
          <CustomSwitch name="functionCalling" control={control} label="Function calling" />
          {errors.functionCalling && <ErrorMessage message={errors.functionCalling.message} />}
          <CustomSwitch name="groundingWithGoogleSearch" control={control} label="Grounding with Google Search" />
          {errors.groundingWithGoogleSearch && <ErrorMessage message={errors.groundingWithGoogleSearch.message} />}
        </CollapsibleSection>

        <CollapsibleSection title="Advanced settings" isOpen={isAdvancedSettingsOpen} setIsOpen={setIsAdvancedSettingsOpen}>
          <p className="text-sm text-muted-foreground p-2">Advanced settings content here...</p>
        </CollapsibleSection>
      </div>
      {/* Submit button can be part of RunSettings or handled globally */}
      {/* <div className="mt-auto pt-4 border-t border-border">
          <Button type="submit" className="w-full" variant="primary">Apply Settings</Button>
      </div> */}
    </form>
  );
};

export default RunSettings;