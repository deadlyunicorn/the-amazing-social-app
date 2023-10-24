import Link from "next/link";
import { mongoClient } from "../api/mongodb/client";
import { getUserDetails, userObject } from "../api/mongodb/user/user";
import { MultipleRowsWrapper, SimpleMultipleRowsWrapper } from "../lib/components/FormWrapper";
import { ChatSelectorComponent } from "./ChatSelectorComponent";
import { ErrorSection } from "../lib/components/ErrorSection";
import { availableUsersArray } from "./availableUsersArrayPush";
import { withRetry } from "../lib/retry";

const ChatPage = async( {searchParams} : {searchParams: { error?: string }} )=>{

  const authSession = await getUserDetails();

  //@ts-ignore
  const availableUsers: userObject[]|null = await withRetry(availableUsersArray, 2, authSession);

  return (
    <SimpleMultipleRowsWrapper>

      <MultipleRowsWrapper>
      <ChatSelectorComponent availableUsers={availableUsers}/>
      { !authSession && 
        <section className="items-center flex flex-col justify-center">
          <h1><Link href="/login">Login</Link> to start chatting!</h1>    
        </section>
      }
      </MultipleRowsWrapper>
      { searchParams.error &&
        <ErrorSection path="/chat">
          {searchParams.error}    
        </ErrorSection>
      }
    </SimpleMultipleRowsWrapper>
  )
}

export default ChatPage;