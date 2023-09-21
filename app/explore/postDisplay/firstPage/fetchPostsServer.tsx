import { getPostsPageLimit } from "../../../(lib)/postLimit";
import { getPosts } from "../(mongodb)/getPosts";
import { PostSectionWrapperWithViewMonitoring } from "./clientComponents/postsSection"
import { userDetailsClient } from "../../page";

export const FetchPostsServer = async ({userDetails}:{userDetails:userDetailsClient|null}) => {

  const maxPages = await getPostsPageLimit() || 0;
  const firstPagePosts =  maxPages > 0 ? await getPosts({ page: 1,explore:true }) : null;

  return (
    <PostSectionWrapperWithViewMonitoring
          //@ts-ignore
          userDetails={userDetails}
          key={1}
          maxPages={maxPages}
          firstPagePosts={firstPagePosts} />
  )
}



