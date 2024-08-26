
import { CircleDot } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200 py-6">
      <div className="container mx-auto flex flex-col items-center md:flex-row md:justify-between px-4">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <Link to="/" className="flex items-center md:gap-2 text-2xl font-bold text-blue-950 dark:text-slate-300">
            Issue Quest <CircleDot className="hidden md:block" />
          </Link>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:underline">Terms of Use</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Privacy</a>
            </li>
          </ul>
        </div>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="hover:underline">Github</a>
          </li>
          <li>
            <a href="#" className="hover:underline">LinkedIn</a>
          </li>
          <li>
            <a href="#" className="hover:underline">Twitter</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;

