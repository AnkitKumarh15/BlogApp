import { connectDB } from "@/lib/config/db"
import blogModel from "@/lib/models/blogModel";
const { NextResponse } = require("next/server")
import {writeFile} from 'fs/promises'
const fs = require('fs')

const loadDB = async () => {
    await connectDB();

}

loadDB();

// API endpoints to get all blogs from db
export async function GET(request){

    const blogId = request.nextUrl.searchParams.get("id");
    if(blogId){
        const blog = await blogModel.findById(blogId);
        return NextResponse.json(blog);
    }
    else{
        const blogs = await blogModel.find({});
        return NextResponse.json({blogs})
    }
   
}

// API Endpoint for uploading Blogs to db
export async function POST(req){
    const formData = await req.formData();
    const createdAt = Date.now();

    const image = formData.get('image');
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${createdAt}_${image.name}`; 
    await writeFile(path, buffer);
    const imgUrl = `/${createdAt}_${image.name}`
    
    const blogData = {
        title : `${formData.get('title')}`,
        description : `${formData.get('description')}`,
        category : `${formData.get('category')}`,
        author : `${formData.get('author')}`,
        image : `${imgUrl}`,
        authorImg : `${formData.get('authorImg')}`
    }

    // save blog in db
    await blogModel.create(blogData);
    // console.log("Blog saved")
    
    return NextResponse.json({success : true, msg : "Blog Added"})
}

// API Endpoints to delete blogs

export async function DELETE(req){
    const id = await req.nextUrl.searchParams.get('id');
    const blog = await blogModel.findById(id);
    fs.unlink(`./public${blog.image}`, ()=>{});
    await blogModel.findByIdAndDelete(id);

    return NextResponse.json({msg : "Blog Deleted"});
}