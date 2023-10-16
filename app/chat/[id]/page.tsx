import { MultipleRowsWrapper, SimpleMultipleRowsWrapper } from "@/app/lib/components/FormWrapper";
import { ChatSelectorComponent } from "../ChatSelectorComponent";
import { getUserDetails, getUserInfo, userObject } from "@/app/api/mongodb/user/user";
import { ObjectId } from "mongodb";
import { SendMessageComponent } from "./ComposeMessage/SendMessageComponent";
import { ConversationComponent } from "./ConversationComponent";
import { ErrorSection } from "@/app/lib/components/ErrorSection";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MockConversationComponent } from "./MockConversationComponent";
import { Suspense } from "react";
import { availableUsersArray } from "../availableUsersArrayPush";


const ChatPage = async( {params, searchParams}: {params: { id: string }, searchParams: { error?: string}})=>{
  
  const sender = await getUserDetails();
  const paramsId = params.id;


  if ( !sender || ! ( paramsId.length === 48 )  ){
    redirect('/chat');
  }

  const indexOfSenderId = paramsId.indexOf( sender._id.toString() );

  const receiverId = indexOfSenderId === -1
    ? redirect( `/chat/${ sender._id.toString() + paramsId.slice( 24 ) }` )
    : indexOfSenderId === 0
      ? paramsId.slice( 24 )
      : paramsId.slice( 0, 24 )


          
  if ( sender._id.equals( new ObjectId( receiverId ) ) ){
    redirect("/chat");
  };


  const receiver = await getUserInfo({ _id: new ObjectId( receiverId ) });

  if ( !receiver  ){
    redirect('/chat');
  }


  const availableUsers: userObject[] = await availableUsersArray( sender );


  return (
    <SimpleMultipleRowsWrapper>

      <MultipleRowsWrapper>

        <ChatSelectorComponent availableUsers={availableUsers}/>
        
        <section className="animate-none place-self-start">
          <h1 className="text-center"> Conversation with
            <br/> 
            
              <div className="flex justify-center items-center gap-x-2 py-2 group">
              <Link href={`/user/${receiver.username}`}>
                <Image 
                  className="object-cover h-12 rounded-full hidden sm:inline"
                  height={48}
                  width={48}
                  alt={`${receiver.username}'s avatar`}
                  src={receiver.avatarSrc || "/favicon.svg"}/>
              </Link>
              <Link
                className="group-hover:text-blue-400"
                href={`/user/${receiver.username}`}>
                { receiver.username }
              </Link>
              </div>

          </h1>
          <Suspense fallback={<MockConversationComponent/>}>
            <ConversationComponent sender={sender} receiver={receiver}/>
            {/* <MockConversationComponent/> */}
          </Suspense>
          <SendMessageComponent sender={sender} receiver={receiver}/>
          
        </section>

      </MultipleRowsWrapper>

      { searchParams.error &&
        <ErrorSection path={`/chat/${params.id}`}>
          { searchParams.error }
        </ErrorSection> }

    </SimpleMultipleRowsWrapper>
  )
}

export default ChatPage;