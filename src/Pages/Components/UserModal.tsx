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
    isOpen: boolean; // Add the isOpen prop here
};

const UserModal: React.FC<UserModalProps> = ({ user, onClose, isOpen }) => {
    if (!user || !isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <div className="p-10 max-w-sm bg-white rounded-lg overflow-hidden shadow-lg text-center">
                        <img className="w-full" src={user.image} alt="User" />
                        <div className="px-6 py-4">
                            <p className="font-bold text-xl mb-2">{user.firstName} {user.lastName}</p>
                            <p className="text-gray-700 text-base mb-2">ID: {user.id}</p>
                            <p className="text-gray-700 text-base mb-2">Email: {user.email}</p>
                        </div>
                        <Link to={`/users/${user.id}/edit`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                            Update User
                        </Link>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Delete User
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserModal;
