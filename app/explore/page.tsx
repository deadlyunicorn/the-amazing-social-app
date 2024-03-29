import { MultipleRowsWrapper, SimpleMultipleRowsWrapper } from "../lib/components/FormWrapper";
import { ErrorSection } from "../lib/components/ErrorSection";
import { CreatePostSection } from "./create/postCreationForm";
import { Suspense } from "react";
import { FeedServer } from "./feed/feedServer/feedServer";
import { MockPostComponent } from "./feed/components/postComponent/postComponent";
import { ReloadPageComponent } from "../lib/components/reloadPageComponent";
import { getPostsPageLimit } from "../lib/postLimit";
import { withRetry } from "../lib/retry";
import { FeedClientWithMonitor } from "./feed/feedClientWithMonitor/viewMonitor";
import { getUserDetails, userObject } from "../api/mongodb/user/user";

const ExplorePage = async ({ searchParams }: { searchParams: { error?: string } }) => {

  const userDetails = userDetailsToClient(await getUserDetails());
  const maxPages = await withRetry(getPostsPageLimit, 5,[]).catch(err=>null) || 0;


  return (

    <SimpleMultipleRowsWrapper>

      {searchParams.error &&
        <ErrorSection path="/explore">

          {searchParams.error}
        </ErrorSection>
      }

      <MultipleRowsWrapper>
        <CreatePostSection userDetails={userDetails} />

        <Suspense fallback={<PostsFallback/>}>

          { searchParams.error 
            ? <ReloadPageComponent path="/explore"/>
            : <section
                className="animate-none
                flex flex-col justify-center"
                id="postSection">
                <FeedServer userDetails={userDetails}/>
                <FeedClientWithMonitor 
                  userDetails={userDetails}
                  maxPages={maxPages} />
                
              </section>

            
          }
          
        </Suspense>
      </MultipleRowsWrapper>


    </SimpleMultipleRowsWrapper>

  )
}


const PostsFallback = () => {

  const mockArray = [1,2,3,4,5,6,7,8,9]

  return (

    <section
      className="
      overflow-hidden relative
      px-2 
      w-full 
      h-screen animate-pulse">

      {mockArray.map(
        item=><MockPostComponent key={item}/>

      )}

    </section>
  )
} 


export default ExplorePage;




export type userDetailsClient =  {
  _id: string;
  age: number;
  username: string;
  avatarSrc?: string;
  description?: string;
};

const userDetailsToClient = (userDetails:userObject|null): userDetailsClient|null=> {

  if (!userDetails){return null}

  const userDetailsClient  = {...userDetails,_id:userDetails._id.toString()};

  return userDetailsClient;
}