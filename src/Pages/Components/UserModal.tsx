import { Link } from 'react-router-dom';

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
  const modalOverlayClass = isOpen ? "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" : "hidden";
  const modalClass = isOpen ? "bg-white rounded-lg shadow-lg p-6" : "hidden";

  if (!user || !isOpen) return null;

  return (
    <div className={modalOverlayClass}>
      <div className={modalClass}>
        <div className="relative">
          <img className="w-full" src={user.image} alt="User" />
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
          <p className="text-gray-700 text-base mb-2">ID: {user.id}</p>
          <a className="text-blue-500 hover:underline" href={`mailto:${user.email}`}>{user.email}</a>
        </div>
        <Link to={`/users/${user.id}/edit`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 inline-block">
          Update User
        </Link>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-block">
          Delete User
        </button>
      </div>
    </div>
  );
};



export default UserModal;
