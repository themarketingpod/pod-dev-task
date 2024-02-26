import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ConfirmationModal from '../Components/ConfirmationModal';

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  age: number;
  gender: string;
};

export default function EditUser() {

  const { userId } = useParams();
  const navigate = useNavigate();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  // State to store user information
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch user information based on userId
    fetch(`https://dummyjson.com/users/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        return response.json();
      })
      .then((data: User) => {
        setUser(data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch user. Please try again later.');
        setLoading(false);
        return error;
      });
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  function handleUpdateUser() {
    if (user) {
      const updateUserUrl = `https://dummyjson.com/users/${user.id}`;

      // Define the updated user data
      const updatedUserData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      };

      fetch(updateUserUrl, {
        method: 'PUT', // or PATCH
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUserData)
      })
      .then(res => res.json())
      .then(updatedUser => {
        console.log('User updated successfully:', updatedUser);
      })
      .catch(error => {
        console.error('Failed to update user:', error);
      });
      setIsConfirmationModalOpen(true);
    }
  }

  function handleDeleteUser() {
    if (user) {
      const deleteUserUrl = `https://dummyjson.com/users/${user.id}`;

      fetch(deleteUserUrl, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            setIsConfirmationModalOpen(true);
          } else {
            throw new Error('Failed to delete user');
          }
        })
        .catch(error => {
          console.error('Failed to delete user:', error);
        });
    }
  }

  // Function to handle modal close and navigate back to home
  function handleCloseAndNavigate() {
    setIsConfirmationModalOpen(false);
    navigate('/'); // Navigate to the home page
  }

  return (
    <div className="flex justify-center items-center pt-[64px] h-screen">
      <div className="user-card">
        {user && (
          <div className="p-10 max-w-sm bg-slate-300 rounded-lg overflow-hidden shadow-lg text-center dark:bg-gray-700">
            <div className="flex items-center justify-center">
              <div className={`w-40 h-40 overflow-hidden ${user.gender === 'male' ? 'bg-blue-300' : 'bg-pink-300'}`}>
                <img className="w-full h-full object-cover" src={user.image} alt="User" />
              </div>
            </div>
            <form className="px-6 py-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  value={user.firstName}
                  onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={user.lastName}
                  onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
                  Age
                </label>
                <input
                  id="age"
                  type="number"
                  placeholder="Age"
                  value={user.age}
                  onChange={(e) => setUser({ ...user, age: parseInt(e.target.value) })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                  Gender
                </label>
                <input
                  id="gender"
                  type="gender"
                  placeholder="Gender"
                  value={user.gender}
                  onChange={(e) => setUser({ ...user, gender: e.target.value })}
                />
              </div>
              </form>
            <div className="flex justify-center">
              <button 
                type="button"
                className="btn"
                onClick={handleUpdateUser}
              >
                Update User
              </button>
              <button 
                type="button"
                className="btn btn-cancel"
                onClick={handleDeleteUser}
              >
                Delete User
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Render ConfirmationModal with onClose modified to handle navigation */}
      <ConfirmationModal 
        isOpen={isConfirmationModalOpen} 
        onClose={handleCloseAndNavigate}
      />
    </div>
  );
}
