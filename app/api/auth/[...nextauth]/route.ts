// import { customUser } from "@/app/api/verification"
import NextAuth, { Session, User } from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { credentialsProvider, emailProvider, githubProvider, googleProvider } from "./providers";
import { ObjectId } from "mongodb";
import { mongoClient } from "../../mongodb/client";

 //pass this like that so that it doesn't create a new client
//for every auth request.

export const authOptions = {
  //@ts-ignore
  // adapter: MongoDBAdapter( mongoClient, {
    // databaseName: "the-amazing-social-app-auth",
  // } ),
  callbacks:{
    async session({session, token, user }:{ session: Session|undefined, token: string|undefined, user:User|undefined}){
      
      const id = user?.id;

      if ( session && session.user && user){

        return { 
          user :{ 
            ...session.user,
            id: new ObjectId(id)
          },
          expires: session.expires
        }
      }

      return session;
    }
  },
  providers: [ googleProvider, githubProvider, credentialsProvider,  //emailProvider,
  ],
  pages: {
     signIn: '/login',
     signOut: '/account/settings',
     error:  '/login',
     verifyRequest: "/success"
  },
}

//@ts-ignore
const handler = NextAuth( authOptions );

export { handler as POST, handler as GET }