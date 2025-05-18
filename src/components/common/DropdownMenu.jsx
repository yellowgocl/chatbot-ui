import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import {
    ArchiveBoxXMarkIcon,
    ChevronDownIcon,
    PencilIcon,
    Square2StackIcon,
    TrashIcon,
  } from '@heroicons/react/24/solid'

export default function DropdownMenu() {
  return (
    <Menu>
      {({ open }) => (
        <>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-muted px-3 py-1.5 text-sm/6 font-semibold text-muted-foreground shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-700 data-open:bg-gray-700">
            Developer
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
                className="w-36 mt-1 shadow-md origin-top rounded-xl border border-muted bg-white p-1 text-sm/6"
              >
                <MenuItem>
                    <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5">
                    Developer
                    </button>
                </MenuItem>
                <MenuItem>
                    <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5">
                    User
                    </button>
                </MenuItem>
              </MenuItems>
            )}
          </AnimatePresence>
        </>
      )}
    </Menu>
  )
}