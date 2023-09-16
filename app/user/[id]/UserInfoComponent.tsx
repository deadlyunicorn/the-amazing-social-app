import { formatDate } from "@/app/(lib)/formatDate";
import { userObject } from "@/app/(mongodb)/user";
import Image from "next/image";
import { ChangeProfilePicture } from "../updateImage/ImageUploadForm";
import { UserDescription } from "../description/UserDescription";


export const UserInfoComponent = ({userInfo,ownsProfile}:{userInfo:userObject,ownsProfile:boolean}) => {
  
  const date = new Date();
  const sampleDescription = "Hello world!"; 

  

  return (
    <>
      <section className="grid md:grid-cols-2 gap-x-2 gap-y-4 min-h-[250px]">
        <div className="flex flex-col justify-center">
          <Image
          blurDataURL="/favicon.svg"
            className="
              rounded-full
              self-center aspect-square object-cover"
            src={userInfo.avatarSrc||'/favicon.svg'}
            width={100}
            height={100}
            alt={`Profile picture of ${userInfo.username}`}/>

          {ownsProfile&&<ChangeProfilePicture username={userInfo.username}/>}
          

          <div className="flex flex-col">
            <p>{date.getFullYear()-userInfo.age}y.o.</p>
            <p className="self-center text-3xl rotate-2">@{userInfo.username}</p>
          </div>
        </div>

        <div className="text-center relative">
          <h1>Description</h1>
          <UserDescription 
            ownsProfile={ownsProfile}
            description={userInfo.description || sampleDescription}/>   

            


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

