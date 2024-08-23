import React from "react";
import { Link } from "react-router-dom";
import useAuth from "@/store/auth";

const Hero = () => {
  const { isLoggedIn } = useAuth();
  return (
    <main className="container px-6 py-12 md:py-0 mx-auto">
      <div className="items-center lg:flex">
        <div className="w-full lg:w-1/2">
          <div className="lg:max-w-lg">
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
              Streamline Your GitHub Issue Management
              <br /> with <span className="text-blue-500 ">Issue Quest</span>
            </h1>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Keep all your project issues in one place, making it easier to
              track and manage them.
            </p>

            <Link to={isLoggedIn ? "/create" : "/signup"}>
              <button className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                {isLoggedIn ? "Create" : "Join"}
              </button>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
          <img
            className="w-full h-full lg:max-w-2xl"
            src="/ControlPanel.svg"
            alt="Control-panel.svg"
          />
        </div>
      </div>
    </main>
  );
};

export default Hero;
