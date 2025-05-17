// src/components/common/Switch.jsx
import React from 'react';
import { Switch as HeadlessSwitch } from '@headlessui/react';
import { Controller } from 'react-hook-form';
import clsx from 'clsx';
import ErrorMessage from './ErrorMessage';

const CustomSwitch = ({ name, control, label, rules, defaultValue = false }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, value, name: fieldName }, fieldState: { error } }) => (
        <HeadlessSwitch.Group as="div" className="flex items-center justify-between my-2">
          {label && (
            <HeadlessSwitch.Label as="span" className="mr-3 text-sm text-foreground">
              {label}
            </HeadlessSwitch.Label>
          )}
          <HeadlessSwitch
            checked={value}
            onChange={onChange}
            name={fieldName}
            className={clsx(
              'relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
              value ? 'bg-switch-trackChecked' : 'bg-switch-track'
            )}
          >
            <span
              aria-hidden="true"
              className={clsx(
                'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-switch-thumb shadow ring-0 transition duration-200 ease-in-out',
                value ? 'translate-x-4' : 'translate-x-0'
              )}
            />
          </HeadlessSwitch>
          {error && <ErrorMessage message={error.message} />}
        </HeadlessSwitch.Group>
      )}
    />
  );
};

export default CustomSwitch;