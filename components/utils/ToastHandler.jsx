// components/utils/ToastHandler.jsx
'use client'; // This directive makes it a Client Component

import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function ToastHandler({ isError, message }) {
  useEffect(() => {
    if (message) {
      if (isError) {
        console.log("Showing error toast:", message);
        toast.error(message);
      } else {
        toast.success(message);
      }
    }
  }, [isError, message]);

  return null; // It doesn't render any visible HTML
}