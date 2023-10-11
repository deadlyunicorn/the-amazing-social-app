"use server"

import { mongoClient } from "@/app/api/mongodb/client";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt"
import zod from "zod"
import { ObjectId } from "mongodb";
import { userObject } from "@/app/api/mongodb/user/user";

export const registerAction = async( formData: FormData)=> {

  try{

    const username = await zod
    .string()
    .min(6)
    .max(24)
    .regex(/^[A-Za-z]([A-Za-z0-9\_])+$/g)
    .parseAsync( formData.get('username') )
    .catch( () => { throw "Invalid username"})
    .then( res => res.toLowerCase() );
  
    const password = await zod
    .string()
    .min(6)
    .parseAsync( formData.get('password') )
    .catch( () => {throw "Invalid password"})
    .then( async( unhashed:string ) => await bcrypt.hash( unhashed, 16 ))
    .catch( () => {throw "There was an error proccessing your password, try again"});

    
    const YOB = await zod
    .number()
    .min(18)
    .max(110)
    .parseAsync( +String(formData.get('age')) )
    .catch( ( ) => {throw "Invalid age"})
    .then( res => new Date().getFullYear() - res);


    
    const accounts = mongoClient.db('the-amazing-social-app-auth').collection('accounts');
    
    await accounts.findOne({
      username: username
    })
    .then( res => { 
      if (res) throw "Username taken";
     } );

    const userId = new ObjectId();
    await accounts.insertOne({
      _id: userId,
      username: username,
      password: password,
    });

    const users = mongoClient.db('the-amazing-social-app-v3').collection('users');
    const user: userObject = {
      _id: userId,
      age: YOB,
      avatarSrc: undefined,
      username: username,
      lastUsernameUpdate: new Date(0),
      ageChanged: false
    }
    await users.insertOne( user );
  }
  catch(err){
    redirect(`/register?error=${err}`);
  }
  redirect(`/login?error=Account created successfully. You can now log in`);
}


type credentials = {
  username:string,
  password:string
}