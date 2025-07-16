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
    hasSubmenu: true,
    subItems: [], // This will be populated with actual history items in the component
  },
];