import React, { useState } from 'react'
import Image from 'next/image'
import { assets } from '../../public/assets'
import Link from 'next/link'
import axios from 'axios';
import { toast } from 'react-toastify';

function Header() {

  const [email, setEmail] = useState("");

  const onSubmitHandler = async(event) =>{
    event.preventDefault(); // when we click on submit button it will not reload the webpage


    const formData = new FormData();
    formData.append("email", email);
    const response = await axios.post('/api/email', formData );
    if(response.data.success){
      toast.success(response.data.msg);
      setEmail("");
    }
    else{
      toast.error(response.data.msg);
      setEmail("");
    }

  }

  return (
    <div className='py-5 px-5 md:px-12 lg:px-28'>
      <div className='flex justify-between'>
        <Link href='/' className='cursor-pointer'>
        <Image src={assets.logo} alt='company logo' width={180} height={100} className='w-[130px] sm:w-auto' />
        </Link>
        <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6  border border-solid border-black shadow-[-7px_7px_0px_#000000]'>Get started <Image src={assets.arrow} alt="Button arrow" width={20} height={20} /> </button>
      </div>
      <div className='text-center my-8'>
        <h1 className='text-3xl sm:text-5xl font-medium'>Latest Blogs</h1>
        <p className='mt-10 max-w-[740px] m-auto text-xs sm:text-base'>A place where ideas flow freely, and insightful stories come to life. Explore articles, tips, and thought-provoking content on a wide range of topics.</p>
        <form onSubmit={onSubmitHandler} className='flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]' action="">
          <input onChange={(event)=>setEmail(event.target.value)} value={email} type="email" placeholder='Enter your email' className='pl-4 outline-none'/>
          <button type='submit' className='border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white'>Subscribe</button>
        </form>
      </div>
    </div>
  )
}

export default Header