import { mongoClient } from "@/app/api/mongodb/client";
import { NextRequest } from "next/server";
import zod from "zod"
import bcrypt from "bcrypt"
import { redirect } from "next/navigation";

export const POST = async ( request: NextRequest ) => {


  const client = mongoClient;

  try{

    const credentials:credentials = await request.json();

    const username = await zod
    .string()
    .min(6)
    .max(24)
    .regex(/^[A-Za-z]([A-Za-z0-9\_])+$/g)
    .parseAsync( credentials.username )
    .catch( err => { throw "Invalid username"});
  
    const password = await zod
    .string()
    .min(6)
    .parseAsync( credentials.password )
    .catch( err=> {throw "Invalid password"})
    .then( async( unhashed ) => await bcrypt.hash( unhashed, 16 ))
    .catch( err=> {throw "There was an error proccessing your password, try again"});


    
    const accounts = mongoClient.db('the-amazing-social-app-auth').collection('accounts');
    
    await accounts.insertOne({
      username: username,
      password: password
    })
    redirect(`/login?error=Account created successfully. You can now log in`);
  }
  catch(err){
    redirect(`/register?error=${err}`);
  }
}


type credentials = {
  username:string,
  password:string
}