import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Account({ user, setUser }) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [error, setError] = useState('');
    const [isSignup, setIsSignup] = useState(true); // Toggle between signup and login

    useEffect(() => {
        if (user) {
            setName(user.name);
            setProfileImage(user.profileImage);
        }
    }, [user]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file)); // Preview uploaded image
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !password) {
            setError('Name and password are required.');
            return;
        }

        try {
            let response;
            if (isSignup) {
                // Signup request
                response = await axios.post('https://hacktour.onrender.com/signup', {
                    name,
                    password,
                    profileImage,
                });

                const signedInUser = { name, profileImage };
                setUser(signedInUser);
                localStorage.setItem("user", JSON.stringify(signedInUser));
                setError('');
            } else {
                // Login request
                response = await axios.post('https://hacktour.onrender.com/login', {
                    name,
                    password,
                });

                const loggedInUser = { name: response.data.user.name, profileImage: response.data.user.profileImage };
                setUser(loggedInUser);
                localStorage.setItem("user", JSON.stringify(loggedInUser));
                setError('');
            }
        } catch (error) {
            console.error(isSignup ? 'Sign up error:' : 'Login error:', error.response.data.error);
            setError(error.response.data.error);
        }
    };

    const handleSignOut = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-300 via-purple-500 to-purple-600">
            <h1 className="text-4xl font-bold text-white mb-4 animate-bounce">{isSignup ? 'Sign Up' : 'Login'}</h1>

            {user ? (
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white">Welcome, {user.name}!</h2>
                    {user.profileImage && <img src={user.profileImage} alt="Profile" className="mt-4 rounded-full w-32 h-32" />}
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
                        onClick={handleSignOut}
                    >
                        Sign Out
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {isSignup && (
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Profile Image</label>
                            <input
                                type="file"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                onChange={handleImageChange}
                            />
                        </div>
                    )}

                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            {isSignup ? 'Sign Up' : 'Login'}
                        </button>
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={() => setIsSignup(!isSignup)}
                        >
                            {isSignup ? 'Go to Login' : 'Go to Sign Up'}
                        </button>
                    </div>

                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </form>
            )}
        </div>
    );
}

export default Account;
