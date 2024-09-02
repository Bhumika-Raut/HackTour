import React, { useState, useEffect } from 'react';

function Home() {
  const [hackData, setHackData] = useState(null);

  useEffect(() => {
    fetch('https://hacktour.onrender.com/home')
      .then(response => response.json())
      .then(data => setHackData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className='max-w-screen-2xl container mx-auto md:px-20 px-3'>
      <h1 className='text-3xl font-bold text-center mb-6'>HOME</h1>
      {hackData ? (
        <div className='bg-gray-800 p-6 rounded-lg shadow-lg'>
          <h2 className='text-xl font-semibold mb-2 text-white'>{hackData.title}</h2>
          <img src={hackData.image} alt={hackData.title} className='w-full h-auto mb-4 rounded-md' />
          <p className='text-white'>{hackData.description}</p>
        </div>
      ) : (
        <p className='text-center text-white'>Loading...</p>
      )}
    </div>
  );
}

export default Home;
