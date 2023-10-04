import { MultipleRowsWrapper } from "../(components)/FormWrapper";
import { ErrorSection } from "../(components)/ErrorSection";
import { CreatePostSection } from "./postCreation/postCreationForm";
import { Suspense } from "react";
import { FetchPostsServer } from "./postDisplay/firstPage/fetchPostsServer";
import { getSessionDetails, userObject } from "../(mongodb)/user";
import { MockPostComponent } from "./postDisplay/firstPage/clientComponents/postComponent/postComponent";
import { ReloadPageComponent } from "./reloadComponent";

const ExplorePage = async ({ searchParams }: { searchParams: { error?: string } }) => {

  const userDetails = userDetailsToClient(await getSessionDetails());

  return (

    <MultipleRowsWrapper>

      {searchParams.error &&
        <ErrorSection path="/explore">

          {searchParams.error}
        </ErrorSection>
      }


      <CreatePostSection userDetails={userDetails} />

      <Suspense fallback={<PostsFallback/>}>

        { searchParams.error 
          ? <ReloadPageComponent/>
          : <FetchPostsServer userDetails={userDetails}/>
        }
        
      </Suspense>


    </MultipleRowsWrapper>

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
  email: string;
  username: string;
  avatarSrc?: string;
  description?: string;
};

const userDetailsToClient = (userDetails:userObject|null): userDetailsClient|null=> {

  if (!userDetails){return null}

  const userDetailsClient  = {...userDetails,_id:userDetails._id.toString()};

  return userDetailsClient;
}