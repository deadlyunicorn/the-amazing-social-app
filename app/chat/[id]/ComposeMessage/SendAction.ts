"use server"

import { mongoClient } from "@/app/api/mongodb/client";
import { message } from "@/app/api/mongodb/types/message";
import { getUserDetails } from "@/app/api/mongodb/user/user";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as zod from "zod"

export const sendMessageAction = async( formData: FormData) => {

  const sender = await getUserDetails();
  const receiver = new ObjectId( String( formData.get('receiver') ) );

  if ( !sender || !receiver){
    redirect('/chat?error=Invalid chat');
  }
  const message = await zod
    .string()
    .min(2)
    .max(300)
    .parseAsync( formData.get('message') )
    .catch( ()=> { redirect(`/chat/${receiver.toString()}?error=Invalid message`)})


  const messageEntry : message = {
    _id: new ObjectId(),
    sender: sender?._id,
    receiver: receiver,
    created_at: new Date(),
    textContent: message
  }

  const messages = mongoClient.db('the-amazing-social-app-v3').collection('messages');

  await messages.insertOne( messageEntry );
  revalidatePath(`/chat/`)
}