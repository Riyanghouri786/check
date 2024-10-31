import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import "./Header.css";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOrderDropdownOpen, setIsOrderDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleOrderDropdownToggle = () => {
    setIsOrderDropdownOpen((prev) => !prev);
  };

  const handleMouseEnter = () => {
    setIsOrderDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOrderDropdownOpen(false);
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="z-10 w-full bg-white shadow-md">
      <div className="container flex items-center justify-between px-4 py-4 mx-auto">
        <div className="text-2xl font-bold text-blue-600">TikTok Services</div>

        <nav className="hidden space-x-6 md:flex">
          {["/", "/services", "/pricing"].map((path) => (
            <Link
              key={path}
              to={path}
              className={`relative ${
                isActiveLink(path) ? "text-blue-600" : "text-gray-700"
              } hover:text-blue-600`}
            >
              {path === "/"
                ? "Home"
                : path.charAt(1).toUpperCase() + path.slice(2)}
              {isActiveLink(path) && (
                <span className="block h-[2px] bg-blue-600 mt-1 w-full"></span>
              )}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={handleOrderDropdownToggle}
              className={`relative ${
                isActiveLink("/order") ? "text-blue-600" : "text-gray-700"
              } hover:text-blue-600`}
            >
              Orders
            </button>
            {(isOrderDropdownOpen || isMobileMenuOpen) && (
              <div className="absolute left-0 z-10 w-48 mt-[2px] bg-white border rounded shadow-lg">
                <Link
                  to="/log" // Use Link here as well
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOrderDropdownOpen(false)}
                >
                  View Orders
                </Link>
                <Link
                  to="/order" // New Link to /order
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOrderDropdownOpen(false)} // Close dropdown on link click
                >
                  New Order
                </Link>
              </div>
            )}
          </div>
        </nav>

        <a
          href="https://wa.me/message/M2E5PU5VHIBBF1"
          className="hidden px-4 py-2 text-white bg-blue-600 rounded md:inline-block hover:bg-blue-700"
        >
          Contact Us
        </a>

        <button
          className="flex items-center text-gray-700 md:hidden"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleMobileMenu}
      ></div>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-30 transform transition-transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="text-xl font-bold text-blue-600">TikTok Services</div>
          <button onClick={toggleMobileMenu} className="text-gray-700">
            <FiX size={24} />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-4">
          {["/", "/services", "/pricing"].map((path) => (
            <Link
              key={path}
              to={path}
              className={`relative ${
                isActiveLink(path) ? "text-blue-600" : "text-gray-700"
              } hover:text-blue-600`}
            >
              {path === "/"
                ? "Home"
                : path.charAt(1).toUpperCase() + path.slice(2)}
              {isActiveLink(path) && (
                <span className="block h-[2px] bg-blue-600 mt-1 w-full"></span>
              )}
            </Link>
          ))}
          <div className="relative">
            <button
              onClick={handleOrderDropdownToggle}
              className={`relative ${
                isActiveLink("/order") ? "text-blue-600" : "text-gray-700"
              } hover:text-blue-600`}
            >
              Orders
            </button>
            {isOrderDropdownOpen && (
              <div className="absolute left-0 z-10 w-48 mt-2 bg-white border rounded shadow-lg">
                <Link
                  to="/log"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOrderDropdownOpen(false)}
                >
                  View Orders
                </Link>
                <Link
                  to="/order"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOrderDropdownOpen(false)}
                >
                  New Order
                </Link>
              </div>
            )}
          </div>
        </nav>
        <Outlet />
      </div>

      <a
        href="https://wa.me/message/M2E5PU5VHIBBF1"
        className="fixed p-3 text-white bg-green-500 rounded-full shadow-lg whatsapp-button bottom-5 right-5 hover:bg-green-600"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size={24} />
      </a>
    </header>
  );
}

export default Header;
