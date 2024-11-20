import React, { useState, useEffect } from 'react';

function Saved() {
  const [savedData, setSavedData] = useState([]);
  const userId = localStorage.getItem('userId'); // Get the user ID from localStorage

  useEffect(() => {
    if (!userId) {
      alert('Please log in to view saved entities.');
      return;
    }

    // Fetch saved entities for the logged-in user
    fetch(`https://hacktour.onrender.com/saved/${userId}`)
      .then((response) => response.json())
      .then((data) => setSavedData(data))
      .catch((error) => {
        console.error('Error fetching saved data:', error);
      });
  }, [userId]);

  return (
    <div className="max-w-screen-2xl container mx-auto px-16 md:px-20 px-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {savedData.length === 0 ? (
          <p className="text-white">No saved items found.</p>
        ) : (
          savedData.map((item) => (
            <div key={item._id} className="bg-gray-800 p-4 rounded-lg">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover mb-4 rounded" />
              <h2 className="text-xl text-white">{item.name}</h2>
              <p className="text-gray-400">{item.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Saved;
