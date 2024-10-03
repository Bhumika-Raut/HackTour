import React, { useState } from 'react';

function Account() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isSignedUp, setIsSignedUp] = useState(false); // State to track signup status
  const [greeting, setGreeting] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file)); // Create a URL for the selected image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      password,
      profileImage,
    };

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        setGreeting(`Hello ${data.user.name}, nice to meet you!`);
        setIsSignedUp(true);
      } else {
        throw new Error('Signup failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {isSignedUp ? (
        <h2 className="text-2xl">{greeting}</h2> // Display greeting if signed up
      ) : (
        <>
          <h2 className="text-2xl mb-4">Create Account / Signup</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-1">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border rounded p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-1">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border rounded p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="profileImage" className="block mb-1">Profile Image:</label>
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleImageChange}
                className="border rounded p-2 w-full"
              />
            </div>
            {profileImage && (
              <div className="mb-4">
                <img src={profileImage} alt="Profile Preview" className="w-24 h-24 rounded-full" />
              </div>
            )}
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-4 py-2"
            >
              Signup
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Account;
