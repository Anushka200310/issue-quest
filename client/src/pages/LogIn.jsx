import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/store/auth.jsx';
import OAuth from '@/components/OAuth';
import toast, { Toaster } from 'react-hot-toast';

const LogIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const { storeTokenInLS, API, user } = useAuth();

  const URL = `${API}/api/auth/login`;


  const navigate = useNavigate();

  const handleChange =(e)=>{
    setFormData(
      {
        ...formData,
        [e.target.id] : e.target.value,
      }
    );
  }

    const handleSubmit = async(e) => {
      e.preventDefault();
      setLoading(true);
      
      try {
        const res = await fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        console.log(data);
    
        if (res.ok) {
          storeTokenInLS(data.token);
          setLoading(false);
          setFormData({
            email : "",
            password : "",
          });
          console.log("login successful");
          navigate('/');
        }else{
          //throw new Error('Network response was not ok');
          setLoading(false);
          toast.error("invalid credentials");
        }
       
      } catch (error) {
        console.log(error);
      }
    
  }
  return (
    <section >
         <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-14 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-black dark:text-slate-200">
            Log in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-400">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="off"
                  placeholder='example@gmail.com'
                  required
                  onChange={handleChange}
                  className="block w-full bg-transparent rounded-md border-0 py-1.5 px-3 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-400">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="off"
                  placeholder='********'
                  required
                  onChange={handleChange}
                  className="block w-full bg-transparent rounded-md border-0 py-1.5 px-3 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className='flex flex-col'>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? (<>loading...</>) : (<>Log in</>)}
              </button>
              <OAuth />
            </div>
          </form>
          <p className='text-slate-950 mt-4 dark:text-slate-500 '>don't have an account? <Link to='/signup'>Sign up</Link></p>
        </div>
      </div>
      <Toaster />
    </section>
  )
}

export default LogIn;



