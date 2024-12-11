import { connectDB } from "@/lib/config/db";
import emailModel from "@/lib/models/emailModel";
import { NextResponse } from "next/server";

const loadDB = async ()=>{
    await connectDB();
}

loadDB();
// API endpoint to get all email from db
export async function GET(req){
    const emails = await emailModel.find({});
    return NextResponse.json({emails}) 
}

// API endpoint for send email in db
export async function POST(req){
    const formData = await req.formData();

    const emailData = {
        email : `${formData.get('email')}`,
    }

    // Check if email is already subscribed
    const existingEmail = await emailModel.findOne({email : emailData.email});
    if(existingEmail){
        return NextResponse.json({success: false, msg: "Email already subscribed!"})
    }

    // save email in db
    await emailModel.create(emailData);

    return NextResponse.json({success : true, msg : "Email Subscribed!"})

    
}

// API endpoints to delete the email from db

export async function DELETE(req){
    const id = await req.nextUrl.searchParams.get('id');
    await emailModel.findByIdAndDelete(id);
    return NextResponse.json({success: true ,msg: "Email Deleted"})

}