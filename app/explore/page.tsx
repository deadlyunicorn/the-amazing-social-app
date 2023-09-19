import { SubmitButtonClient } from "../(components)/SubmitButtonClient";
import { MultipleRowsWrapper } from "../(components)/FormWrapper";
import { ErrorSection } from "../(components)/ErrorSection";
import { handleCreatePost } from "./createPost";
import { ImageInputOptional } from "../user/updateImage/ImageInput";
import { ResetOnSubmit } from "./ResetOnSubmit";
import Link from "next/link";
import { PostSection } from "./posts";
import { getPosts, userPost } from "../(mongodb)/getPosts";
import { getPostsPageLimit } from "../(lib)/postLimit";

const ExplorePage = async ({ searchParams }: { searchParams: { error?: string } }) => {

  const firstPagePosts = (await getPosts({ page: 1 }))?.map(
    post => (
      {
        comments: post.comments,
        likers: post.likers,
        content: post.content,
        created_by: post.created_by,
        created_at: post.created_at.getTime()
      }

    )
  );

  const maxPages = await getPostsPageLimit()||0;

  return (
    <MultipleRowsWrapper>

      {searchParams.error &&
        <ErrorSection>
          <Link
            href="/explore"
            className="
            text-error-light-reactive
            font-semibold
            absolute top-2 right-5">X</Link>
          {searchParams.error}
        </ErrorSection>
      }

      <section>

        <CreatePost />


      </section>
      
      {[0].map(()=>

        <PostSection 
          key={1}
          maxPages={maxPages}
        // @ts-ignore (we can't pass Date to client.)
          firstPagePosts={firstPagePosts} />
        )
      }



    </MultipleRowsWrapper>

  )
}



const CreatePost = () => {

  const formId = '#postForm';

  return (
    <section>
      <h2>Create a post!</h2>
      {/* add images as well !? */}

      <form
        id={formId}
        action={handleCreatePost}
        className="
        my-2
        flex flex-col 
        items-center gap-y-4">

        <label
          className="text-link hover:cursor-pointer"
          htmlFor="image">Add image</label>
        <ImageInputOptional pixels={200} />


        <ResetOnSubmit formId={formId} />

        <textarea
          required
          minLength={6}
          maxLength={200}
          placeholder="Today on my way to work.."
          className="
          px-2 py-1 rounded-sm
          bg-white bg-opacity-30
          w-full h-36 resize-none"
          name="post" />



        <SubmitButtonClient />
      </form>


    </section>
  )
}

export default ExplorePage;
