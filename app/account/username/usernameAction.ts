import { getSessionDetails } from "@/app/api/mongodb/user";
import { getMongoClient } from "@/app/lib/mongoClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as zod from "zod"

export const changeUsername = async( formData: FormData )=>{
  "use server"

  const newUsername = await zod
    .string()
    .min(6)
    .max(30)
    .regex(/^[A-Za-z]([A-Za-z0-9\_])\w+/g)
    .parseAsync(formData.get('username'))
    .catch( err=>{
      redirect(`/account/username?error=${"Invalid Username"}`)
    })
    .then( username => username.toLowerCase() );


  const client = getMongoClient();
  const session = await getSessionDetails();

  if ( session?.username == newUsername){
    redirect(`/account/username?error=${"This is already your username"}`);
  }

  if ( session?.lastUsernameUpdate && session.lastUsernameUpdate.getTime() > new Date().getTime() - 2000000000){
    redirect(`/account/username?error=${"You have already updated your username in the past 20 days"}`);
  }
  try{

    const users = client.db('the-amazing-social-app').collection('users');
    await users.findOne({username:newUsername})
    .then( res => {
      if (res){
        throw "username used"
      }
    })

    await users.findOneAndUpdate(
      {_id:session?._id},
      { $set:{
        username:newUsername,
        lastUsernameUpdate: new Date()
      }}
    );
    revalidatePath('/');
  }
  catch(error){
    if (error === "username used"){
      redirect(`/account/username?error=${"Username is already taken"}`);
    }
    redirect(`/account/username?error=${"Failed Updating"}`);
  }
  finally{
    await client.close();
  }
}
