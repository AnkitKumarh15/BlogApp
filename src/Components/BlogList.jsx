import React, { useState } from 'react'
import { blog_data } from '../../public/assets'
import BlogItem from './BlogItem'

function BlogList() {

    const [menu, setMenu] = useState("All")
  return (
    <div>
      <div className='flex justify-center gap-6 my-10'>
        <button className='bg-black text-white py-1 px-4 rounded-sm'>All</button>
        <button>Technology</button>
        <button>Startup</button>
        <button>Lifestyle</button>
      </div>
      <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>
        {blog_data.map((item, index)=>{
            return <BlogItem key={index} image={item.image} title={item.title} category={item.category} description={item.description} />
        })}
      </div>
    </div>
  )
}

export default BlogList
