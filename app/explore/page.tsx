import { MultipleRowsWrapper } from "../(components)/FormWrapper";
import { ErrorSection } from "../(components)/ErrorSection";
import { CreatePostSection } from "./postCreation/postCreationForm";
import { Suspense } from "react";
import { FetchPosts } from "./postDisplay/fetchPosts";

const ExplorePage = async ({ searchParams }: { searchParams: { error?: string } }) => {

  

  return (


    <MultipleRowsWrapper>

      {searchParams.error &&
        <ErrorSection path="/explore">

          {searchParams.error}
        </ErrorSection>
      }


      <CreatePostSection />

      <Suspense fallback={<PostsFallback/>}>
        
        <FetchPosts/>

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

