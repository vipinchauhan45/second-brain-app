// src/components/Header.jsx

import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow-md p-4 sticky top-0 z-5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* App Name */}
        <Link to="/" className="text-2xl font-bold text-teal-500">
          🧠 Second Brain
        </Link>

        {/* Navigation Links */}
        <nav className="space-x-4 hidden md:block">
          <Link
            to="/save"
            className="text-gray-700 hover:text-teal-500 transition font-medium"
          >
            Save Item
          </Link>
          <Link
            to="/my-items"
            className="text-gray-700 hover:text-teal-500 transition font-medium"
          >
            My Items
          </Link>
          <Link
            to="/share"
            className="text-gray-700 hover:text-teal-500 transition font-medium"
          >
            Share Content
          </Link>
        </nav>

        {/* Sign Up Button Only */}
        <div>
          <Link
            to="/signup"
            className="px-4 py-2 border border-white bg-teal-500 text-white rounded-full hover:bg-white hover:text-teal-500 shadow-sm transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}

