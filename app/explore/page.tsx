import { MultipleRowsWrapper } from "../(components)/FormWrapper";
import { ErrorSection } from "../(components)/ErrorSection";
import { CreatePostSection } from "./postCreation/postCreationForm";
import { Suspense } from "react";
import { PostsServer } from "./postDisplay/firstPage/fetchPostsServer";
import { getSessionDetails, userObject } from "../(mongodb)/user";
import { ReloadPageComponent } from "./reloadComponent";
import { PostsFallback } from "./fallback";

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
          : <PostsServer userDetails={userDetails}/>
        }
        
      </Suspense>


    </MultipleRowsWrapper>

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
  const { latestPosts , ...result} = userDetailsClient; 

  return result;
}