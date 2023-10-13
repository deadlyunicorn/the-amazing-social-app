import { MultipleRowsWrapper } from "@/app/lib/components/FormWrapper";
import { ChatSelectorComponent } from "../ChatSelectorComponent";
import { mongoClient } from "@/app/api/mongodb/client";
import { getUserDetails, getUserInfo, userObject } from "@/app/api/mongodb/user/user";
import { ObjectId } from "mongodb";
import { SendMessageComponent } from "./ComposeMessage/SendMessageComponent";
import { ConversationComponent } from "./ConversationComponent";
import { ErrorSection } from "@/app/lib/components/ErrorSection";
import { redirect } from "next/navigation";


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

  const receiver = await getUserInfo({ _id: new ObjectId( receiverId ) });

  if ( !receiver  ){
    redirect('/chat');
  }

  const users = mongoClient.db('the-amazing-social-app-v3').collection('users');

  const usersCursor = users.find({});
  const availableUsers: userObject[] = [];

  for await ( const user of usersCursor ){

    const userObject = user as unknown as userObject;
    availableUsers.push( userObject );
  }

  return (
    <MultipleRowsWrapper>

    <ChatSelectorComponent availableUsers={availableUsers}/>
    
    <section className="animate-none">
      <h1 className="text-center"> Conversation with
        <br/> { receiver?.username }
      </h1>
      <ConversationComponent sender={sender} receiver={receiver}/>
      <SendMessageComponent sender={sender} receiver={receiver}/>
      
    </section>

    { searchParams.error &&
      <ErrorSection path={`/chat/${params.id}`}>
        { searchParams.error }
      </ErrorSection> }

    </MultipleRowsWrapper>
  )
}

export default ChatPage;