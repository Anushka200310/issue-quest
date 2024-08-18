
import React from "react";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useAuth from "@/store/auth";
import Footer from "@/components/Footer";

const Home = () => {
  const { isLoggedIn } = useAuth();
  
  return (
    <>
      <section className="relative bg-gray-50 dark:bg-gray-900 overflow-hidden h-screen">
        <div className="container flex flex-col items-center px-5 py-16 mx-auto text-center lg:py-24 md:px-10 lg:px-32 dark:text-gray-50">
          <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl xl:max-w-4xl text-gray-800 dark:text-gray-200">
            Streamline Your GitHub Issue Management with{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Issue Quest
            </span>
          </h1>
          <p className="mt-6 mb-8 text-lg sm:text-xl xl:max-w-3xl text-gray-600 dark:text-gray-400">
            Keep all your project issues in one place, making it easier to track
            and manage them.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to={isLoggedIn ? "/create" : "/signup"}
              className="px-8 py-3 text-lg font-semibold rounded-lg transition-transform transform hover:scale-105 bg-blue-600 text-white dark:bg-blue-500 dark:text-gray-900 border border-transparent hover:shadow-lg"
            >
              {isLoggedIn ? "Create" : "Join"}
            </Link>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="px-8 py-3 text-lg font-medium border border-gray-600 rounded-lg transition-transform transform hover:scale-105 dark:border-gray-300 dark:text-gray-50 hover:shadow-lg dark:hover:shadow-md"
                >
                  Learn More
                </button>
              </PopoverTrigger>

              <PopoverContent className="w-80 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-xl rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">
                  Issue Quest streamlines issue tracking, management, and
                  resolution, providing a seamless and user-friendly experience.{" "}
                  <Link to="/issue-list" className="font-semibold text-blue-600 dark:text-blue-400">
                    Learn more
                  </Link>
                </p>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;

