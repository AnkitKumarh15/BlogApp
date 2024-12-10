import { connectDB } from "@/lib/config/db"
import blogModel from "@/lib/models/blogModel";
import { write } from "fs";
const { NextResponse } = require("next/server")
import {writeFile} from 'fs/promises'

const loadDB = async () => {
    await connectDB();

}

loadDB();

export async function GET(req){

    return NextResponse.json({msg: "API Working"})
}

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