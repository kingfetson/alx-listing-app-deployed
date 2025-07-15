import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">LuxStay</div>
        <nav className="space-x-4 hidden md:flex">
          <a href="#" className="text-gray-700 hover:text-blue-500">Rooms</a>
          <a href="#" className="text-gray-700 hover:text-blue-500">Mansions</a>
          <a href="#" className="text-gray-700 hover:text-blue-500">Countryside</a>
        </nav>
        <div className="space-x-3">
          <input type="text" placeholder="Search..." className="px-2 py-1 border rounded hidden sm:inline" />
          <button className="text-blue-500 font-semibold">Sign in</button>
          <button className="bg-blue-500 text-white px-3 py-1 rounded">Sign up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
