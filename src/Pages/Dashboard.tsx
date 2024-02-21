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
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://dummyjson.com/users/')
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
        return error;
      });
  }, []);

  return (
    <div className="flex justify-center text-center items-center">
      <div className="p-4">
        <h1 className="text-3xl font-semibold mb-2">User Dashboard</h1>
        <p className="mb-4">Select a user from the table below to view more details</p>
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
                  <tr key={user.id} className={`text-center cursor-pointer ${index % 2 === 0 ? 'bg-gray-100' : ''}`} onClick={() => { setSelectedUser(user); setIsModalOpen(true); }}>
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
        <UserModal user={selectedUser} onClose={() => setIsModalOpen(false)} isOpen={isModalOpen} />
      </div>
    </div>
  );
}

export default DashboardPage;
