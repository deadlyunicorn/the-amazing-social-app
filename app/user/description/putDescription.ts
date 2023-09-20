"use server"

import { putDescription } from "@/app/(mongodb)/description";
import { getSessionDetails } from "@/app/(mongodb)/user";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const handleDescriptionForm = async(formData:FormData) => {

  const description = String(formData.get('description'));
  if (description.length>200){
    throw 'Description too long (max 200 words)'
  }

  const userDetails = await getSessionDetails();
  const username= String(userDetails?.username);

  try{
    await putDescription(username,description);
    revalidatePath(`/user/${username}`);
  }
  catch(err){
    redirect(`/user/${username}?error=${err}`);
  }
  
}