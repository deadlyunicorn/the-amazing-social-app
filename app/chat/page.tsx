import { mongoClient } from "../api/mongodb/client";
import { getUserDetails, userObject } from "../api/mongodb/user/user";
import { MultipleRowsWrapper } from "../lib/components/FormWrapper";
import { ChatSelectorComponent } from "./ChatSelectorComponent";

const ChatPage = async()=>{

  const authSession = await getUserDetails();


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
      { !authSession && 
        <section className="items-center flex flex-col justify-center">
          <h1>Login to start chatting!</h1>    
        </section>
      }
    </MultipleRowsWrapper>
  )
}

export default ChatPage;