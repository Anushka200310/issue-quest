import React from 'react';
import { FaUserPlus, FaPencilAlt, FaCheckSquare, FaChartLine } from 'react-icons/fa';

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
    <section className="py-12 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center py-4 px-2 hover:shadow-lg">
              {step.icon}
              <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
                {step.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;

