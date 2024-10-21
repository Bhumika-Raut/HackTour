import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Account({ user, setUser }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setProfileImage(user.profileImage);
    } else {
      setName('');
      setPassword('');
      setProfileImage(null);
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !password) {
      setError('Name and password are required.');
      return;
    }

    try {
      const url = isLoginMode
        ? 'https://hacktour.onrender.com/login'
        : 'https://hacktour.onrender.com/signup';

      const formData = new FormData();
      formData.append('name', name);
      formData.append('password', password);
      if (!isLoginMode && profileImage) {
        formData.append('profileImage', profileImage);
      }

      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const signedInUser = {
        name: response.data.user.name,
        profileImage: response.data.user.profileImage,
      };
      setUser(signedInUser);
      localStorage.setItem('user', JSON.stringify(signedInUser));
      setError('');
      if (!isLoginMode) setIsLoginMode(true);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred.');
    }
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-300 via-purple-500 to-purple-600">
      <h1 className="text-4xl font-bold text-white mb-4 animate-bounce">
        {isLoginMode ? 'Login' : 'Sign Up'}
      </h1>

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
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
              required
            />
          </div>

          {!isLoginMode && (
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Profile Image:</label>
              <input type="file" onChange={handleImageChange} accept="image/*" />
              {profileImage && (
                <img
                  src={URL.createObjectURL(profileImage)}
                  alt="Profile Preview"
                  className="h-20 w-20 rounded-full border-2 border-gray-300 object-cover mt-4"
                />
              )}
            </div>
          )}

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full transition duration-200"
          >
            {isLoginMode ? 'Login' : 'Sign Up'}
          </button>
          <button
            type="button"
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="mt-2 text-purple-500 hover:underline"
          >
            {isLoginMode ? 'Switch to Sign Up' : 'Switch to Login'}
          </button>
        </form>
      )}
    </div>
  );
}

export default Account;
