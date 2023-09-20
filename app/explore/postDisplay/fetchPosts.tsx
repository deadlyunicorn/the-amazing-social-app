import { getPostsPageLimit } from "../../(lib)/postLimit";
import { getPosts, userPost } from "../../(mongodb)/getPosts";
import { getUserInfo } from "../../(mongodb)/user";
import { PostSection } from "./postsSection"

export const FetchPosts = async () => {

  const firstPagePosts = await PostsToClient(await getPosts({ page: 1 }));

  const maxPages = await getPostsPageLimit() || 0;

  return (
    <PostSection
          key={1}
          maxPages={maxPages}
          // @ts-ignore (we can't pass Date to client.)
          firstPagePosts={firstPagePosts} />
  )
}



const PostsToClient = async(userPostArray:userPost[]|null) => {


  return userPostArray
  ?
    await Promise.all(
      userPostArray.map(
        async(post) => {
          const poster = await getUserInfo({_id:post.created_by});
          
          return {
          ...post,
          created_by : poster?.username,
          _id:post._id.toString(),
          created_at: post.created_at.getTime(),
          avatarURL: poster?.avatarSrc
          } 
        }
      )
      )
  :userPostArray

}