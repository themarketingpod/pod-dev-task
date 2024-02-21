import { Link } from "react-router-dom";

// Define the type for the user object
type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    // Add more properties if needed
  };
  
  // Define the type for the props of the UserCard component
  type UserCardProps = {
    user: User;
  };
  
  // Define the UserCard component
  function UserCard({ user }: UserCardProps) {
    return (
            <div className="user-card">
            <div className="flex justify-center items-center">
                {user && (
                    <div className="max-w-sm mx-auto bg-white rounded-lg overflow-hidden shadow-lg text-center">
                        {/* Use inline style for backgroundImage */}
                        <img className="w-full" src={user.image} alt="User" />
                        <div className="px-6 py-4">
                            <p className="font-bold text-xl mb-2">{user.firstName} {user.lastName}</p>
                            <p className="text-gray-700 text-base mb-2">ID: {user.id}</p>
                            <p className="text-gray-700 text-base mb-2">Email: {user.email}</p>
                        </div>
                    </div>
                )}
                </div>
            </div>
    );
  }
  
  export default UserCard;