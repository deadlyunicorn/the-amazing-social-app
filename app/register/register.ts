"use server"
import { SupabaseClient, createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { MongoClient, ObjectId, ServerApiVersion, Timestamp } from "mongodb";
import { cookies } from "next/headers";
import { supabaseCredentials } from "../(supabase)/global";
import { redirect } from "next/navigation";
import { userObject } from "../(mongodb)/user";


export const emailRegister = async (formData: FormData) => {

  const email = String(formData.get('email'));
  const password = String(formData.get('password'));

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


  const date = new Date();
  const email = String(formData.get('email'));
  const username = String(formData.get('username'));
  const age = date.getFullYear()-Number(formData.get('age'));
  let success = false;

  try {
    await client.connect();

    const users = client.db('the-amazing-social-app').collection('users');

    const userObject: userObject = {
      _id: new ObjectId,
      email: email,
      age: age,
      username: username,
      latestPosts: [{
        created_at: new Timestamp(BigInt(new Date().getTime())),
        postText: "Hello world! I created my profile today."
      }
      ]

    }

    await users.insertOne(userObject)
      .catch(err => { redirect(`/login?error=${err}`) })
    success = true;

  } finally {
    await client.close();

    if (success) {
      redirect(`/user/${username}`);
    }


  }
}

const client = new MongoClient(process.env.MONGODB_URI!, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

