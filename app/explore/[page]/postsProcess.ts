import { userPost } from "@/app/(mongodb)/getPosts";
import { getUserInfo } from "@/app/(mongodb)/user";

export const PostsToClient = async(posts:userPost[])=>{


    return await Promise.all(posts.map(async(post)=>{

      const poster = await getUserInfo({_id:post.created_by}) 

      const avatarURL = poster?.avatarSrc;


      return{
          ...post,
          _id:post._id.toString(),
          created_by:poster?.username,
          created_at:post.created_at.getTime(),
          avatarURL:avatarURL,
          likers: await Promise.all(post.likers.map( async( likerID )=>await getUserInfo({_id:likerID}).then(user=>user?.username)))
        }
      }
      ))

}