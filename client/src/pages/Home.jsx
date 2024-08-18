import React from "react";
import { Link } from "react-router-dom";
import useAuth from "@/store/auth";
import Footer from "@/components/Footer";

const Home = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <section className="relative bg-gray-50 dark:bg-gray-900 overflow-hidden h-auto">
        <div className="container flex flex-col items-center px-5 py-16 mx-auto text-center lg:py-24 md:px-10 lg:px-32 dark:text-gray-50">
          <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl xl:max-w-4xl text-gray-800 dark:text-gray-200">
            Streamline Your GitHub Issue Management with{" "}
            <span className="text-blue-600 dark:text-slate-500">
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
              className="px-10 py-3 text-lg font-semibold rounded-3xl transition-transform transform hover:scale-105 bg-transparent hover:bg-blue-500 hover:text-white dark:bg-transparent dark:text-white dark:hover:bg-slate-700 dark:hover:border-none text-gray-900 border border-blue-500 hover:shadow-lg"
            >
              {isLoggedIn ? "Create" : "Join"}
            </Link>
          </div>
          <img src="/signup.svg" className="w-[50%]" />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
