import React, { useState, useEffect } from 'react';

function Home() {
  const [hackData, setHackData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Simulate logged-in user by fetching userId from localStorage
  const userId = localStorage.getItem('userId');

  const navItems = [
    { id: 1, title: 'Home', link: '/' },
    { id: 2, title: 'About', link: '/about' },
    { id: 3, title: 'Technology', link: '/technology' },
    { id: 4, title: 'Contact', link: '/contact' },
  ];

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
        setHackData(shuffleArray(data));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setHackData([]);
      });
  }, []);

  const handleSave = async (item) => {
    if (!userId) {
      alert('Please sign up to save items.');
      return;
    }

    try {
      const response = await fetch(`https://hacktour.onrender.com/saved/${item._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();

      if (response.ok) {
        alert('Item saved successfully!');
      } else {
        alert(`Error saving item: ${data.error}`);
      }
    } catch (err) {
      console.error('Error in handleSave:', err);
    }
  };

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % navItems.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + navItems.length) % navItems.length);
  };

  return (
    <div className='max-w-screen-2xl container mx-auto px-16 md:px-20 px-3'>
      <div className="relative flex items-center justify-center py-4 bg-gray-900">
        <button onClick={prevSlide} className="text-white mx-4">
          &#10094;
        </button>
        <div className="flex overflow-hidden">
          {navItems.map((item, index) => (
            <div
              key={item.id}
              className={`transition-transform duration-300 ease-in-out ${index === activeIndex ? 'translate-x-0' : 'translate-x-full'}`}
            >
              <a href={item.link} className="text-white mx-2 p-2 hover:bg-gray-700 rounded">
                {item.title}
              </a>
            </div>
          ))}
        </div>
        <button onClick={nextSlide} className="text-white mx-4">
          &#10095;
        </button>
      </div>

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
