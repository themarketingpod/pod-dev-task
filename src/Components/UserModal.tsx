import { useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';

type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    age: number;
    gender: string;
};

type UserModalProps = {
    user: User | null;
    onClose: () => void;
    isOpen: boolean;
};

const playDeselectSound = () => {
  const audio = new Audio('/public/Audio/deselect-sound.mp3');
  audio.volume = 0.3;
  audio.play();
};

const UserModal: React.FC<UserModalProps> = ({ user, onClose, isOpen }) => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const modalOverlayClass = isOpen ? "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" : "hidden";
  const modalClass = isOpen ? "bg-white rounded-lg shadow-lg p-6" : "hidden";

  if (!user || !isOpen) return null;

  // Function to handle user deletion
  function handleDeleteUser() {
    if (user) {
      const deleteUserUrl = `https://dummyjson.com/users/${user.id}`;

      fetch(deleteUserUrl, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            setIsConfirmationModalOpen(false);
            onClose(); // Close the UserModal
            playDeselectSound();
          } else {
            throw new Error('Failed to delete user');
          }
        })
        .catch(error => {
          console.error('Failed to delete user:', error);
        });
    }
  }

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    handleDeleteUser();
  };

  return (
    <>
      <div className={modalOverlayClass}>
        <div className={modalClass}>
          <div className="relative">
          <div className="flex items-center justify-center">
          <div className={`w-40 h-40 overflow-hidden ${user.gender === 'male' ? 'bg-blue-300' : 'bg-pink-300'}`}>
            <img className="w-full h-full object-cover" src={user.image} alt="User" />
          </div>
        </div>
            <div 
              className="absolute top-1 right-1 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md cursor-pointer" 
              onClick={() => {
                onClose();
                playDeselectSound();
              }}
            >
              <span className="text-black text-2xl">&times;</span>
            </div>
          </div>
          <div className="px-6 py-4">
            <div className="flex items-center justify-center mb-2">
              <p className="font-bold text-xl">{user.firstName} {user.lastName}</p>
              <span className={`bg-${user.gender === "male" ? 'blue' : 'pink'}-300 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs ml-2`}>{user.gender === "male" ? '♂' : '♀'}</span>
            </div>
            <a className="text-blue-500 hover:underline" href={`mailto:${user.email}`}>{user.email}</a>
          </div>
          <Link to={`/users/${user.id}/edit`} className="btn py-2 px-4">
            Update User
          </Link>
          <button 
            className="btn btn-cancel py-2 px-4"
            onClick={handleDeleteUser}
          >
            Delete User
          </button>
        </div>
      </div>
      <ConfirmationModal 
        isOpen={isConfirmationModalOpen} 
        onClose={handleCloseConfirmationModal} 
      />
    </>
  );
};

export default UserModal;
