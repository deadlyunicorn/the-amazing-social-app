"use server"


import { getUserDetails } from "@/app/api/mongodb/user/user";
import { getMongoClient } from "@/app/lib/mongoClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as zod from "zod"

export const changeAge = async( formData: FormData )=>{

  const currentYear = new Date().getFullYear();

  const newAge = await zod
    .number()
    .min( currentYear - 110 )
    .max( currentYear -  18 )
    .parseAsync( +String( formData.get('age') ) )
    .catch( err=>{
      console.log(err)
      redirect(`/account/age?error=${"Invalid year"}`)
    });


  const client = getMongoClient();
  const user = await getUserDetails();

  if ( user ){
    if ( user.age == newAge){
      redirect(`/account/age?error=This is already your age`);
    }
  
    if ( user.ageChanged ){
      redirect(`/account/age?error=You can only update your age once. Contact support if there's an issue.`);
    }
    try{
  
      const users = client.db('the-amazing-social-app-v3').collection('users');
  
      await users.findOneAndUpdate(
        {_id:user._id},
        { $set:{
          age: newAge,
          ageChanged: true
        }}
      );
      revalidatePath('/');
    }
    catch(error){
      if (error === "age used"){
        redirect(`/account/age?error=age is already taken`);
      }
      redirect(`/account/age?error=Failed Updating`);
    }
    finally{
      await client.close();
    }

  }
  else{
    redirect(`/account/age?error=Unauthorized`)
  }

  
}
