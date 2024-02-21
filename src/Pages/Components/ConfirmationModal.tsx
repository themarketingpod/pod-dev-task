import React from 'react';

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`modal-container fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p>User deleted successfully!</p>
        <button onClick={onClose} className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4">Close</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;