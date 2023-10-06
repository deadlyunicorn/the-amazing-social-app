import { formatDate, formatHours } from "@/app/lib/formatDate";
import Image from "next/image";
import { ChangeProfilePicture } from "./ChangeAvatar";
import { UserDescription } from "./UserDescription";
import { Suspense } from "react";
import { withRetry } from "@/app/lib/retry";
import { userObject } from "@/app/api/mongodb/user/user";
import { getPosts } from "@/app/explore/feed/api/mongodb/getPosts";
import { ImageComponent } from "@/app/lib/components/ImageComponent";
import { DeletePostComponent } from "@/app/explore/feed/components/postComponent/deletePostComponent";
import { PostUserProfileComponent } from "./PostUserProfileComponent";


export const UserInfoComponent = async({ userInfo, ownsProfile }: { userInfo: userObject, ownsProfile: boolean }) => {

  const date = new Date();
  const sampleDescription = "Hello world!";


  return (
    <>
      <section className="grid md:grid-cols-2 gap-x-2 gap-y-4 min-h-[250px]">
        <div className="flex flex-col justify-center">
          <Image
           placeholder="blur"
           blurDataURL="/favicon.svg"
            className="
              rounded-full
              self-center aspect-square object-cover"
            src={userInfo.avatarSrc || '/favicon.svg'}
            width={100}
            height={100}
            alt={`Profile picture of ${userInfo.username}`} />

          {ownsProfile && <ChangeProfilePicture username={userInfo.username} />}


          <div className="flex flex-col">
            <p>{date.getFullYear() - userInfo.age}y.o.</p>
            <p className="self-center text-3xl rotate-2">@{userInfo.username}</p>
          </div>
        </div>

        <div className="text-center relative">
          <h1>Description</h1>
          <UserDescription
            ownsProfile={ownsProfile}
            description={userInfo.description || sampleDescription} />

        </div>




      </section>

      {/* <CreatePostSection userDetails={userDetails}/> */}

      <section className="max-w-xl">
        <h1>Latest Posts</h1>
        <ul className="mt-2">
          <Suspense fallback={<PostsMapFallback/>}>
            {/* <PostsMapFallback/> */}
            <Posts
              ownsProfile={ownsProfile} 
              userInfo={userInfo} />
          </Suspense>
        </ul>
      </section>
    </>

  )
}

const PostsMapFallback = () => {

  const fakePosts = [0,1,2,3,4,5,6,7]

    return fakePosts.map(
      (key) => {

        const randomHeight = Math.random()*200;
        return (

          <li
            style={{height:`${randomHeight}px`}}
            className="
            flex justify-center items-center  
            animate-pulseCustom bg-gradient-to-b from-slate-50 to-slate-200
            min-h-[60px] mt-2
            pt-6 pb-2 px-4 relative
            rounded-sm
            border border-dashed border-black"
            key={key}>

            </li>
        )
      }

    )

}


const Posts = async (
  { userInfo,ownsProfile }: 
  { userInfo: userObject,
    ownsProfile: boolean
  }) => {

  //@ts-ignore
  const posts = await withRetry(getPosts,5,[{ page: 1, userProfile:true, userId : userInfo._id }]).catch(err=>null);

  return (posts && posts.length > 0)

    ? (posts.map(
      (post) => (

        <PostUserProfileComponent 
          key={post._id}  
          ownsProfile={ownsProfile}
          post={post}/>

        
      )

    )
    )
    : <p className="text-center py-4"> No posts found </p>
}