import { MultipleRowsWrapper } from "../(components)/FormWrapper";
import { ErrorSection } from "../(components)/ErrorSection";
import { CreatePostSection } from "./postCreation/postCreationForm";
import { Suspense } from "react";
import { FetchPostsServer } from "./postDisplay/firstPage/fetchPostsServer";
import { getSessionDetails, userObject } from "../(mongodb)/user";

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
        
        <FetchPostsServer userDetails={userDetails}/>

      </Suspense>


    </MultipleRowsWrapper>

  )
}


const PostsFallback = () => {

  

  return (

    <section
      className="px-2 w-full h-screen animate-pulse">


      <div className="
        mt-1 mr-2
        bg-sky-100 rounded-2xl
        flex justify-between"/>

    </section>
  )
} 


export default ExplorePage;




export type userDetailsClient =  {
  _id: string;
  age: number;
  email: string;
  username: string;
};

const userDetailsToClient = (userDetails:userObject|null): userDetailsClient|null=> {

  if (!userDetails){return null}

  const userDetailsClient  = {...userDetails,_id:userDetails._id.toString()};
  const { latestPosts , ...result} = userDetailsClient; 

  return result;
}