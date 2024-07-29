import React, { useState, useEffect } from 'react'
import useAuth from '@/store/auth';
import { Link, Navigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useRef } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '@/firebase';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { isLoggedIn, user, API, AuthToken } = useAuth();
    const fileRef = useRef(null)
    const [file, setFile] = useState(undefined)
    const [fileper, setFileper] = useState(0)
    const [fileUploadError, setFileUploadError] = useState(false)
    const [formData, setFormData] = useState({})

    const navigate = useNavigate();

    if(!isLoggedIn){
        return <Navigate to="/signup" />
    }

    useEffect(() => {
     if(file){
      handleFileUpload(file);
     } 
    }, [file])

   
    const handleFileUpload = (file)=>{
      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileper(Math.round(progress))
        console.log('upload is ' + progress + '% done');
      },
      

      (error)=>{
        setFileUploadError(true)

      },

      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
          setFormData({...formData, avatar: downloadURL})
        });
      }

      );

    }

    const handleChange = (e)=>{
      setFormData({...formData, [e.target.id]: e.target.value});
      console.log(formData);
    }

    const handleSubmit = async(e)=>{
      e.preventDefault();

      try {
        const res = await fetch(`${API}/api/user/update/${user._id}`, {
          method : "POST",
          headers : {
            'Content-Type' : 'application/json',
            Authorization : AuthToken,
          },
          body : JSON.stringify(formData)
          
        })

        const data = await res.json()
        console.log(data);

        if(res.ok){
          toast.success('Your info updated successfully');
        }
      } catch (error) {
        console.log(error)
      }

    }

    const handleDeleteUser = async()=>{
      try {
        const res = await fetch(`${API}/api/user/delete/${user._id}`, {
          method : "DELETE",
          headers : {
            'Content-Type' : 'application/json',
            Authorization : AuthToken,
          },
        })

        const data = await res.json()

        if(data.clearToken){
          localStorage.removeItem('token');
          navigate("/signup")
        }

       
        // if(res.ok){
        //   navigate("/signup")
        // }
      } catch (error) {
        console.log(error);
      }

    }    

    //firebase storage
    // allow read;
    // allow write: if
    // request.resource.size < 2 * 1024 * 1024 &&
    // request.resource.contentType.matches('image/.*')
  return (
    <>
      <div className='mx-auto'>
        <h1 className='text-3xl sm:text-5xl text-center my-8 tracking-wider text-blue-950 font-bold dark:text-indigo-100'>Profile</h1>
        <form onSubmit={handleSubmit} className='flex flex-col items-center w-full'>

          <input type ='file' onChange={(e)=>setFile(e.target.files[0])} ref={fileRef} hidden accept='image/*' />

         <Avatar className='w-20 sm:w-24 h-20 sm:h-24 mb-6 ' onClick={()=>{fileRef.current.click()}}>
            <Link to='/profile'><AvatarImage src={formData.avatar || user.avatar} alt="profile picture" /></Link>
            <AvatarFallback>Img</AvatarFallback>
         </Avatar>

         <p className='mb-6'>
          {fileUploadError ? (<span>Error image upload</span>) : fileper > 0 && fileper < 100 ? (<span>{`uploading ${fileper}`}</span>) : fileper === 100 ? (<span className='text-green-600'>Image successfully uploaded</span>) : null}
         </p>

         <input defaultValue={user.name} id='name'  type="name" required onChange={handleChange} className='py-2 px-3 border border-slate-500 dark:bg-transparent dark:border-slate-400 dark:text-white rounded-md mb-8 w-[70%] lg:w-[30%] sm:w-[40%]' />
         <input defaultValue={user.email} id='email' type="email" required onChange={handleChange} className='py-2 px-3 dark:bg-transparent dark:text-white border border-slate-600 dark:border-slate-400 rounded-md mb-8 w-[70%] lg:w-[30%] sm:w-[40%]' />

         <button className='border px-6 py-2 rounded-lg hover:bg-violet-500 hover:text-white border-violet-500  dark:hover:border-none dark:hover:bg-violet-500 dark:border-violet-500 dark:bg-transparent dark:text-white w-[70%] lg:w-[30%] sm:w-[40%]'>Update</button>
         <Popover>
         <PopoverTrigger asChild>
         <Button variant='outline' className='border px-6 py-2 mt-3 rounded-lg border-red-500 hover:bg-red-600 hover:text-white dark:border-red-500 dark:hover:bg-red-500 dark:bg-transparent dark:text-white w-[70%] lg:w-[30%] sm:w-[40%]'>Delete account</Button>
         </PopoverTrigger>
         <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Do you want to delete your account?</h4>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-2 items-center gap-4">
              <Button variant='outline' onClick={handleDeleteUser}>Yes</Button>
              <Link to='/' className='border border-input bg-background rounded-md text-center py-2 hover:bg-accent hover:text-accent-foreground'>No</Link>
            </div>
          </div>
        </div>
      </PopoverContent>
      </Popover>
        </form>

        <div className='absolute left-[18%] sm:left-[30%] lg:left-[35%] mt-2'>
          <h2 className='dark:text-indigo-300'><Link to='/logout'>Logout</Link></h2>
        </div>

      </div>
      <Toaster />
    </>
  )
}

export default Profile;