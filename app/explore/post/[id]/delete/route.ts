import { getMongoClient } from "@/app/(lib)/mongoClient";
import { userObject } from "@/app/(mongodb)/avatarUpload";
import { getSessionDetails } from "@/app/(mongodb)/user";
import { userPost } from "@/app/explore/postDisplay/(mongodb)/getPosts";
import { DeleteResult, ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async( req: NextRequest)=>{
  
  try{

    const userSession = await getSessionDetails();
    if ( ! userSession?._id ){
      throw "Not logged in";
    }
    const request: deletionInfo = await req.json(); 
    const mongoResponse: DeleteResult|undefined = await mongoPostDelete( userSession, new ObjectId( request.postId) );
    
    if ( mongoResponse ){
      if ( mongoResponse.acknowledged ){
        return NextResponse.json({ deleted: true });
      }
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


    const post = await posts.findOne( { _id: postId} ) as unknown as userPost || null;
    if ( post ){

      if ( post.created_by.equals( userSession?._id) ){

        const mongoDeleteResponse = await posts.deleteOne( { _id: postId} );
        revalidatePath('/');
        return mongoDeleteResponse;
      }
      else throw "Unauthorized"
  }
}