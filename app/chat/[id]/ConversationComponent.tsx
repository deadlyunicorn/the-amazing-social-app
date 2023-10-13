import { mongoClient } from "@/app/api/mongodb/client"
import { message } from "@/app/api/mongodb/types/message";
import { userObject } from "@/app/api/mongodb/user/user"
import { formatDate, formatHours } from "@/app/lib/formatDate";
import { ObjectId } from "mongodb";
import Image from "next/image";
import { RefreshMessage } from "./RefreshMessages";

export const ConversationComponent = async({sender,receiver}:{
  sender: userObject,
  receiver: userObject
}) => {

  
  const chatEntries: message[] = await getChatEntries( sender._id, receiver._id );


  return (
    <div className="py-2">
      <RefreshMessage/>
      Your messages will appear here
      <ul className="flex flex-col gap-y-4">
        {
        chatEntries.length > 0 &&
        chatEntries.map(
          chatEntry => {

          const messageDate = new Date(chatEntry.created_at);
          const userIsSender = sender._id.equals (new ObjectId(chatEntry.sender));
          return (
            <li 
              key={chatEntry._id.toString()}
              style={{
                placeSelf: `${userIsSender? "end" :"start"}`
              }}
              className="place-self-end flex flex-col">
              <Image
                style={{
                  placeSelf: `${userIsSender? "end" :"start"}`
                }}
                className="object-cover rounded-full h-6"
                width={24}
                height={24}
                alt={` ${userIsSender? sender.username :receiver.username}'s avatar`} 
                src={ userIsSender? ( sender.avatarSrc || "/favicon.svg" ) : receiver.avatarSrc || "favicon.svg" }/>
              <p > {chatEntry.textContent } </p>
              <p 
                 style={{
                  placeSelf: `${userIsSender? "end" :"start"}`
                }}
                className="text-[10px]"> { formatDate( messageDate ) } {formatHours( messageDate ) } </p>
            </li>
          )
          }
        )
        }
      </ul>

    </div>
  )
}

const getChatEntries = async ( sender: ObjectId, receiver: ObjectId) => {
  const messages = mongoClient.db('the-amazing-social-app-v3').collection('messages');
  

  const messageGetPipeline = [
    { 
      $match:{
        sender: {
          $in: [ sender, receiver]
        },
        receiver:{
          $in: [ sender, receiver]
        }
      }
    },
    { $sort: {
      created_at: -1
    }},
    { $limit: 10}
  ]

  const chatEntries:message[] = [];
  const chatEntriesCursor = messages.aggregate(messageGetPipeline);

  for await ( const mongoRes of chatEntriesCursor ){
    const chatEntry = mongoRes as unknown as message;
    chatEntries.unshift( chatEntry );
  }

  return chatEntries;

}