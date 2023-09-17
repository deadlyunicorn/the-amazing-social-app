"use server"

import { redirect } from "next/navigation";
import { postPost } from "../(mongodb)/postPost";
import { revalidatePath } from "next/cache";

export const handleCreatePost = async(formData:FormData)=>{

  const textContent= formData.get('post');

  try{
    if ( !textContent || textContent.length <6){
      throw "Post too short";
    }
  
    await postPost({textContent:String(textContent)})
    revalidatePath('/explore');
    
  }
  catch (err){
    redirect(`/explore?page=1&error=${err}`);
  }
 
}