import React from 'react';
import { FaUserPlus, FaPencilAlt, FaCheckSquare, FaChartLine } from 'react-icons/fa';
import exploreImage from '../assets/explore-img.png';

const Steps = () => {
  const steps = [
    {
      icon: <FaUserPlus size={40} className="text-blue-500 dark:text-blue-400" />,
      title: 'Sign Up',
      description: 'Create an account in just a few easy steps to get started.',
    },
    {
      icon: <FaPencilAlt size={40} className="text-green-500 dark:text-green-400" />,
      title: 'Create Issues',
      description: 'Start by creating issues for your project with detailed descriptions.',
    },
    {
      icon: <FaCheckSquare size={40} className="text-yellow-500 dark:text-yellow-400" />,
      title: 'Manage & Track',
      description: 'Keep track of your issues, prioritize them, and manage their statuses.',
    },
    {
      icon: <FaChartLine size={40} className="text-purple-500 dark:text-purple-400" />,
      title: 'Analyze Progress',
      description: 'Review analytics to see how your project is progressing and make informed decisions.',
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-950">
      <div className="container px-6 py-10 mx-auto">
        <div className="lg:flex lg:items-center">
          <div className="w-full space-y-12 lg:w-1/2">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-slate-300">
                Explore <br />Issue Quest
              </h1>
              <div className="mt-2">
                <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
                <span className="inline-block w-3 h-1 ml-1 bg-blue-500 rounded-full"></span>
                <span className="inline-block w-1 h-1 ml-1 bg-blue-500 rounded-full"></span>
              </div>
            </div>

            {steps.map((step, index) => (
              <div key={index} className="md:flex md:items-start md:-mx-4">
                <span className="inline-block p-2 rounded-xl md:mx-4">
                  {step.icon}
                </span>
                <div className="mt-4 md:mx-4 md:mt-0">
                  <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
                    {step.title}
                  </h1>
                  <p className="mt-3 text-gray-500 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex lg:items-center lg:w-1/2 lg:justify-center">
            <img
              className="w-[28rem] h-[28rem] object-cover xl:w-[34rem] xl:h-[34rem] rounded-full"
              src={exploreImage}
              alt="Illustration"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;


