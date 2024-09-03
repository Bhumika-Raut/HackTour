// import React from 'react'
// import Navbar from './components/Navbar'
// import Home from './components/Home'

// function App() {
//   return (
//     <>
//     <Navbar/>
//     <Home/>
//     </>
//   )
// }

// export default App


import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from './components/Home'


function App() {
  const [theme, setTheme] = useState("light");

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className={theme === "dark" ? "bg-black text-white min-h-screen" : "bg-white text-black min-h-screen"}>
      <Navbar onToggleTheme={toggleTheme} />
      <div className="homepage-content">
        {/* Your homepage content */}
        <Home/>
      </div>
    </div>
  );
}

export default App;

