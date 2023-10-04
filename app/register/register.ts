"use server"
import { SupabaseClient, createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { supabaseCredentials } from "../(supabase)/global";
import { redirect } from "next/navigation";
import {  userObject } from "../(mongodb)/user";
import { getMongoClient } from "../(lib)/mongoClient";
import { revalidatePath } from "next/cache";


export const emailRegister = async (formData: FormData) => {

  const email = String(formData.get('email'));
  const password = String(formData.get('password'));

  if (password.length < 6) {
    throw 'Password too short';
  }
  else if (email.length < 12) {
    throw 'Not a valid email';
  }

  const supabase = createServerActionClient(
    { cookies }, supabaseCredentials
  )

  await serverActionRegister(supabase, email, password)
    .then(
      async (data) => {
        // const username = data.data.user?.id;
        // await addUserToMongoDB(email,username);


        redirect('/register/success');


      }
    )


}



export const serverActionRegister = async (
  supabaseClient: SupabaseClient<any, "public", any>,
  email: string,
  password: string

) => {

  const supabase = supabaseClient;

  return await supabase.auth.signUp({
    email: email,
    password: password
  })
    .then(data => {
      if (data.error) {
        throw data.error.message;
      }
      else {
        return data;
      }
    })
    .catch(
      err => {
        redirect(`/register?error=${err}`)
      }
    );
}


export const addUserToMongoDB = async (formData: FormData) => {


  const client = getMongoClient();

  const date = new Date();
  const supabase = createServerActionClient({ cookies }, supabaseCredentials);


  const username = String(formData.get('username'));


  let success = false;

  try {

    const email = String((await supabase.auth.getSession()).data.session?.user.email);
    if (!email) { throw "Not logged in" };

    const regex = /^[A-Za-z]([A-Za-z0-9\_])\w+/g;

    if (username.length < 6) { throw 'Username too short' }
    else if ( username.match(regex)?.length!==1 ) {throw 'Invalid username format'};


    const age = Number(formData.get('age'));
    if (age < 18 || age > 85) { throw "Invalid age" };
    const YOB = date.getFullYear() - age;
    


    await client.connect();

    const users = client.db('the-amazing-social-app').collection('users');

    const userObject: userObject = {
      _id: new ObjectId,
      email: email,
      age: YOB,
      username: username,
      latestPosts: [],
      lastUsernameUpdate: new Date(0)
    }

    await users.insertOne(userObject);
    success = true;
    revalidatePath('/');

  }
  catch(err){
    if (String(err).includes("dup key")){
      redirect(`/user?error=Username already taken`)
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

