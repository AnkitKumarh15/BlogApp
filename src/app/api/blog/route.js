import { connectDB } from "@/lib/config/db"
import blogModel from "@/lib/models/blogModel";
import { write } from "fs";
const { NextResponse } = require("next/server")
import {writeFile} from 'fs/promises'

const loadDB = async () => {
    await connectDB();

}

loadDB();

// API endpoints to get all blogs
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

// API End point for uploading Blogs
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

    await blogModel.create(blogData);
    console.log("Blog saved")
    
    return NextResponse.json({success : true, msg : "Blog Added"})
}