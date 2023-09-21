import { getPostsPageLimit } from "../../(lib)/postLimit";
import { getPosts, userPost } from "../../(mongodb)/getPosts";
import { getUserInfo } from "../../(mongodb)/user";
import { PostSection } from "./postsSection"
import { userDetailsClient } from "../page";
import { PostsToClient } from "../[page]/postsProcess";

export const FetchPosts = async ({userDetails}:{userDetails:userDetailsClient|null}) => {

  const firstPagePosts = await getPosts({ page: 1 }).then(async(res)=>res?await PostsToClient(res):null);

  
  const maxPages = await getPostsPageLimit() || 0;

  return (
    <PostSection
          //@ts-ignore
          userDetails={userDetails}
          key={1}
          maxPages={maxPages}
          // @ts-ignore (we can't pass Date to client.)
          firstPagePosts={firstPagePosts} />
  )
}



