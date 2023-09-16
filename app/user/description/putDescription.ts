"use server"

import { putDescription } from "@/app/(mongodb)/description";
import { getUserDetails } from "@/app/(mongodb)/user";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const handleDescriptionForm = async(formData:FormData) => {

  const description = String(formData.get('description'));

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