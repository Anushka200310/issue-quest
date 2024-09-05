import React from 'react';
import { FaRegClipboard, FaSearch, FaChartBar, FaGithub, FaCogs } from 'react-icons/fa';

const Workflow = () => {
  const features = [
    {
      icon: <FaRegClipboard size={40} className="text-blue-600" />,
      title: 'Unify All Your Issues',
      description:
        'View all issues in one place. Track the status and priority to stay on top of your tasks.',
    },
    {
      icon: <FaSearch size={40} className="text-green-600" />,
      title: 'Quick Search and Filter',
      description:
        'Use the search bar to instantly find issues based on keywords or criteria. Edit or delete issues as needed.',
    },
    {
      icon: <FaCogs size={40} className="text-red-600" />,
      title: 'Detailed Issue Tracking',
      description:
        'See exactly when an issue was created or last updated, so you never miss an important detail.',
    },
  ];

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-slate-300 mb-8">
          Optimize Your Workflow with Issue Quest
        </h2>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-12">
          Simplify project issue tracking with powerful features designed to improve your productivity and collaboration.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workflow;
