import { formatDate, formatHours } from "@/app/lib/formatDate";
import Image from "next/image";

export const MockConversationComponent = ( ) => {

  const currentDate = new Date();
  
  const chatEntries = [
    {
      sender: "cool_user",
      receiver: "wonderful_person",
      created_at: currentDate,
      textContent: 'No wayyy\r\n'
    },
    {
      sender: "wonderful_person",
      receiver: "cool_user",
      created_at: currentDate,
      textContent: "Let's goo!"
    },
    {
      sender: "cool_user",
      receiver: "wonderful_person",
      created_at: currentDate,
      textContent: 'Haha'
    },
    {
      sender: "wonderful_person",
      receiver: "cool_user",
      created_at: currentDate,
      textContent: 'Beautiful'
    },
    {
      sender: "cool_user",
      receiver: "wonderful_person",
      created_at: currentDate,
      textContent: 'Well'
    },
    {
      sender: "wonderful_person",
      receiver: "cool_user",
      created_at: currentDate,
      textContent: 'Time to go to sleep'
    },
    {
      sender: "cool_user",
      receiver: "wonderful_person",
      created_at: currentDate,
      textContent: 'Does this still work?'
    },
    {
      sender: "wonderful_person",
      receiver: "cool_user",
      created_at: currentDate,
      textContent: "Let's find out"
    },
    {
      sender: "cool_user",
      receiver: "wonderful_person",
      created_at: currentDate,
      textContent: 'Hello there!'
    },
    {
      sender: "wonderful_person",
      receiver: "cool_user",
      created_at: currentDate,
      textContent: 'This is a very long messageThis is a very long messageThis is a very long messageThis is a very long messageThis is a very long messageThis is a very long message'
    }
  ];


  return (
    <div className="py-2">
      { 
        chatEntries.length == 0 && 
        
        <p className="text-center text-lg">
          Your messages will appear here
          <br/>This is the beginning of the conversation.  
        </p>
      }

      <ul className="flex flex-col gap-y-4">
        {
        chatEntries.length > 0 &&
        chatEntries.map(
          ( chatEntry, key) => {

          const messageDate = new Date(chatEntry.created_at);
          const userIsSender = chatEntry.sender == "cool_user";
          return (
            <li 
              key={key}
              style={{
                placeSelf: `${userIsSender? "end" :"start"}`,
              }}
              className="place-self-end flex flex-col
              rounded-md gap-y-2
                 bg-white px-4 py-2">

              <div 
                style={{
                  flexDirection: `${userIsSender? "row-reverse" :"row"}`
                }}
                className="flex">
                  <Image
                    style={{
                      placeSelf: `${userIsSender? "end" :"start"}`
                    }}
                    className="object-cover rounded-full h-full flex-shrink-0"
                    width={24}
                    height={24}
                    alt={` ${userIsSender? chatEntry.sender : chatEntry.receiver}'s avatar`} 
                    src={"favicon.svg"}/>
                <p className="mx-2"> {chatEntry.textContent } </p>
              </div>
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