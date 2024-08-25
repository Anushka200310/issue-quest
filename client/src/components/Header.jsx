import { CircleDot, User } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useAuth from "@/store/auth";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, user } = useAuth();

  return (
    <nav className="relative bg-white shadow dark:bg-gray-800">
      <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-bold text-xl md:text-2xl flex items-center gap-2">
            Issue Quest <CircleDot className="hidden md:block" />
          </Link>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
              aria-label="toggle menu"
            >
              {!isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div
          className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 ${
            isOpen ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-full"
          } md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center`}
        >
          {isLoggedIn ? (
            <div className="flex flex-col md:flex-row md:mx-6">
              <Link
                className="md:hidden flex items-center gap-2 my-2 text-gray-700 transition-colors duration-300 transform font-bold dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                to="/profile"
              >
                Profile
                <Avatar>
                  <AvatarImage src={user.avatar} alt="pic" />
                  <AvatarFallback>Img</AvatarFallback>
                </Avatar>
              </Link>
              <Link
                className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                to="/"
              >
                Home
              </Link>
              <Link
                className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                to="/issue-list"
              >
                Issues
              </Link>
              <Link
                className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                to="/analytics"
              >
                Analytics
              </Link>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row md:mx-6">
              <Link
                className="my-2 flex items-center gap-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                to="/signup"
              >
                <User />
                Signup
              </Link>
            </div>
          )}

          {isLoggedIn ? (
            <Link to="/profile" className="hidden md:block my-2 mx-4 md:my-0">
              <Avatar>
                <AvatarImage src={user.avatar} alt="picture" />
                <AvatarFallback>Img</AvatarFallback>
              </Avatar>
            </Link>
          ) : null}

          <div className="flex justify-center md:block">
            <ModeToggle className="focus-visible:ring-0" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
