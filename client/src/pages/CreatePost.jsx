import React, { useState } from 'react'
import useAuth from '@/store/auth';
import { Navigate } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '@/firebase';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const createPost = () => {

    const { isLoggedIn } = useAuth();
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
      imageUrls : [],
      name : '',
      description : '',
      address : '',
      type : 'rent',
      bedrooms : 1,
      bathrooms : 1,
      regularPrice : 50,
      discountPrice : 50,
      offer : false,
      parking : false,
      furnished : false
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);

    console.log(formData);
    

    if(!isLoggedIn){
        return <Navigate to="/signup" />
    }

    const { API, AuthToken, user } = useAuth();

    const URL = `${API}/api/post/create`
    const navigate = useNavigate();

    const handleSubmit = (e)=>{
      if(files.length > 0 && files.length + formData.imageUrls.length < 7){
        setUploading(true)
        setImageUploadError(false)
        const promises = [];

        for (let i = 0; i < files.length; i++) {
          promises.push(storeImage(files[i]));

        }
        Promise.all(promises).then((urls) =>{
          setFormData({...formData, imageUrls : formData.imageUrls.concat(urls)});
          setImageUploadError(false);
          setUploading(false)
        }).catch((err)=>{
          setImageUploadError("Image upload failed (2mb max per image)");
          setUploading(false)
        });
      }else{
        setImageUploadError("You can only upload 6 images per listing");
        setUploading(false)
      }

    };

    const storeImage = async (file)=>{
      return new Promise((resolve, reject) =>{
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`upload is ${progress} % done`);

          },
          (error)=>{
            reject(error);
          },
          ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
              resolve(downloadURL);
            });
          }
        )

      })


    }

    const handleImageRemove = (index) =>{
      setFormData({
        ...formData,
        imageUrls: formData.imageUrls.filter((_, i) => i !== index)
      })

    }

    const handleChange = (e)=>{
      if(e.target.id === 'sale' || e.target.id === 'rent'){
        setFormData({
          ...formData,
          type: e.target.id
        })
      }

      if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
        setFormData({
          ...formData,
          [e.target.id]: e.target.checked
        })
      }

      if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea'){
        setFormData({
          ...formData,
          [e.target.id]: e.target.value
        })
      }

    }

    const handleFormSubmit = async(e) =>{
      e.preventDefault();

      try {
        if(formData.imageUrls.length < 1){
          toast.error("you must upload atleast one image");
        }
        if(formData.regularPrice < formData.discountPrice){
          toast.error("discount price should be lower than the regular price");
        }
        setLoading(true)
        const response = await fetch(URL, {
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json',
            Authorization : AuthToken,
          },
          body : JSON.stringify({
            ...formData,
            userRef: user._id 
          })
        })
        
        if(response.ok ){
          toast.success("listing created successfully");
        }
        const data = await response.json();
        console.log(data)
        setLoading(false)
      //  navigate(`/post/${data._id}`)
        navigate('/article')
      } catch (error) {
        console.log(error)
        setLoading(false)
      }

    }
  return (
    <div className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-center font-semibold text-4xl sm:text-5xl mt-8 text-slate-500 dark:text-slate-300 my-7'>Create Listing</h1>
      <form onSubmit={handleFormSubmit} className='flex flex-col sm:flex-row gap-4'>
       <div className='flex flex-col gap-3 flex-1'>
          <input onChange={handleChange} value={formData.name} type='text' id='name' placeholder='name' className='border border-slate-200 bg-transparent rounded-md p-2' maxLength='62' minLength='10' />
          <textarea onChange={handleChange} value={formData.description} type='text' id='description' placeholder='description...' required className='border border-slate-200 bg-transparent rounded-md p-2' />
          <input onChange={handleChange} value={formData.address} type='text' id='address' placeholder='address' className='border border-slate-200 bg-transparent rounded-md p-2' required />

          <div className='flex gap-4 flex-wrap mt-3'>
            <div className='flex gap-2'>
              <input type='checkbox' id='sale' className='w-4' onChange={handleChange} checked={formData.type === "sale"} />
              <span>Sell</span>
            </div>

            <div className='flex gap-2'>
              <input type='checkbox' id='rent' className='w-4'  onChange={handleChange} checked={formData.type === "rent"} />
              <span>Rent</span>
            </div>

            <div className='flex gap-2'>
              <input type='checkbox' id='parking' className='w-4' onChange={handleChange} checked={formData.parking} />
              <span>Parking spot</span>
            </div>

            <div className='flex gap-2'>
              <input type='checkbox' id='furnished' className='w-4' onChange={handleChange} checked={formData.furnished} />
              <span>Furnished</span>
            </div>

            <div className='flex gap-2'>
              <input type='checkbox' id='offer' className='w-4' onChange={handleChange} checked={formData.offer} />
              <span>Offer</span>
            </div>

          </div>

          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input type="number" id='bedrooms' min='1' max='10' className='p-3 border border-gray-300 rounded-lg dark:bg-transparent dark:border' onChange={handleChange} checked={formData.bedrooms} />
              <p>Beds</p>
            </div>
            <div className='flex items-center gap-2'>
              <input type="number" id='bathrooms' min='1' max='10' className='p-3 border border-gray-300 rounded-lg dark:bg-transparent dark:border' onChange={handleChange} checked={formData.bathrooms} />
              <p>Baths</p>
            </div>

            <div className='flex items-center gap-2'>
              <input type="number" id='regularPrice' min='50' max='100000' className='p-3 border border-gray-300 rounded-lg dark:bg-transparent dark:border' onChange={handleChange} checked={formData.regularPrice}/>
              <div className='flex flex-col items-center'>
              <p>Regular price</p>
              <span className='text-xs'>($ / month)</span>
              </div>
            </div>

            {formData.offer && (
               <div className='flex items-center gap-2'>
               <input type="number" id='discountPrice' min='10' max='70' className='p-3 border border-gray-300 rounded-lg dark:bg-transparent dark:border' onChange={handleChange} checked={formData.discountPrice} />
               <div className='flex flex-col items-center'>
                 <p>Discount price</p>
                 <span className='text-xs'>($ / month)</span>
               </div>
             </div>

            )}

          </div>

        </div>

        <div className='flex flex-col flex-1'>
          <p className='font-semibold mb-3'>Images:
           <span className='font-normal text-gray-600 dark:text-gray-400 ml-2'>The first image will be the cover (max 6)</span>
          </p>

          <div className='flex gap-4'>
            <input onChange={(e)=>setFiles(e.target.files)} type='file' id='images' accept='image/*' multiple className='p-3 w-full border border-gray-300 rounded '/>
            <button onClick={handleSubmit} type='button' className='p-3 border border-green-700 text-green-700 rounded uppercase disabled:opacity-80 hover:shadow-lg'>{uploading ? 'Uploading...' : 'Upload'}</button>
          </div>
          <p className='text-red-700'>{imageUploadError && imageUploadError}</p>
          {
            formData.imageUrls.length > 0 && formData.imageUrls.map((url, index)=>(
              <div key={index} className='flex justify-between p-3 items-center border mt-3'> 
                <img src={url} alt='listing image' className='w-20 h-20 object-contain rounded-lg' />
                <button onClick={()=>handleImageRemove(index)} className='p-3 rounded-lg text-red-700 uppercase hover:opacity-75'>Delete</button>
              </div> 
            ))
          }
          <button disabled={loading || uploading} className='p-3 mt-8 bg-slate-600 text-white rounded-xl uppercase hover:opacity-95 disabled:opacity-80 '>{loading ? 'Creating...' : 'Create listing'}</button>
        </div>

      </form>
      <Toaster />
    </div>
  )
}

export default createPost;