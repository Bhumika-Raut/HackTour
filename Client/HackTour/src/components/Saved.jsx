import React, { useEffect, useState } from "react";

function Saved() {
  const [savedData, setSavedData] = useState([]);

  useEffect(() => {
    fetch('https://hacktour.onrender.com/saved')
      .then(response => response.json())
      .then(data => {
        console.log('Saved items:', data);
        setSavedData(data);
      })
      .catch(error => console.error('Error fetching saved items:', error));
  }, []);

  return (
    <div className='max-w-screen-2xl container mx-auto px-16 md:px-20 px-3'>
      <h1 className='text-3xl font-bold text-center mb-6'>Saved Items</h1>
      {savedData.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {savedData.map((item) => (
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
        <p className='text-center text-white'>No saved items yet.</p>
      )}
    </div>
  );
}

export default Saved;
