"use server"
import { redirect } from "next/navigation";
import * as zod from "zod";
import { mongoClient } from "../api/mongodb/client";
import { accountEntryMagic } from "../api/mongodb/types/AccountEntryMagic";
import * as bcrypt from "bcrypt";
import * as sgMail from "@sendgrid/mail"
import { ObjectId } from "mongodb";

export const magicLinkAction = async( formData: FormData) => {

  let success = false;
  try{
    const email = await zod
    .string()
    .email()
    .parseAsync( formData.get('email') )
    .catch( err => {
      throw "Invalid email";
    });

    const accounts = mongoClient
      .db('the-amazing-social-app-auth')
      .collection('accounts');

    const currentTime = new Date();
    const randomHash = await bcrypt.hash( String(currentTime), 1 );


    accounts.findOne({ email: email})
      .then( async( res ) => {
      
        const mongoRes = res as unknown as accountEntryMagic;

        if ( mongoRes ){
          
          if (  mongoRes.provider !== "magic"){
            throw `Email is connected with ${mongoRes.provider}. Please login with that provider`
          }


          await accounts.updateOne({ email: email},{
            $set: {
              tokenDetails:{
                tokenValue: randomHash,
                tokenUsed: false,
                tokenGenerationDate: currentTime
              }
            }
          })
        }
        else{

          const id = new ObjectId();

          const magicLinkAccount: accountEntryMagic = {
            _id: id,
            email: email,
            provider: "magic",
            tokenDetails:{
              tokenValue: randomHash,
              tokenUsed: false,
              tokenGenerationDate: currentTime
            }
          };

          await accounts.insertOne( magicLinkAccount );
        }
      });
      
      await sendMagicLinkEmail( { 
        email: email,
        magicLink: `${process.env.SERVER_URL}/login/magicLink/verification?email=${email}&tokenValue=${randomHash}`
      });
      success = true;

    //now we have our account with the token details.
    //we just have to email the link to the user.
    //
    //then send email with hash link that leads to the procceed button

  }
  catch(err){
    redirect(`/login?error=${err}`)
  }
  finally{
    if ( success ){ //we need success, as finally's redirect overrides the catch's
      redirect('/success');
    }
  }

}

const sendMagicLinkEmail = async ( { email, magicLink }: {
  email:string,
  magicLink:string,
} ) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

    const msg = {
      to: email,
      from: 'notification.deadlyunicorn@gmail.com',
      subject: 'Magic Link for the Social App',
      text: `You requested to sign-in to the Social App via email. You can do so by following this link ${magicLink}. Happy Social-izing. Note: The link will expire in 30 minutes.`,
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
              href='${magicLink}'>
              this link.
            </a> 
          </td>

          <td style="width: 20%"></td>
        </tr>

        <tr>
          <td></td>

          <td style="text-align: center;">  
            Happy Social-izing.
            <br/>Note: The link will expire in 30 minutes.
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
