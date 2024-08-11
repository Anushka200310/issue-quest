import useAuth from '@/store/auth';
import { Loader2Icon } from 'lucide-react';

import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const Issue = () => {
  const [error, setError] = useState(false)
  const [issue, setIssue] = useState(null)
  const [loading, setLoading] = useState(false)
  const params = useParams();
  const { API } = useAuth();

  const URL = `${API}/api/post`
  useEffect(() => {
   const fetchIssue = async()=>{
    try {
      setLoading(true)
      const result = await fetch(`${URL}/get/${params.id}`);
      const data = await result.json();
       if(data.success === false){
        setError(true)
        setLoading(false)
        return;
      }
       setIssue(data);
       setLoading(false);
       setError(false);
    } catch (error) {
      setError(true)
      setLoading(false)
    }
    
   }
   fetchIssue();
  }, [params.id])
  
  return (
    <main>
    <div className='flex items-center justify-center flex-col space-y-2'>
      {loading && <p className='flex items-center justify-center mt-[50%] md:mt-[15%] animate-spin dark:text-slate-300'><Loader2Icon /></p>}
      {error && <>
      <p className='flex items-center text-black justify-center mt-[50%] md:mt-[15%] dark:text-slate-300'>Something went wrong...</p>
      <Link to='/' className='px-5 py-2 border border-slate-700 rounded-lg dark:border-slate-300 dark:text-slate-200'>Go to Home</Link>
      </>}
    </div>
    <div>
      {issue && !loading && !error && 
       <div>
        <div className="w-full h-60 relative">
           <img
              src={issue.imageUrls[0]}
               className="w-full h-full object-cover"
            />
        </div>    
              <h1 className='text-4xl mx-4 font-bold my-4 dark:text-slate-400' >
                 {issue.title}
              </h1>
              <p className='mx-4 font-light text-lg mb-4 dark:text-slate-400 max-w-5xl'>{issue.description}</p>
              <button className='py-1 px-5 text-sm bg-green-300 dark:bg-green-400 mx-4 rounded-2xl dark:text-slate-700'>{issue.label}</button>   
        </div>}
    </div>
    </main>
  )
}

export default Issue;