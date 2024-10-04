import React, { useState } from 'react';

function Account() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [greeting, setGreeting] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setGreeting(`Welcome, ${name}!`);
    setIsSignedUp(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-yellow-300 via-purple-500 to-purple-600">
      <h1 className="text-4xl font-bold text-white mb-4 animate-bounce">Account</h1>
      
      {isSignedUp ? (
        <div className="text-xl text-white mt-4 animate-fadeIn">{greeting}</div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg animate-fadeInSlow max-w-md w-full">
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
          
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Profile Image:</label>
            <input type="file" onChange={handleImageChange} accept="image/*" className="mb-4" />
            {profileImage && (
              <img 
                src={profileImage} 
                alt="Profile Preview" 
                className="h-20 w-20 rounded-full border-2 border-gray-300 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
              />
            )}
          </div>
          
          <button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full transition duration-200 transform hover:scale-105">
            Sign Up / Log In
          </button>
        </form>
      )}
    </div>
  );
}

export default Account;
