import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getAuthSession, getUserDetails } from './app/api/mongodb/user';
import { redirect } from 'next/navigation';

export async function middleware(req: NextRequest) {
  
  //Account settings page: if user isn't logged in redirect them to /login (if they access any of the /account/[subdomains])
  //Implement it after you add Auth.js support.

  if( req.nextUrl.pathname == "/" ){
    return NextResponse.redirect(`${process.env.SERVER_URL}/about`);
  }
  else if ( req.nextUrl.pathname == "/user/" ){

    //@ts-ignore
    const authSession = ( await getAuthSession() );

    if ( authSession ){

      const user = await getUserDetails();

      const error = req.nextUrl.searchParams.get("error");
      if ( user ){

        const username = user.username
        if ( error ){
          redirect(`/user/${ username }?error=${error}`);
        }
  
        redirect(`/user/${ username }`);
      }
      else{

        const email = authSession.email;
        // TODO const username = authSession.username; to be implemented
        if (error){
          redirect(`/user/${ email /*|| username*/ }?error=${error}`);
        }
        redirect(`/user/${ email /*|| username*/ }`);
      }
    }
    else{
      redirect(`/login`);
    }
  }

}