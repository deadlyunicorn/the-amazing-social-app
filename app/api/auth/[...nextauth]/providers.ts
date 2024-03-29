import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import * as sgMail from "@sendgrid/mail"
import { User } from "next-auth"
import { mongoClient } from "../../mongodb/client"
import { ObjectId } from "mongodb"


export const credentialsProvider = CredentialsProvider({

  credentials: {
    username: { label: "username" },
    password: { label: "password", type: "password" }
  },

  async authorize(credentials) {
    
    const user//: customUser |null
    = await fetch ( `${process.env.SERVER_URL}/api/auth/credentials/login`, 
    { 
      method: "POST",
      body: JSON.stringify(credentials),
      cache:"no-cache" //! To be removed after done testing
    })
    .then( async( res ) => { 
      if (res.ok) return await res.json();
      else return null;
    });

    if ( user && user.username) {

      const magicLinkEmail = user.username.includes('@');

      const sessionUser: User = {
        id: user.id,          // required string !!!
        name: user.username+"^"+user.id,  // undefined | null | string
        email: magicLinkEmail? user.username :undefined,     // undefined | null | string
        image: undefined      // undefined | null | string
      }
      return sessionUser;
      
    }
    else if ( user && user.error ){
      throw new Error( user.error );
    }
    else{
      return null;
    }


  },
});

export const googleProvider = GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  async profile ( profile ){

    const email = profile.email;
    
  
      const id = await OAuthGetIDandRegister( String( profile.email ), "gmail" );

      const sessionUser: User = {
        id: String(id),          // required string !!!
        name: String(id),  // undefined | null | string
        email: email,     // undefined | null | string
        image: profile.avatar_url      // undefined | null | string
      }
      return sessionUser;
    }
});

export const githubProvider = GithubProvider({
  clientId: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  async profile ( profile ){

  const email = profile.email;
  

    const id = await OAuthGetIDandRegister( String( profile.email ), "github" );

    const sessionUser: User = {
      id: String(id),          // required string !!!
      name: String(id),  // undefined | null | string
      email: email,     // undefined | null | string
      image: profile.avatar_url      // undefined | null | string
    }
    return sessionUser;
  }

});

/*
export const emailProvider = { //returns only email
  id: "magicLink", 
  type: "email",
  async sendVerificationRequest( {
     identifier: email, url
    }:{ 
      identifier: string, url:string
    }){

    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

    const msg = {
      to: email,
      from: 'notification.deadlyunicorn@gmail.com',
      subject: 'Magic Link for the Social App',
      text: `You requested to sign-in to the Social App via email. You can do so by following this link ${url}. Happy Social-izing.`,
      html: `
      <table style="
        color: #302609;
        width: 100%;
        background-color: #FFD556;
        padding-block: 8px; 
        border-radius: 4px;
        min-height: 600px; 
        height: 100%;">
    
        <tr>
          <td style="width: 20%;"></td>
          
          <td style="text-align: center;">
            You requested to sign-in to the Social App 
            <strong>via email</strong>. 
            <br/>
            <br/>You can do so by following 
            <a
              style="color:rgb(69, 55, 130); text-decoration: underline;"
              target="_blank" 
              href='${url}'>
              this link.
            </a> 
          </td>

          <td style="width: 20%"></td>
        </tr>

        <tr>
          <td></td>

          <td style="text-align: center;">  
            Happy Social-izing.
            <br/>
            <a 
              target="_blank"
              href="https://the-amazing-social.vercel.app">
              <img
              width="24px" 
              src="https://the-amazing-social-app.s3.eu-central-1.amazonaws.com/public/posts/the-amazing-social-app.png"/></td>
            </a>
          </td>

          <td></td>
        </tr>

      </table>`
    };

    await sgMail
      .send(msg)
      .then( () => {
        console.log('Email sent')
      })
  }
}

  Not used as we could use credentials with DB.
  Not removed for legacy/reference reasons.

*/

const OAuthGetIDandRegister = async ( email:string, provider:string ) => {
  
  const accounts = mongoClient.db('the-amazing-social-app-auth').collection('accounts');
  return await accounts.findOne( { email: email} )
  .then( async( mongoRes ) => { 
     if ( mongoRes ){
      if ( mongoRes.provider !== provider ){
        throw "dupe key";
      }
      return mongoRes._id
     }
     else{
      const id = new ObjectId();
      await accounts.insertOne( { 
        _id : id,
        email : email,
        provider: provider
      } );
      return id;
     }
    
    })
}