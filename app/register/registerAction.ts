"use server"
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { getMongoClient } from "../lib/mongoClient";
import { revalidatePath } from "next/cache";
import { getAuthSession, userObject } from "../api/mongodb/user/user";


export const emailRegister = async (formData: FormData) => {

  const email = String(formData.get('email'));
  const password = String(formData.get('password'));

  if (password.length < 6) {
    throw 'Password too short';
  }
  else if (email.length < 12) {
    throw 'Not a valid email';
  }

  
  /*
  await serverActionRegister(supabase, email, password)
    .then(
      async (data) => {
        // const username = data.data.user?.id;
        // await addUserToMongoDB(email,username);


        redirect('/register/success');


      }
    )
    */


}



export const serverActionRegister = async (
  supabaseClient: any,//SupabaseClient<any, "public", any>,
  email: string,
  password: string

) => {

    redirect(`/register?error=${"Not yet implemented"}`)


  // const supabase = supabaseClient;

  // return await supabase.auth.signUp({
  //   email: email,
  //   password: password
  // })
  //   .then(data => {
  //     if (data.error) {
  //       throw data.error.message;
  //     }
  //     else {
  //       return data;
  //     }
  //   })
  //   .catch(
  //     err => {
        // redirect(`/register?error=${er}`)

  //     }
  //   );
}


export const addUserToMongoDB = async (formData: FormData) => {


  const client = getMongoClient();

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
    
    await client.connect();
    const users = client.db('the-amazing-social-app-v3').collection('users');


    if ( authSession.email ) {

      const user: userObject = {
        _id: new ObjectId( authSession.id ),
        email: authSession.email,
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
//    else if ( authSession.username){

// }


    

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

