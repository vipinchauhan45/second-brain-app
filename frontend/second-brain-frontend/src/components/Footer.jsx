import React from "react";

export default function Footer() {
  return (
    <footer className="bg-teal-700 text-white py-8 px-6 sm:px-12 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-6 sm:space-y-0">
        
        {/* Left - Logo and Description */}
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold mb-2">Second Brain</h2>
          <p className="text-sm max-w-xs mx-auto sm:mx-0">
            Capture, organize, and revisit your ideas and content seamlessly.
          </p>
        </div>

        {/* Center - Navigation Links */}
        <nav className="flex space-x-6">
          <a
            href="/"
            className="text-sm hover:text-teal-300 transition"
          >
            Home
          </a>
          <a
            href="/features"
            className="text-sm hover:text-teal-300 transition"
          >
            Features
          </a>
          <a
            href="/about"
            className="text-sm hover:text-teal-300 transition"
          >
            About
          </a>
          <a
            href="/contact"
            className="text-sm hover:text-teal-300 transition"
          >
            Contact
          </a>
        </nav>

        {/* Right - Social Icons (Example with SVG icons) */}
        <div className="flex space-x-4">
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-teal-300 transition"
          >
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M24 4.557a9.94 9.94 0 01-2.828.775 4.932 4.932 0 002.164-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.224.084 4.928 4.928 0 004.6 3.419 9.868 9.868 0 01-6.102 2.104c-.395 0-.788-.023-1.175-.068a13.945 13.945 0 007.557 2.212c9.054 0 14-7.496 14-13.986 0-.21 0-.423-.015-.634A9.936 9.936 0 0024 4.557z" />
            </svg>
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-teal-300 transition"
          >
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 0a12 12 0 00-3.79 23.41c.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.61-4.04-1.61a3.18 3.18 0 00-1.33-1.75c-1.09-.74.08-.73.08-.73a2.52 2.52 0 011.84 1.24 2.56 2.56 0 003.5 1 2.55 2.55 0 01.76-1.6c-2.67-.3-5.47-1.34-5.47-5.94a4.64 4.64 0 011.24-3.22 4.3 4.3 0 01.12-3.18s1-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23a4.3 4.3 0 01.13 3.18 4.63 4.63 0 011.23 3.22c0 4.62-2.8 5.64-5.47 5.94a2.86 2.86 0 01.82 2.22v3.29c0 .32.22.7.82.58A12 12 0 0012 0z" />
            </svg>
          </a>
          {/* Add more social links if needed */}
        </div>
      </div>

      <div className="text-center text-sm text-teal-300 mt-8">
        &copy; {new Date().getFullYear()} Second Brain App. All rights reserved.
      </div>
    </footer>
  );
}
