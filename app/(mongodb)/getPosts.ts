"use server"
import { MongoClient, ServerApiVersion, ObjectId, Collection, AggregationCursor } from "mongodb";
import { postLimit } from "../(lib)/postLimit";
import { getUserInfo } from "./user";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

export type userPostWithAvatar = {
  _id: string;
  created_by: string;
  content: {
    textContent: string;
    imageURL?: string;
  };
  avatarURL: string
  likers: string[];
  comments: comment[];
  verified: boolean;
  created_at: Date;
}



export const getPosts = async (
  query: {
    page: number,
    postsToMatch?: ObjectId[]
  })
  : Promise<userPostWithAvatar[] | null> => {


  const postsToMatch = query.postsToMatch || [];

  const pipeline = [
    {
      $match: {
        verified: true,
        _id: postsToMatch.length > 0 ? { $in: postsToMatch } : { $exists: true },
      }
    },
    { $sort: { "created_at": -1 } },
    { $skip: (query.page - 1) * postLimit },
    { $limit: postLimit }]


  const client = new MongoClient(process.env.MONGODB_URI!, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    serverSelectionTimeoutMS: 500
  });


  try {
    await client.connect();

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
              .then(user => String(user?.username))
          )
        )


        return {
          ...post,
          _id:post._id.toString(),
          avatarURL: String(poster?.avatarSrc),
          created_by: String(poster?.username),
          likers: likers
        }
      }
    ))





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
  likers: ObjectId[], //username array
  comments: comment[],
  verified: boolean,
  created_at: Date
}

type comment = {
  _id: ObjectId,
  author: ObjectId, //username
  comment: string,
  created_at: Date,
  verified: boolean,
}


