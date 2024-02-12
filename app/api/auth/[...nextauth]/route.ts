// import { customUser } from "@/app/api/verification"
import NextAuth, { Session, User } from "next-auth"
import { authOptions } from "./authOptions"

 //pass this like that so that it doesn't create a new client
//for every auth request.


//@ts-ignore
const handler = NextAuth( authOptions );

export { handler as POST, handler as GET }