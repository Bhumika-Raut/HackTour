import React, { useState, useEffect } from 'react';

function Home({ onSave }) {
  const [hackData, setHackData] = useState([]);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    fetch('https://hacktour.onrender.com/home')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data);
        setHackData(shuffleArray(data));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setHackData([]); 
      });
  }, []);
  

  const handleLike = async (id, index) => {
    try {
      const response = await fetch(`https://hacktour.onrender.com/like/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (response.ok) {
        const updatedData = hackData.map((item, idx) =>
          idx === index ? { ...item, likes: data.likes } : item
        );
        setHackData(updatedData);
      } else {
        console.error('Error updating like:', data.error);
      }
    } catch (err) {
      console.error('Error in handleLike:', err);
    }
  };

  const handleSave = async (item) => {
    try {
      const response = await fetch(`https://hacktour.onrender.com/saved/${item._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (response.ok) {
        console.log('Item saved successfully:', data);
      } else {
        console.error('Error saving item:', data.error);
      }
    } catch (err) {
      console.error('Error in handleSave:', err);
    }
  };

  return (
    <div className='max-w-screen-2xl container mx-auto px-16 md:px-20 px-3'>
      {/* <h1 className='text-3xl font-bold text-center mb-6'>HOME</h1> */}
      {hackData.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-9'>
          {hackData.map((item, index) => (
            <div key={item._id} className='bg-gray-800 p-6 rounded-lg shadow-lg relative'>
              <h2 className='text-xl font-semibold mb-2 text-white'>{item.title}</h2>
              <img
                src={item.image}
                alt={item.title}
                className='w-full h-48 object-cover mb-4 rounded-md'
              />
              <p className='text-white'>{item.description}</p>
              <div className="flex justify-end mt-4 absolute bottom-4 right-4">
                <button onClick={() => handleLike(item._id, index)} className='text-2xl mr-4'>
                  {item.likes || 0} 👍
                </button>
                <button onClick={() => handleSave(item)} className='text-2xl'>
                  ❤️
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-center text-white'>Loading...</p>
      )}
    </div>
  );
}

export default Home;
