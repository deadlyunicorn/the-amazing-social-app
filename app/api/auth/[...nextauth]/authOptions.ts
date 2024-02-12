import { Session, User } from "next-auth";
import { mongoClient } from "../../mongodb/client";
import { ObjectId } from "mongodb";
import { credentialsProvider, githubProvider, googleProvider } from "./providers";

export const authOptions = {
    //@ts-ignore
    // adapter: MongoDBAdapter( mongoClient, {
      // databaseName: "the-amazing-social-app-auth",
    // } ),
    callbacks:{
      async session({session, token, user }:{ session: Session|undefined, token: string|undefined, user:User|undefined}){
        
        const id =  session?.user?.name?.split('^')[1] || session?.user?.name;
  
        if ( session && session.user && id ){
  
          const accounts = mongoClient.db('the-amazing-social-app-auth').collection('accounts');
          return await accounts.findOne({_id: new ObjectId( id )})
          .then ( res => {
            if ( res ){
              return { 
                user :{ 
                  ...session.user,
                  id: id
                },
                expires: session.expires
              }
            }
            else return null;
          });
          //the above gives us back our sanity after trying to log out the user
          //after deleting their accounts ( willingly )
          
          //it is also a double win, as it automatically logs out the user
          //if e.g. we delete them for their actions.
  
          //the only drawback is performance. 
          //(get the data), hopefully that's fast as we keep the connection open.
  
  
          
        }
        else {
          return null;
        }
  
      },
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