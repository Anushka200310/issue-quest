import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="px-4 py-8 mt-2 relative dark:bg-gray-800 dark:text-gray-200">
	<div className="container bottom-0 flex flex-wrap items-center justify-center mx-auto space-y-4 sm:justify-between sm:space-y-0">
		<div className="flex flex-row pr-3 space-x-4 sm:space-x-8">
			<div className='p-5 text-2xl text-blue-950 font-extralight dark:text-indigo-200'><Link to='/'>TechFeed</Link></div>
			<ul className="flex flex-wrap items-center space-x-4 sm:space-x-8">
				<li>
					<a href="#">Terms of Use</a>
				</li>
				<li>
					<a href="#">Privacy</a>
				</li>
			</ul>
		</div>
		<ul className="flex flex-wrap pl-3 space-x-4 sm:space-x-8">
			<li>
				<a href="#">Instagram</a>
			</li>
			<li>
				<a href="#">Facebook</a>
			</li>
			<li>
				<a href="#">Twitter</a>
			</li>
		</ul>
	</div>
</footer>

  )
}

export default Footer;