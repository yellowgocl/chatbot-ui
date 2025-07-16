import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import {
    ArchiveBoxXMarkIcon,
    ChevronDownIcon,
    PencilIcon,
    Square2StackIcon,
    TrashIcon,
  } from '@heroicons/react/24/solid'

export default function DropdownMenu({ items = [] }) {
  return (
    <Menu>
      {({ open }) => (
        <>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-muted px-3 py-1.5 text-sm/6 font-semibold text-muted-foreground shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-700 data-open:bg-gray-700">
            Agent
            <ChevronDownIcon className="size-4 text-muted-foreground" />
        </MenuButton>
          <AnimatePresence>
            {open && (
              <MenuItems
                static
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                anchor="bottom-end"
                className="w-52 mt-1 shadow-md origin-top rounded-xl border border-muted bg-white p-1 text-sm/6"
              >
                {items.map((item, index) => (
                  <MenuItem key={index}>
                    {({ focus }) => (
                      <button
                        className={`${
                          focus ? 'bg-blue-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center gap-2 rounded-lg py-1.5 px-3`}
                      >
                        <div className="flex flex-col items-start">
                          <span className="font-semibold">{item.title}</span>
                          <span className="text-xs opacity-75">{item.description}</span>
                        </div>
                      </button>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            )}
          </AnimatePresence>
        </>
      )}
    </Menu>
  )
}