// import React, { useEffect, useState } from "react";

// function Saved() {
//   const [savedData, setSavedData] = useState([]);

//   useEffect(() => {
//     fetch('https://hacktour.onrender.com/saved')
//       .then(response => response.json())
//       .then(data => {
//         console.log('Saved items:', data);
//         setSavedData(data);
//       })
//       .catch(error => console.error('Error fetching saved items:', error));
//   }, []);

//   return (
//     <div className='max-w-screen-2xl container mx-auto px-16 md:px-20 px-3'>
//       <h1 className='text-3xl font-bold text-center mb-6'>Saved Items</h1>
//       {savedData.length > 0 ? (
//         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
//           {savedData.map((item) => (
//             <div key={item._id} className='bg-gray-800 p-6 rounded-lg shadow-lg'>
//               <h2 className='text-xl font-semibold mb-2 text-white'>{item.title}</h2>
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className='w-full h-48 object-cover mb-4 rounded-md'
//               />
//               <p className='text-white'>{item.description}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className='text-center text-white'>No saved items yet.</p>
//       )}
//     </div>
//   );
// }

// export default Saved;

// import React, { useEffect, useState } from 'react';

// const Saved = ({ userId }) => {
//   const [savedEntities, setSavedEntities] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//       const fetchSavedEntities = async () => {
//           try {
//               const response = await fetch(`https://hacktour.onrender.com/saved/${userId}`);
//               if (!response.ok) {
//                   const errorData = await response.json();
//                   throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.error}`);
//               }
//               const data = await response.json();
//               setSavedEntities(data);
//           } catch (error) {
//               console.error('Failed to fetch saved entities:', error);
//               setError(error.message);
//           }
//       };

//       fetchSavedEntities();
//   }, [userId]);

//   return (
//       <div>
//           <h1>Saved Entities</h1>
//           {error && <p>Error: {error}</p>}
//           <ul>
//               {savedEntities.map(entity => (
//                   <li key={entity._id}>
//                       <h2>{entity.name}</h2>
//                       <p>{entity.description}</p>
//                   </li>
//               ))}
//           </ul>
//       </div>
//   );
// };

// export default Saved;

import React, { useState, useEffect } from 'react';

function Saved() {
  const [savedData, setSavedData] = useState([]);

  useEffect(() => {
    // Fetch saved data from the backend
    fetch('https://hacktour.onrender.com/saved')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched saved data:', data);
        setSavedData(data); // Set the fetched data
      })
      .catch(error => console.error('Error fetching saved data:', error));
  }, []);

  return (
    <div className='max-w-screen-2xl container mx-auto px-16 md:px-20 px-3'>
      <h1 className='text-3xl font-bold text-center mb-6'>SAVED</h1>
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
        <p className='text-center text-white'>Loading...</p>
      )}
    </div>
  );
}

export default Saved;
