// import { customUser } from "@/app/api/verification"
import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { getMongoClient } from "@/app/lib/mongoClient"
import { credentialsProvider, emailProvider, githubProvider, googleProvider } from "./providers";

export const authOptions = {
  adapter: MongoDBAdapter( getMongoClient().connect(), {
    databaseName: "the-amazing-social-app-auth",
  } ),
  providers: [ googleProvider, githubProvider, emailProvider, credentialsProvider],
  // pages: {
  //    signIn: '/admin/login' //default is /api/auth/signin
  //   },
}

//@ts-ignore
const handler = NextAuth( authOptions );

export { handler as POST, handler as GET }