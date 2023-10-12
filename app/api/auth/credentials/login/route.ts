import { ObjectId } from "mongodb";
import { mongoClient } from "@/app/api/mongodb/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z as zod } from "zod";
import { accountEntryMagic } from "@/app/api/mongodb/types/AccountEntryMagic";


export const POST = async ( request: NextRequest ) => {


  try{

    const credentials:credentials = await request.json();

    const username = await zod
    .string()
    .min(6)
    // .max(24)
    // .regex(/^[A-Za-z]([A-Za-z0-9\_])+$/g) login with magicLink
    .parseAsync( credentials.username )
    .catch( err => { throw "Invalid username"});
  
    const password = await zod
    .string()
    .min(6)
    .parseAsync( credentials.password )
    .catch( err=> {throw "Invalid password"});


    const accounts = mongoClient
      .db('the-amazing-social-app-auth')
      .collection('accounts');


    switch( username.includes('@') ){

      case true:
        const emailAccount = await accounts.findOne( { email: username }) as unknown as accountEntryMagic | null;

        if ( emailAccount ){
          if ( emailAccount.provider !== "magic"){
            throw `Please login with ${emailAccount.provider}`;
          }
          if ( emailAccount.tokenDetails ){
            if ( emailAccount.tokenDetails.tokenUsed ){
              throw "The link has already been used. Please request a new magic link";
            }
            else if ( emailAccount.tokenDetails.tokenGenerationDate.getTime() + 1800000 < new Date().getTime() ){ //1800000ms == 30 mins
              throw "The token has expired. Please request a new magic link";
            }
            else if ( emailAccount.tokenDetails.tokenValue !== password ){

              throw "Invalid token";
            }

            await accounts.updateOne({
              _id: emailAccount._id
            },{
              $set:{
                tokenDetails:{
                  tokenUsed: true
                }
              }
            })
            const customUser: customUser={
              id: emailAccount._id.toString(),
              username: username,
            };

            return NextResponse.json( customUser );
          }
        }

      case false:
        const usernameAccount = await accounts
        .findOne( { username: username } ) as unknown as adminResult | null
        if (usernameAccount){
      
          //Verify password
          const passwordIsCorrect = await bcrypt
            .compare( password, usernameAccount.password );
    
          if ( passwordIsCorrect ){
    
            const customUser: customUser={
              id: usernameAccount._id.toString(),
              username: username,
            };
    
            return NextResponse.json( customUser );
          }
          throw "Incorrect Password";
        }

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