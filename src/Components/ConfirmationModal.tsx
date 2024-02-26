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
      <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-700">
        <p>{message}</p>
        <div className="flex justify-center mt-4">
        <button onClick={() => {
              onClose(); // Optionally close the modal after confirmation
            }} className="btn">
              Confirm
            </button>
          <button onClick={onClose} className="btn btn-cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
