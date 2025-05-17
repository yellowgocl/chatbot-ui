// src/components/common/Select.jsx
import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Controller } from 'react-hook-form';
import { CheckIcon, ChevronDownIcon as UiChevronDownIcon } from '@heroicons/react/20/solid'; // Using 20/solid for UI elements
import clsx from 'clsx';
import ErrorMessage from './ErrorMessage';

const CustomSelect = ({ name, control, label, options, rules, defaultValue = '', placeholder = "Select an option" }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue || (options.length > 0 ? options[0].value : '')}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="my-2 w-full">
          {label && <Listbox.Label className="block text-sm font-medium text-foreground mb-1">{label}</Listbox.Label>}
          <Listbox value={value} onChange={onChange}>
            <div className="relative">
              <Listbox.Button className="input-base relative w-full cursor-default rounded-md bg-select-button-default py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm hover:bg-select-button-hover">
                <span className="block truncate">
                  {options.find(opt => opt.value === value)?.label || placeholder}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <UiChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-background py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      className={({ active }) =>
                        clsx(
                          'relative cursor-default select-none py-2 pl-10 pr-4',
                          active ? 'bg-select-option-active text-select-option-active-foreground' : 'text-select-option-inactive-foreground'
                        )
                      }
                      value={option.value}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={clsx(
                              'block truncate',
                              selected ? 'font-medium' : 'font-normal'
                            )}
                          >
                            {option.label}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary"> {/* Adjusted for Heroicon */}
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
          {error && <ErrorMessage message={error.message} />}
        </div>
      )}
    />
  );
};

export default CustomSelect;