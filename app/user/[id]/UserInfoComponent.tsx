import { userObject } from "@/app/(mongodb)/user";
import Image from "next/image";


export const UserInfoComponent = ({userInfo}:{userInfo:userObject}) => {
  

  return (
    <>
      <section className="grid grid-cols-2 gap-x-2">
        <div className="flex flex-col justify-center">
          <Image
            className="self-center aspect-square"
            src={'/favicon.svg'}
            width={100}
            height={100}
            alt={`Profile picture of ${userInfo.username}`}/>
          

          <div className="flex flex-col">
            <p className="self-center text-xl">{userInfo.username}</p>
            <p>{userInfo.age}y.o.</p>
          </div>
        </div>

        <div>
          <h3 className="text-center">Description</h3>
          <p>A very cool user description goes here (max 200 words).A very cool user description goes here (max 200 words).A very cool user description goes here (max 200 words).A very cool user description goes here.
          </p>
        </div>

        
        
      </section>

      <section>
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
      
      const postDay = postDate.getDay() < 10 ? '0' + postDate.getDay() :String(postDate.getDay());
      const postMonth = postDate.getMonth() < 10 ?'0' + postDate.getMonth():String(postDate.getMonth());
      const postYear = postDate.getFullYear();

      const formattedDate = `${postDay}/${postMonth}/${postYear}`;

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