import React from 'react';

const Modal = ({ isOpen, close, confirm, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full">
        <div className="mb-4 text-white">{children}</div>
        <div className="flex justify-end space-x-4">
          <button onClick={close} className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 text-white">Cancel</button>
          <button onClick={confirm} className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 text-white">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
