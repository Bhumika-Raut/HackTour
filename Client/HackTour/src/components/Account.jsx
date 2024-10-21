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
      // Reset input fields when user is not logged in
      setName('');
      setPassword('');
      setProfileImage(null);
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file); // Store the file instead of the URL for upload
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
      if (!isLoginMode) {
        formData.append('profileImage', profileImage); // Add image to FormData
      }

      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Set content type for file upload
        }
      });

      const signedInUser = {
        name: response.data.user.name,
        profileImage: isLoginMode ? response.data.user.profileImage : URL.createObjectURL(profileImage), // Create URL for preview
      };
      setUser(signedInUser);
      localStorage.setItem("user", JSON.stringify(signedInUser)); 
      setError(''); 
      if (!isLoginMode) setIsLoginMode(true); // Switch to login mode after successful signup
    } catch (error) {
      console.error('Error:', error.response.data.error);
      setError(error.response.data.error); 
    }
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem("user"); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-300 via-purple-500 to-purple-600">
      <h1 className="text-4xl font-bold text-white mb-4 animate-bounce">{isLoginMode ? 'Login' : 'Sign Up'}</h1>

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
              <input
                type="file"
                onChange={handleImageChange}
                className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
              />
            </div>
          )}

          <div className="mb-4">
            <button 
              type="submit" 
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full transition duration-200 w-full"
            >
              {isLoginMode ? 'Login' : 'Sign Up'}
            </button>
          </div>

          <div className="text-center">
            <button 
              type="button" 
              onClick={() => setIsLoginMode(!isLoginMode)} 
              className="text-purple-500 hover:underline"
            >
              {isLoginMode ? 'Create an account' : 'Already have an account?'}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      )}
    </div>
  );
}

export default Account;
