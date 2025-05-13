import React from 'react';

const IconButton = ({ icon: Icon, onClick, className = '', ariaLabel }) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`p-2 rounded-full hover:bg-gray-200 text-gray-600 ${className}`}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
};

export default IconButton;