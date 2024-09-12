import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from './components/Home';
import Saved from "./components/Saved";

function App() {
  const [theme, setTheme] = useState("light");

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <Router>
      <div className={theme === "dark" ? "bg-black text-white min-h-screen" : "bg-white text-black min-h-screen"}>
        <Navbar onToggleTheme={toggleTheme} />
        <div className="homepage-content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/saved" component={Saved} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
