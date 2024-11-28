import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

function Account({ user, setUser }) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [likedEntities, setLikedEntities] = useState([]);
    const [error, setError] = useState('');
    const [isSignup, setIsSignup] = useState(true);
    const [welcomeAnimation, setWelcomeAnimation] = useState('slide-in');
    const [animationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);
            fetchLikedEntities(parsedUser.id);
        }
    }, [setUser]);

    useEffect(() => {
        setTimeout(() => {
            setWelcomeAnimation('slide-out');
            setAnimationComplete(true);
        }, 2000);
    }, []);

    const fetchLikedEntities = async (userId) => {
        try {
            const response = await axios.get(
                `https://hacktour.onrender.com/liked-entities/${userId}`
            );
            setLikedEntities(response.data);
        } catch (err) {
            console.error('Error fetching liked entities:', err);
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
                response = await axios.post(
                    'https://hacktour.onrender.com/signup',
                    { name, password }
                );
                const userData = { name, id: response.data.id };
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
            } else {
                response = await axios.post(
                    'https://hacktour.onrender.com/login',
                    { name, password }
                );
                const userData = {
                    name: response.data.user.name,
                    id: response.data.user._id,
                };
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                fetchLikedEntities(userData.id);
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
        setLikedEntities([]);
    };

    if (!animationComplete) {
        return (
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
                initial={{ x: '-100vw' }}
                animate={{ x: '0' }}
                transition={{ duration: 1 }}
            >
                <h1 className="text-white text-4xl md:text-6xl font-bold">HackTour!</h1>
            </motion.div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-t from-black to-gray">
            <h1 className="text-4xl font-bold text-white mb-4">{isSignup ? 'Sign Up' : 'Login'}</h1>

            {user ? (
                <div className="text-center">
                    <h2 className="text-2xl text-white mb-4">Welcome, {user.name}!</h2>
                    <button
                        onClick={handleSignOut}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Logout
                    </button>
                    <div className="mt-6">
                        <h3 className="text-xl font-bold text-white mb-2">Liked Entities:</h3>
                        <ul className="text-white">
                            {likedEntities.map((entity) => (
                                <li key={entity._id} className="mb-2 text-sm font-semibold">{entity.title}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <AuthForm 
                    isSignup={isSignup} 
                    name={name}
                    setName={setName}
                    password={password}
                    setPassword={setPassword}
                    handleSubmit={handleSubmit}
                    error={error}
                    setIsSignup={setIsSignup} 
                />
            )}
        </div>
    );
}

const AuthForm = ({ isSignup, name, setName, password, setPassword, handleSubmit, error, setIsSignup }) => {
    return (
        <form 
            onSubmit={handleSubmit} 
            className="w-80 p-6 rounded-lg shadow-xl space-y-6 relative pb-20 h-[400px] flex flex-col justify-center bg-transparent border-4 border-white text-white transition-all duration-300 hover:shadow-2xl"
        >
            <input
                type="text"
                placeholder ="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 border border-white rounded-md text-white bg-transparent focus:ring-2 focus:ring-gray-400 transition-all duration-300 placeholder-white"
            />
            <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 border border-white rounded-md text-white bg-transparent focus:ring-2 focus:ring-gray-400 transition-all duration-300 placeholder-white"
            />
            <button
                type="submit"
                className="w-full py-2 px-4 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                style={{ borderRadius: '25px' }}
            >
                {isSignup ? 'Sign Up' : 'Log In'}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="text-center mt-2 mb-1">
                {isSignup ? 'Already have an account?' : 'Create a new account'}
                <button
                    type="button"
                    onClick={() => setIsSignup(!isSignup)}
                    className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black text-white w-48 py-2 px-8 transition-all duration-300 hover:bg-gray-800 rounded-t-full shadow-lg"
                >
                    {isSignup ? 'Log In' : 'Sign Up'}
                </button>
            </div>
        </form>
    );
};

export default Account;
