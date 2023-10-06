"use server"

import { getUserDetails } from "@/app/api/mongodb/user/user";
import { mongoClient } from "@/app/api/mongodb/client";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";


export const deleteAccountAction = async() => {

  const user = await getUserDetails();
  if ( !user ) redirect('/account/delete?error=Unauthrozied');
  const userId = user._id;

  if ( !userId ){
    redirect('/account/delete?error=Not logged in');
  }
  

  const client = mongoClient;
  const mongoSession = client.startSession();

  
  const database = client.db('the-amazing-social-app-v3');

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

    //Auth database
    const authDatabase = client.db('the-amazing-social-app-auth');
    
    const sessions = authDatabase.collection('sessions');
    await sessions.deleteMany({userId: userId});

    const authUsers = authDatabase.collection('users');
    await authUsers.deleteMany({_id: userId});

    const verificationTokens = authDatabase.collection('verification_tokens');
    await verificationTokens.deleteMany({ identifier: user.email });
    
    await mongoSession.commitTransaction();

  }
  catch( err ){
    redirect('/account/delete?error=Failed deleting user.');
  }
  finally{
    redirect('/');
  }
  

  

}