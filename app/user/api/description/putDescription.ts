"use server"

import { getUserDetails } from "@/app/api/mongodb/user/user";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { putDescription } from "./description";

export const handleDescriptionForm = async(formData:FormData) => {

  const description = String(formData.get('description'));
  if (description.length>200){
    throw 'Description too long (max 200 words)'
  }

  const userDetails = await getUserDetails();
  const username= String(userDetails?.username);

  try{
    await putDescription(username,description);
    revalidatePath(`/user/${username}`);
  }
  catch(err){
    redirect(`/user/${username}?error=${err}`);
  }
  
}