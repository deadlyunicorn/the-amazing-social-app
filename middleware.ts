import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { userObject } from './app/api/mongodb/user/user';
import { headers } from 'next/headers';
import { authSession } from './app/api/auth/types/session';

export async function middleware(req: NextRequest) {

  switch ( req.nextUrl.pathname ){

    case "/":

      return NextResponse.redirect(`${process.env.SERVER_URL}/about`);
    case "/user": //this will only trigger when we don't specify an id - username
      const error = req.nextUrl.searchParams.get("error");
      const headerList = headers();

      const authHeader   = String(headerList.get('authorization'));
      const cookieHeader = String(headerList.get('cookie'));

      const authSession = await fetch(`${process.env.SERVER_URL}/api/auth/session`,{
        headers: [
          ["cookie", cookieHeader],
          ["authorization",authHeader]
        ],
        cache:"no-store"
      })
      .then( async( res ) => (
        res.ok? await res.json() as authSession :null
      ));


      if ( authSession && authSession.user && ( authSession.user.email || authSession.user.name) ){
        
        const userId = authSession.user.id;

        const user: userObject|null = await fetch(`${process.env.SERVER_URL}/api/mongodb/user/${userId}`)
          .then( async(res)=> res.ok? await res.json() :null );
  
        if ( user ){
  
          const username = user.username
          if ( error ){
            return NextResponse.redirect(`${process.env.SERVER_URL}/user/${ username }?error=${error}`);
          }
          return NextResponse.redirect(`${process.env.SERVER_URL}/user/${ username }`);
        }
        else{
  
          const username = authSession.user.name?.split('^')[0];
          if (error){
            return NextResponse.redirect(`${process.env.SERVER_URL}/user/${ userId || username }?error=${error}`);
          }
          return NextResponse.redirect(`${process.env.SERVER_URL}/user/${ userId || username }`);
        }
      }
      else{
        return NextResponse.redirect(`${process.env.SERVER_URL}/login`);
      }
    
  }

  if ( req.nextUrl.pathname.startsWith('/chat') && req.nextUrl.pathname.length !== 5 ){

    const headerList = headers();

      const authHeader   = String(headerList.get('authorization'));
      const cookieHeader = String(headerList.get('cookie'));

      const authSession = await fetch(`${process.env.SERVER_URL}/api/auth/session`,{
        headers: [
          ["cookie", cookieHeader],
          ["authorization",authHeader]
        ],
        cache:"no-store"
      })
      .then( async( res ) => (
        res.ok? await res.json() as authSession :null
      ));
      if ( !authSession || !authSession.user ){
        return NextResponse.redirect(`${process.env.SERVER_URL}/chat`);
      }
  }
}