// src/components/layout/Header.jsx
import React from 'react';
import {
  KeyIcon,
  Cog6ToothIcon, // Or Cog8ToothIcon
  ArrowTopRightOnSquareIcon,
  UserCircleIcon as UserCircleSolidIcon, // Using solid for profile
} from '@heroicons/react/24/solid'; // For UserCircle
import { Cog6ToothIcon as Cog6ToothOutlineIcon } from '@heroicons/react/24/outline'; // For settings icon if preferred outline
import Button from '../common/Button';

const Header = () => {
  return (
    <header className="bg-background border-b border-border px-4 py-2 flex items-center justify-between shrink-0">
      <h1 className="text-xl font-semibold text-foreground">Google AI Studio</h1>
      <nav className="flex items-center space-x-4">
        <button className="p-1 bg-accent rounded-full text-accent-foreground">
          <UserCircleSolidIcon className="h-6 w-6" /> {/* Adjusted size */}
        </button>
      </nav>
    </header>
  );
};

export default Header;