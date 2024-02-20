// ConfirmationModal.js

import React, { useRef, useEffect } from "react";

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  const modalRef = useRef(null);

  // Add event listener to handle clicks outside of the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onCancel(); // Trigger cancel action if clicked outside of modal content
      }
    };

    // Add event listener only if modalRef is defined
    if (modalRef.current) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onCancel]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg p-8" ref={modalRef}>
        <p className="text-lg">{message}</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md mr-4"
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
