import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Account({ user, setUser }) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSignup, setIsSignup] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, [setUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !password) {
            setError('Name and password are required.');
            return;
        }

        try {
            let response;
            if (isSignup) {
                response = await axios.post('https://hacktour.onrender.com/signup', { name, password });
                setUser({ name });
                localStorage.setItem('user', JSON.stringify({ name }));
            } else {
                response = await axios.post('https://hacktour.onrender.com/login', { name, password });
                setUser({ name: response.data.user.name });
                localStorage.setItem('user', JSON.stringify({ name: response.data.user.name }));
            }
            setError('');
        } catch (error) {
            console.error(isSignup ? 'Sign up error:' : 'Login error:', error.response?.data?.error || error.message);
            setError(error.response?.data?.error || 'Something went wrong.');
        }
    };

    const handleSignOut = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-t from-black via-gray-500 to-white">
            <h1 className="text-4xl font-bold text-white mb-4">{isSignup ? 'Sign Up' : 'Login'}</h1>

            {user ? (
                <div className="text-center">
                    <h2 className="text-2xl text-white mb-4">Welcome, {user.name}!</h2>
                    <button
                        onClick={handleSignOut}
                        className="bg-red-500 text-white py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                </div>
            ) : (
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
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">
                        {isSignup ? 'Sign Up' : 'Log In'}
                    </button>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    <button
                        type="button"
                        onClick={() => setIsSignup(!isSignup)}
                        className="text-blue-500 text-sm mt-2"
                    >
                        {isSignup ? 'Already have an account? Log In' : 'Don’t have an account? Sign Up'}
                    </button>
                </form>
            )}
        </div>
    );
}

export default Account;
