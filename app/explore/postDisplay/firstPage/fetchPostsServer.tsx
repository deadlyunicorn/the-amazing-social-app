import { getPostsPageLimit } from "../../../(lib)/postLimit";
import { getPosts } from "../(mongodb)/getPosts";
import { PostSectionWrapperWithViewMonitoring } from "./clientComponents/viewMonitor"
import { userDetailsClient } from "../../page";
import { withRetry } from "@/app/(lib)/retry";

export const FetchPostsServer = async ({userDetails}:{userDetails:userDetailsClient|null}) => {

  const maxPages = await withRetry(getPostsPageLimit, 5,[]) || 0;

  //@ts-ignore
  const firstPagePosts =  maxPages > 0 ? await withRetry(getPosts,5,[{page: 1,explore:true}]) : null;

  return (
    <PostSectionWrapperWithViewMonitoring
          //@ts-ignore
          userDetails={userDetails}
          key={1}
          maxPages={maxPages}
          firstPagePosts={firstPagePosts} />
  )
}



