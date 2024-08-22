import useAuth from '@/store/auth';
import React from 'react';
import { Link } from 'react-router-dom';

const Cta = () => {
    const { isLoggedIn } = useAuth();
  return (
    <section className="py-16 bg-slate-200 dark:bg-slate-900">
      <div className="container mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold mb-4 text-slate-700 dark:text-slate-400">Ready to Streamline Your GitHub Issue Management?</h2>
        <p className="text-lg mb-8 text-slate-900 dark:text-slate-400">
          Enhance your workflow and keep your projects on track with <span className='text-slate-700 dark:text-slate-500 font-bold'>Issue Quest</span>. Start your free trial today and see how it can transform the way you manage GitHub issues.
        </p>
        <div className="flex justify-center">
          <Link
            to={isLoggedIn ? "/create" : "/signup"}
            className="px-8 py-3 text-lg font-semibold bg-white text-blue-600 rounded-full shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105"
          >
            Get Started for Free
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cta;
