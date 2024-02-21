import { useState, useEffect } from 'react';
import UserModal from './Components/UserModal';

// Define the User type
type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  age: number;
  gender: string;
};

function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1); // Current page number
  const usersPerPage = 20; // Number of users per page

  useEffect(() => {
    setLoading(true);
    const skip = (page - 1) * usersPerPage; // Calculate the number of users to skip
    fetch(`https://dummyjson.com/users/?skip=${skip}&limit=${usersPerPage}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      })
      .then(data => {
        // Extracting and mapping desired properties from each user
        const updatedUsers = data.users.map((user: User) => {
          return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            age: user.age,
            image: user.image,
            gender: user.gender
          };
        });

        setUsers(updatedUsers);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch users. Please try again later.');
        setLoading(false);
        console.error(error);
      });
  }, [page]);

  const handlePreviousPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1)); // Ensure page number doesn't go below 1
  };

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const playHoverSound = () => {
    const audio = new Audio('/public/Audio/click-sound.mp3');
    audio.volume = 0.4;
    audio.play();
  };

  const playSelectSound = () => {
    const audio = new Audio('/public/Audio/select-sound.mp3');
    audio.volume = 0.3;
    audio.play();
  };

  return (
    <div className="flex justify-center text-center items-center">
      <div className="p-4">
        <h1 className="text-3xl font-semibold mb-2">User Dashboard</h1>
        <p className="mb-4">Select a user from the table below to view more details</p>
        <div className="mb-4">
          <button onClick={handlePreviousPage} disabled={page === 1} className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300">Previous Page</button>
          <button onClick={handleNextPage} disabled={users.length < usersPerPage} className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300">Next Page</button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-600">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="p-2">ID</th>
                  <th className="p-2">Image</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Age</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`text-center cursor-pointer ${index % 2 === 0 ? 'bg-gray-100' : ''} transition duration-100 hover:bg-yellow-200`}
                    onMouseEnter={playHoverSound} // Attach onMouseEnter event listener
                    onClick={() => {
                      setSelectedUser(user);
                      setIsModalOpen(true);
                      playSelectSound();
                    }}
                  >
                    <td className="p-2 border">{user.id}</td>
                    <td className="p-2 border relative">
                      <img src={user.image} alt="User" className="w-10 h-10 mx-auto" />
                      {user.gender === "male" ? (
                        <span className="absolute top-0 right-0 bg-blue-300 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs mt-0.5">♂</span>
                      ) : (
                        <span className="absolute top-0 right-0 bg-pink-300 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs mt-0.5">♀</span>
                      )}
                    </td>
                    <td className="p-2 border">{user.firstName} {user.lastName}</td>
                    <td className="p-2 border">{user.email}</td>
                    <td className="p-2 border">{user.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Conditionally render the UserModal based on isModalOpen state */}
        {isModalOpen && (
        <div className="modal-container fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
            <UserModal user={selectedUser} onClose={() => setIsModalOpen(false)} isOpen={isModalOpen} />
            </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
