import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Define the type for the user object
type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string; // Assuming 'image' is a string representing the image URL
};

export default function EditUser() {
  // Access route parameters using useParams
  const { userId } = useParams();

  // State to store user information
  const [user, setUser] = useState<User | null>(null); // Specify the type as User | null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch user information based on userId
    fetch(`https://dummyjson.com/user/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        return response.json();
      })
      .then((data: User) => { // Type assertion for data as User
        setUser(data); // Set the user data
        setLoading(false); // Update loading state
      })
      .catch(error => {
        setError('Failed to fetch user. Please try again later.'); // Set error message
        setLoading(false); // Update loading state
        return error;
      });
  }, [userId]); // Include userId in the dependency array

  // Display loading message while fetching data
    if (loading) {
    return <p>Loading...</p>;
    }

    // Display error message if data fetching fails
    if (error) {
    return <p>{error}</p>;
    }

    function handleUpdateUser() {
      // Check if user data exists
      if (user) {
        // Define the endpoint URL with the dynamic user ID
        const updateUserUrl = `https://dummyjson.com/users/${user.id}`;
    
        // Define the updated user data
        const updatedUserData = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        };
    
        // Send the PUT request to update the user data
        fetch(updateUserUrl, {
          method: 'PUT', // or PATCH
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedUserData)
        })
        .then(res => res.json())
        .then(updatedUser => {
          console.log('User updated successfully:', updatedUser);
          // You can update the state or perform other actions as needed
        })
        .catch(error => {
          console.error('Failed to update user:', error);
        });
      }
    }

    return (
      <div className="flex justify-center items-center">
        <div className="user-card">
          {user && (
            <div className="p-10 max-w-sm bg-white rounded-lg overflow-hidden shadow-lg text-center">
              {/* Use inline style for backgroundImage */}
              <img className="w-full" src={user.image} alt="User" />
              <form className="px-6 py-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                  />
                </div>
                <div className="flex justify-center">
                <button 
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleUpdateUser}
              >
                Update User
              </button>
              <button 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-block"
                    onClick={handleDeleteUser} // Attach onClick event handler for delete
                >
                    Delete User
                </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    );
    
    
  }