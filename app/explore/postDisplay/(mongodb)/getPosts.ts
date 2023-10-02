"use server"
import { MongoClient, ServerApiVersion, ObjectId, Collection, AggregationCursor } from "mongodb";
import { postLimit } from "../../../(lib)/postLimit";
import { getUserInfo } from "../../../(mongodb)/user";
import { redirect } from "next/navigation";
import { getMongoClient } from "@/app/(lib)/mongoClient";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version




export const getPosts = async (
  query: {
    page: number,
    postsToMatch?: ObjectId[],
    explore?: boolean,
    userProfile?: boolean,
  })
  : Promise<userPostWithAvatar[]> => {

 

  const postsToMatch = query.postsToMatch;

  let pipeline;
  if (query.explore){
    pipeline = getHomePagePipeline(query.page);
  }
  else if (query.userProfile){
    pipeline = getUserProfilePipeline(postsToMatch || []);
  }

    const client = getMongoClient();


    try {
      const posts = client.db('the-amazing-social-app').collection('posts');


      // return await 
      const pipelineResult = posts.aggregate(pipeline) as AggregationCursor<userPost>;
      const userPosts = [];

      for await (const post of pipelineResult) {
        userPosts.push(post);
      }


      return await Promise.all(userPosts.map(
        async (post) => {

          const poster = await getUserInfo({ _id: post.created_by });
          const likers = await Promise.all(
            post.likers.map(
              async (likerID) => await getUserInfo({ _id: likerID })
                .then( user => ({
                  username: user?.username,
                  avatarSrc: user?.avatarSrc,
                }))
            )
          )
          
          return {
            ...post,
            _id: post._id.toString(),
            avatarURL: String(poster?.avatarSrc),
            created_by: String(poster?.username),
            likers: likers.reverse(),
            comments: [] //we will return comments with a different fetch
          }
        }
      ))





    }
    catch (err) {
      console.error('getPosts.ts failed');
      redirect('/explore?error=Network error')
    }
    finally {
      await client.close();
    }
  

}





export type userPost = {
  _id: ObjectId,
  created_by: ObjectId,
  content: {
    textContent: string,
    imageURL?: string
  },
  likers: ObjectId[],
  comments: commentServer[],
  verified: boolean,
  created_at: Date
}

export type commentServer = {
  _id: ObjectId,
  postId: ObjectId,
  created_by: ObjectId,
  content: string,
  created_at: Date,
}

export type commentClient = {
  _id: string,
  postId: string,
  created_by: {
    username: string | undefined,
    avatarSrc: string | undefined
  },
  content: string,
  created_at: Date,
}


export type userPostWithAvatar = {
  _id: string;
  created_by: string;
  content: {
    textContent: string;
    imageURL?: string;
  };
  avatarURL: string
  likers: {
    username: string | undefined,
    avatarSrc: string | undefined
  }[];
  comments: ObjectId[];
  verified: boolean;
  created_at: Date;
}





const getHomePagePipeline = (page: number) => ([
  {
    $match: {
      verified: true,
    }
  },
  { $sort: { "created_at": -1 } },
  { $skip: (page - 1) * postLimit },
  { $limit: postLimit }])

const getUserProfilePipeline = ( postsToMatch: ObjectId[]) => ([
  {
    $match: {
      _id: postsToMatch.length > 0 ? { $in: postsToMatch } : { $exists: false },
    }
  },
  { $sort: { "created_at": -1 } },
  { $limit: 10 }])