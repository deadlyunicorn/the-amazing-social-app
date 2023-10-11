
"use server"

import { ObjectId } from "mongodb";
import { mongoClient } from "./client";
import { getAuthSession, userObject } from "./user/user";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addUserToMongoDB = async (formData: FormData) => {


  const client = mongoClient;

  const date = new Date();
  const username = String(formData.get('username'));

  let success = false;
  
  const authSession = await getAuthSession();


  try {


    if ( authSession && ( authSession.email || /* authSession.username ;to be implented) */ true) ){

        const regex = /^[A-Za-z]([A-Za-z0-9\_])\w+/g;

        if ( username.length < 6) throw 'Username too short';
        else if ( username.match(regex)?.length!==1 ) throw 'Invalid username format';

    }
    else{
      throw "Not logged in";
    }
    

    const age = Number(formData.get('age'));
    if (age < 18 || age > 110) { throw "Invalid age" };
    const YOB = date.getFullYear() - age;
    
    const users = client.db('the-amazing-social-app-v3').collection('users');


    //this should only be called when registering with an email.
    if ( authSession.id && authSession.email  ) {

      await users.findOne( { username: username })
      .then( mongoRes => {
        if ( mongoRes ) throw "Username taken";
      })

      const user: userObject = {
        _id: new ObjectId( authSession.id ),
        age: YOB,
        avatarSrc: authSession.image || undefined,
        username: username,
        lastUsernameUpdate: new Date(0),
        ageChanged: false
      }
  
      await users.insertOne(user);
      success = true;
      revalidatePath('/');

    }

  }
  catch(err){
    if (String(err).includes("dup key")){
      redirect("/user?error=Username already taken, \
      or there is already an account with your email, \
      but created with a different provider \
      (e.g. you created you account with Github\
      and there is an account with the same email\
      created with Gmail)");
    }
    redirect(`/user?error=${err}`)
  
  }
  finally {
    await client.close();

    if (success) {
      redirect(`/user/${username}`);
    }


  }
}

