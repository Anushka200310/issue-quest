import React from 'react'
import { Link } from 'react-router-dom';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import useAuth from '@/store/auth';



const Home = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
    <section>
		<div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 dark:text-gray-50">
			<h1 className="text-4xl font-bold leading-none sm:text-6xl xl:max-w-4xl text-gray-700 dark:text-gray-300">Streamline Your GitHub Issue Management with <span className='text-slate-600 dark:text-slate-100'>Issue Quest</span></h1>
			<p className="mt-6 mb-8 text-md md:text-lg sm:mb-12 xl:max-w-3xl dark:text-gray-300">Keep all your project issues in one place, making it easier to track and manage them</p>
			<div className="flex flex-wrap justify-center">
				<button type="button" className="px-8 py-3 m-2 text-lg font-medium rounded-lg border border-blue-950 hover:shadow-xl bg-gray-700 text-white dark:border-gray-500 dark:bg-gray-200 dark:text-gray-700">
          {isLoggedIn ? <Link to='/create'>Create</Link> : <Link to='/signup'>Join</Link>}
        </button>
        <Popover>
          <PopoverTrigger asChild>
            <button type="button" className="px-8 py-3 m-2 text-lg font-extralight border border-gray-600 rounded-lg hover:shadow-xl dark:border-gray-300 dark:text-gray-50">Learn more</button>
          </PopoverTrigger>
      
         <PopoverContent className="w-80">
          <p className='text-zinc-500'>
          dive deeper into the realms of tech, AI, and beyond. Enhance your understanding and stay informed with just a <Link to='/article' className='font-bold'>tap</Link>
          </p>
        </PopoverContent>
        </Popover>
				
			</div>
		</div>
	
	{/* <img src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="w-5/6 mx-auto mb-12 -mt-20 dark:bg-gray-500 rounded-lg shadow-md lg:-mt-40" /> */}
</section>
   
    </>
  )
}

export default Home;