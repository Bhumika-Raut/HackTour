import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Account({ user, setUser }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setProfileImage(user.profileImage);
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !password) {
      setError('Name and password are required.');
      return;
    }

    try {
      const response = await axios.post('https://hacktour.onrender.com/signup', {
        name,
        password,
        profileImage,
      });
      const signedInUser = { name, profileImage };
      setUser(signedInUser);
      localStorage.setItem("user", JSON.stringify(signedInUser)); 
      setError(''); 
    } catch (error) {
      console.error('Sign up error:', error.response.data.error);
      setError(error.response.data.error); 
    }
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem("user"); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-300 via-purple-500 to-purple-600">
      <h1 className="text-4xl font-bold text-white mb-4 animate-bounce">Account</h1>

      {user ? (
        <div className="text-xl text-white mt-4">
          <p>Welcome, {user.name}!</p>
          <img 
            src={user.profileImage} 
            alt="Profile" 
            className="h-20 w-20 rounded-full border-2 border-gray-300 object-cover mt-4"
          />
          <button 
            onClick={handleSignOut} 
            className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-200"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 text-white"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 text-white"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Profile Image:</label>
            <input type="file" onChange={handleImageChange} accept="image/*" />
            {profileImage && (
              <img 
                src={profileImage} 
                alt="Profile Preview" 
                className="h-20 w-20 rounded-full border-2 border-gray-300 object-cover mt-4"
              />
            )}
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}
         
          <button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full transition duration-200">
            Sign Up
          </button>
        </form>
      )}
    </div>
  );
}

export default Account;
