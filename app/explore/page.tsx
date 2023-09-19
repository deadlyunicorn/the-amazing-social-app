import { MultipleRowsWrapper } from "../(components)/FormWrapper";
import { ErrorSection } from "../(components)/ErrorSection";
import Link from "next/link";
import { PostSection } from "./postsSection";
import { getPosts } from "../(mongodb)/getPosts";
import { getPostsPageLimit } from "../(lib)/postLimit";
import { CreatePostSection } from "./postCreationForm";

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


      <CreatePostSection />


      
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





export default ExplorePage;
