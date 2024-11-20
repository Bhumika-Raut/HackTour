import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Account({ user, setUser }) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [error, setError] = useState('');
    const [isSignup, setIsSignup] = useState(true);  // Toggle between signup and login modes

    // If user is logged in, display their data
    useEffect(() => {
        if (user) {
            setName(user.name);
            setProfileImage(user.profileImage);
        }
    }, [user]);

    // Handle image upload for profile picture
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file));
        }
    };

    // Handle form submission (for both signup and login)
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if name and password are provided
        if (!name || !password) {
            setError('Name and password are required.');
            return;
        }

        try {
            let response;
            if (isSignup) {
                // For signup, handle file upload with FormData
                const formData = new FormData();
                formData.append('name', name);
                formData.append('password', password);
                if (profileImage) {
                    formData.append('profileImage', profileImage);
                }

                response = await axios.post('https://hacktour.onrender.com/signup', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                // Assuming server responds with user data (including profile image URL)
                const signedInUser = { name, profileImage: response.data.profileImage };
                setUser(signedInUser);
                localStorage.setItem('user', JSON.stringify(signedInUser));
                setError('');
            } else {
                // For login, check credentials
                response = await axios.post('https://hacktour.onrender.com/login', { name, password });

                const loggedInUser = { name: response.data.user.name, profileImage: response.data.user.profileImage };
                setUser(loggedInUser);
                localStorage.setItem('user', JSON.stringify(loggedInUser));
                setError('');
            }
        } catch (error) {
            console.error(isSignup ? 'Sign up error:' : 'Login error:', error.response?.data?.error || error.message);
            setError(error.response?.data?.error || 'Something went wrong.');
        }
    };

    // Handle sign out
    const handleSignOut = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-300 via-purple-500 to-purple-600">
            <h1 className="text-4xl font-bold text-white mb-4 animate-bounce">{isSignup ? 'Sign Up' : 'Login'}</h1>

            {user ? (
                // If user is logged in, show profile and logout button
                <div className="text-center">
                    <img
                        src={user.profileImage || 'default-profile.jpg'} // Display profile image
                        alt="Profile"
                        className="w-24 h-24 rounded-full mb-4"
                    />
                    <h2 className="text-2xl text-white">{user.name}</h2>
                    <button
                        onClick={handleSignOut}
                        className="bg-red-500 text-white py-2 px-4 rounded mt-4"
                    >
                        Sign Out
                    </button>
                </div>
            ) : (
                // If no user is logged in, show the signup/login form
                <form onSubmit={handleSubmit} className="w-80 bg-white p-6 rounded-lg shadow-lg">
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 mb-4 rounded"
                    />
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 mb-4 rounded"
                    />
                    {isSignup && (
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="w-full mb-4"
                        />
                    )}
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">
                        {isSignup ? 'Sign Up' : 'Log In'}
                    </button>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                    <p
                        onClick={() => setIsSignup(!isSignup)}
                        className="text-blue-500 mt-4 cursor-pointer"
                    >
                        {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign up"}
                    </p>
                </form>
            )}
        </div>
    );
}

export default Account;
