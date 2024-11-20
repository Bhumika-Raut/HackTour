import React, { useState, useEffect } from 'react';

function Saved() {
  const [savedItems, setSavedItems] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      alert('Please log in to view your saved items.');
      return;
    }

    fetch(`https://hacktour.onrender.com/saved/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setSavedItems(data);
      })
      .catch((error) => {
        console.error('Error fetching saved items:', error);
      });
  }, [userId]);

  return (
    <div className="max-w-screen-2xl container mx-auto px-16 md:px-20 px-3 mt-9">
      <h2 className="text-3xl font-semibold mb-4 text-white">Your Saved Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedItems.length > 0 ? (
          savedItems.map((item) => (
            <div key={item._id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2 text-white">{item.title}</h2>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <p className="text-white">{item.description}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-white">No saved items found.</p>
        )}
      </div>
    </div>
  );
}

export default Saved;
