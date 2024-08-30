import React from 'react'
import Navbar from './Navbar'
import Home from './Home';

function homeNav() {
  return (
    <>
        <Navbar/>
        <div className='min-h-screen'>
        <Home/>
        </div>
    </>
  );
}

export default homeNav