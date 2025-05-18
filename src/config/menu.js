// src/config/menu.js
import { ChatBubbleOvalLeftEllipsisIcon, ClockIcon } from '@heroicons/react/24/outline';

export const sidebarNavItems = [
  {
    id: 'chat',
    label: 'Chat',
    icon: ChatBubbleOvalLeftEllipsisIcon,
    path: '/chat',
  },
  {
    id: 'history',
    label: 'History',
    icon: ClockIcon,
    path: '/history',
    // Example if History had a submenu again:
    // hasSubmenu: true,
    // subItems: [
    //   { id: 'history-sub', label: 'React Bootstrap Product Li...', path: '/history/some-sub-path' }
    // ]
  },
];