import { MultipleRowsWrapper } from "../(components)/FormWrapper";
import { ErrorSection } from "../(components)/ErrorSection";
import { PostSection } from "./postsSection";
import { getPosts, userPost } from "../(mongodb)/getPosts";
import { getPostsPageLimit } from "../(lib)/postLimit";
import { CreatePostSection } from "./postCreationForm";
import { getUserInfo } from "../(mongodb)/user";

const ExplorePage = async ({ searchParams }: { searchParams: { error?: string } }) => {

  const firstPagePosts = await PostsToClient(await getPosts({ page: 1 }));

  const maxPages = await getPostsPageLimit() || 0;

  return (


    <MultipleRowsWrapper>

      {searchParams.error &&
        <ErrorSection path="/explore">

          {searchParams.error}
        </ErrorSection>
      }


      <CreatePostSection />

      <PostSection
        key={1}
        maxPages={maxPages}
        // @ts-ignore (we can't pass Date to client.)
        firstPagePosts={firstPagePosts} />


    </MultipleRowsWrapper>

  )
}





export default ExplorePage;

const PostsToClient = async(userPostArray:userPost[]|null) => {

  return userPostArray
  ?
    await Promise.all(
      userPostArray.map(
        async(post) => (
          {
          ...post,
            _id:post._id.toString(),
            created_at: post.created_at.getTime(),
            avatarURL:(await getUserInfo({username:post.created_by}))?.avatarSrc
          } 
        )
      )
    )
  :userPostArray

}