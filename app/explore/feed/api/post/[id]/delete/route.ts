import { getUserDetails, userObject } from "@/app/api/mongodb/user";
import { getMongoClient } from "@/app/lib/mongoClient";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async( req: NextRequest)=>{
  
  try{

    const user = await getUserDetails();
    if ( ! ( user && user._id ) ){
      throw "Not logged in";
    }
    const request: deletionInfo = await req.json(); 
    const mongoResponse = await mongoPostDelete( user, new ObjectId( request.postId) );
    
    if ( mongoResponse ){
        return NextResponse.json({ deleted: true });
    }
    return NextResponse.json({ deleted: false });


  }
  catch(error){
    return NextResponse.json({ deleted: false });
  }
  
}

type deletionInfo = {
    postId: string
}

const mongoPostDelete = async( userSession: userObject , postId: ObjectId ) => {

  const client = getMongoClient();
    const posts = client
      .db('the-amazing-social-app')
      .collection('posts');


    const deleteResult = await posts.findOneAndDelete( { 
      _id: postId, 
      created_by: userSession._id 
        //the previous way I did this was to 
        //find the post and compare the created_by ids
        //and throw a "unauthorized" if they didn't match
    } );
    
    revalidatePath('/');

    if ( deleteResult ){
      return deleteResult;
    } 
    else{
      throw "Unauthorized or Post doesn't exist"
    }
      
}