import React, { useState, useEffect } from 'react';

function Saved() {
  const [savedItems, setSavedItems] = useState([]);

  // Get the userId from localStorage (set during signup)
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      alert('Please sign up to view saved items.');
      return;
    }

    const fetchSavedItems = async () => {
      try {
        const response = await fetch('https://hacktour.onrender.com/saved', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }), // Send userId to backend to fetch saved items
        });

        const data = await response.json();

        if (response.ok) {
          setSavedItems(data.savedItems); // Assuming backend sends an array of saved items
        } else {
          alert(`Error fetching saved items: ${data.error}`);
        }
      } catch (err) {
        console.error('Error fetching saved items:', err);
      }
    };

    fetchSavedItems();
  }, [userId]);

  return (
    <div className='max-w-screen-2xl container mx-auto px-16 md:px-20 px-3'>
      <h1 className='text-3xl font-semibold text-white my-6'>Your Saved Items</h1>

      {savedItems.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {savedItems.map((item) => (
            <div key={item._id} className='bg-gray-800 p-6 rounded-lg shadow-lg'>
              <h2 className='text-xl font-semibold mb-2 text-white'>{item.title}</h2>
              <img
                src={item.image}
                alt={item.title}
                className='w-full h-48 object-cover mb-4 rounded-md'
              />
              <p className='text-white'>{item.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-center text-white'>No saved items found.</p>
      )}
    </div>
  );
}

export default Saved;
