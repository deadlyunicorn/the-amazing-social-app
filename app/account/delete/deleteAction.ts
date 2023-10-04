"use server"

import { getMongoClient } from "@/app/(lib)/mongoClient";
import { getSessionDetails } from "@/app/(mongodb)/user";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";


export const deleteAccountAction = async() => {

  const userId = ( await getSessionDetails() )?._id;

  if ( !userId ){
    redirect('/account/delete?error=Not logged in');
  }
  

  const client = getMongoClient();
  const mongoSession = client.startSession();

  
  const database = client.db('the-amazing-social-app');

  const comments = database.collection('comments');
  const posts = database.collection('posts');
  const users = database.collection('users');
  
  try{

    mongoSession.startTransaction();
    
    await users.findOneAndDelete({ //removing user and their details
      _id: userId
    }).then( res => { if ( !res ) throw "User not found" });


    await posts.updateMany( //remove likes
      {
        likers: userId
      },
      { //@ts-ignore
       $pull: {
          likers: userId
       }
      });

    await comments.updateMany( //remove comments
      {
        created_by: userId
      },
      {
        $set:{
          content: "This comment has been removed for privacy concerns.",
          created_by: new ObjectId('000000000000000000000000')
        }
      })

    await posts.updateMany( //remove posts
      {
        created_by: userId
      },
      {
        $set:{
          content: {
            textContent: "This post has been removed for privacy concerns.",
            imageURL: undefined
          },
          created_by: new ObjectId('000000000000000000000000')
        }
      }
    )
    
    await mongoSession.commitTransaction();

  }
  catch( err ){
    console.log(err);
    redirect('/account/delete?error=Failed deleting user.');
  }
  finally{
    await client.close();
    redirect('/');
  }
  

  

}