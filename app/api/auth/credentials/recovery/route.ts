import { NextRequest, NextResponse } from "next/server";
import zod from "zod"
import sgMail from "@sendgrid/mail"
import { redirect } from "next/navigation";


export const POST = async( request: NextRequest )=> {

  redirect(`${process.env.SERVER_URL}/`);
  redirect('/')
  try{
  const formData = await request.formData();
  const contact = await zod
  .string()
  .email()
  .parseAsync( formData.get('contact') )
  .catch( err => { throw "Invalid contact email" });

  const message = await zod
    .string()
    .min( 100 )
    .max( 300 )
    .parseAsync( formData.get('message'))
    .catch( err => { throw 'Invalid description' });

    console.log("IN HERE")
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

    const msgClient = {
      to: contact,
      from: 'notification.deadlyunicorn@gmail.com',
      subject: 'Account Recovery (Social App)',
      text: `You have requested to have your account recovered on the Social App platform. Please be patient while our team will look through your issue.`,
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
          You have requested to have your account recovered on the Social App platform. 
          <br/>Please be patient while our team will look through your issue.
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

    const msgDev = {
      to: "retroalex1008@gmail.com",
      from: 'notification.deadlyunicorn@gmail.com',
      subject: `${contact} - Account Recovery (Social App)`,
      text: `You have requested to have your account recovered on the Social App platform. Please be patient while our team will look through your issue.`,
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
          ${message}
          </td>

          <td style="width: 20%"></td>
        </tr>

        <tr>
          <td></td>

          <td style="text-align: center;">  
            Please contact me back at ${contact}.
          </td>

          <td></td>
        </tr>

      </table>`
    };

    await sgMail
      .send(msgClient)
      .then( () => {
        console.log('Email sent');
      })
      .then( async() => {
        await sgMail.send( msgDev )
        console.log('Dev notified');
      })
      .catch((error) => {
        console.error(error)
        throw 'Failed sending the message'
      });

      throw "Message sent successfully"

  }
  catch(err){
    console.log( err )
    return NextResponse.redirect(`${process.env.SERVER_URL}/account/recovery?error=${err}`)
  }
  return NextResponse.redirect(`${process.env.SERVER_URL}/account/recovery?error=${"oof"}`)



}