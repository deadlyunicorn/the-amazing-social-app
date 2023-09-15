import { ChangeProfilePicture } from "@/app/(aws)/ImageUploadForm";
import { formatDate } from "@/app/(lib)/formatDate";
import { userObject } from "@/app/(mongodb)/user";
import Image from "next/image";


export const UserInfoComponent = ({userInfo}:{userInfo:userObject}) => {
  
  const date = new Date();

  return (
    <>
      <section className="grid md:grid-cols-2 gap-x-2 gap-y-4">
        <div className="flex flex-col justify-center">
          <Image
            className="self-center aspect-square"
            src={'/favicon.svg'}
            width={100}
            height={100}
            alt={`Profile picture of ${userInfo.username}`}/>

          <ChangeProfilePicture username={userInfo.username}/>
          

          <div className="flex flex-col">
            <p>{userInfo.age}y.o.</p>
            <p className="self-center text-3xl rotate-2">@{userInfo.username}</p>
          </div>
        </div>

        <div className="text-center">
          <h1>Description</h1>
          <p>A very cool user description goes here (max 200 words).A very cool user description goes here (max 200 words).A very cool user description goes here (max 200 words).A very cool user description goes here.
          </p>
        </div>

        
        
      </section>

      <section className="max-w-xl">
        <h1>Posts</h1>
        <ul className="mt-2">
          <PostsMap userInfo={userInfo}/>
        </ul>
      </section>
    </>
    
  )
}




const PostsMap = ({userInfo}:{userInfo:userObject}) => (

  userInfo.latestPosts.map(
    (post,key)=>{

      const postDate = new Date(+post.created_at)

      const formattedDate = formatDate(postDate);
      
      

      return (
      
      <li
        className="
          pt-4 pb-2 px-4 relative
          rounded-sm
          border border-dashed border-black"
        key={key}>
        <div className="text-xs absolute left-2 top-0">
          {`#${key+1}`}
        </div>
        {post.postText}
        <div className="text-xs absolute right-2 top-0">
          {formattedDate}
        </div>
      </li>
      )
    }

    )
)

