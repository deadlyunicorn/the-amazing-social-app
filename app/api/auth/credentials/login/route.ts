import { ObjectId } from "mongodb";
import { mongoClient } from "@/app/api/mongodb/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z as zod } from "zod";


export const POST = async ( request: NextRequest ) => {


  try{

    const credentials:credentials = await request.json();

    const username = await zod
    .string()
    .min(6)
    .max(24)
    .regex(/^[A-Za-z]([A-Za-z0-9\_])+$/g)
    .parseAsync( credentials.username )
    .catch( err => { throw "Invalid username"});
  
    const password = await zod
    .string()
    .min(6)
    .parseAsync( credentials.password )
    .catch( err=> {throw "Invalid password"});

    const accounts = mongoClient.db('the-amazing-social-app-auth').collection('accounts');

    

    const mongoResult : adminResult | null = await accounts
      .findOne( { username: username } ) as unknown as adminResult | null;

    if (mongoResult){
      
      //Verify password
      const passwordIsCorrect = await bcrypt
        .compare( password, mongoResult.password );

      if ( passwordIsCorrect ){

        const customUser: customUser={
          id: mongoResult._id.toString(),
          username: username,
        }

        return NextResponse.json( customUser );
      }
      throw "Incorrect Password";
    }

    throw "User Not Found";

  }
  catch(err) {
    return NextResponse.json( {error: err} );
  }
}

type credentials = {
  username:string,
  password:string
}

type adminResult = {
  _id : ObjectId,
  username : string,
  password : string
}

export type customUser = {
  id : string,
  username : string,
}