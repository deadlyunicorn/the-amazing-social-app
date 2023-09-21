import { getPostsPageLimit } from "../../../(lib)/postLimit";
import { getPosts, userPost } from "../../../(mongodb)/getPosts";
import { PostSectionWrapperWithViewMonitoring } from "./clientComponents/postsSection"
import { userDetailsClient } from "../../page";

export const FetchPostsServer = async ({userDetails}:{userDetails:userDetailsClient|null}) => {

  const maxPages = await getPostsPageLimit() || 0;
  const firstPagePosts =  maxPages > 0 ? await getPosts({ page: 1 }) : null;

  return (
    <PostSectionWrapperWithViewMonitoring
          //@ts-ignore
          userDetails={userDetails}
          key={1}
          maxPages={maxPages}
          // @ts-ignore (we can't pass Date to client.)
          firstPagePosts={firstPagePosts} />
  )
}



