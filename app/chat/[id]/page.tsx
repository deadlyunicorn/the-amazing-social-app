import { MultipleRowsWrapper } from "@/app/lib/components/FormWrapper";
import { ChatSelectorComponent } from "../ChatSelectorComponent";
import { mongoClient } from "@/app/api/mongodb/client";
import { getUserDetails, getUserInfo, userObject } from "@/app/api/mongodb/user/user";
import { ObjectId } from "mongodb";


const ChatPage = async( {params}: {params: { id: string }})=>{
  
  const user = getUserDetails();
  const receiver = await getUserInfo({ _id: new ObjectId(params.id) });

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
    
    <section>
      <h1> Conversation with
        <br/> { receiver?.username }
      </h1>
    </section>
    </MultipleRowsWrapper>
  )
}

export default ChatPage;