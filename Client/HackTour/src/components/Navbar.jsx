import React from "react";
import { Link } from "react-router-dom";

function Navbar({ onToggleTheme, theme, user, onSignOut }) {
  const navItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/account">Account</Link>
      </li>
      <li>
        <Link to="/saved">Saved</Link>
      </li>
    </>
  );

  return (
    <div className={`navbar px-20 ${theme === "dark" ? "bg-gray-700" : "bg-black text-white"}`}>
      <div className="navbar-start">
        <Link className="text-2xl font-bold cursor-pointer" to="/">
          HackTour
        </Link>
      </div>
      <div className="navbar-end">
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
          <label className="input input-bordered flex items-center gap-2 mr-4">
            <input type="text" className="grow" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM8.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <label className="swap swap-rotate">
            <input type="checkbox" onChange={onToggleTheme} />
            <svg
              className="swap-off h-8 w-8 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2 0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            <svg
              className="swap-on h-8 w-8 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.21,14.72a.996.996,0,0,0-1.41,0l-1.49,1.49a.996.996,0,0,0,0,1.41,6.004,6.004,0,0,0,0-10.48A.996.996,0,0,0,19.31,5.91l1.49,1.49a.996.996,0,0,0,1.41-1.41l-1.49-1.49a.996.996,0,0,0-1.41,0A8.012,8.012,0,0,0,8.12,8.12a.996.996,0,0,0,1.41,1.41A6.004,6.004,0,0,0,21.21,14.72ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
          </label>
        </div>
        <div className="flex items-center ml-4">
          {user ? (
            <>
             
              <img
                src={user.profileImage} 
                alt="Profile"
                className="h-10 w-10 rounded-full border-2 border-gray-300 object-cover"
              />
              <span className="text-white ml-2">{user.name}</span>
            </>
          ) : (
            <Link to="/account" className="text-white">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
