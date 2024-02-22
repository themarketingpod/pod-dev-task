import React from 'react';

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  message = "Are you sure you want to proceed?" // Default message if none provided
}) => {
  return (
    <div className={`modal-container fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p>{message}</p>
        <div className="flex justify-end space-x-4 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md">Cancel</button>
            <button onClick={() => {
              onClose(); // Optionally close the modal after confirmation
            }} className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Confirm
            </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
