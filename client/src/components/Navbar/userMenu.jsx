import React, { useState } from 'react';

const UserMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative ml-3">
      <div>
        <button
          onClick={toggleMenu}
          className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white"
        >
          <span className="sr-only">Open user menu</span>
          <img className="h-8 w-8 rounded-full" src={user.avatar} alt="" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
          <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
          <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
          <a href="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
