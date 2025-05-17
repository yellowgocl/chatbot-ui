// src/components/common/ErrorMessage.jsx
import React from 'react';

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return <p className="mt-1 text-xs text-danger">{message}</p>;
};

export default ErrorMessage;