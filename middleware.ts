import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { userObject } from './app/api/mongodb/user/user';
import { headers } from 'next/headers';
import { authSession } from './app/api/auth/types/session';

export async function middleware(req: NextRequest) {

  switch ( req.nextUrl.pathname ){

    case "/":

      return NextResponse.redirect(`${process.env.SERVER_URL}/about`);
      break;
    // case "/user":
    case "/user":
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

      if ( authSession ){

        const user: userObject|null = await fetch(`${process.env.SERVER_URL}/api/mongodb/user/${authSession.user.id}`,
        {cache:"no-store"})
          .then( async(res)=> res.ok? await res.json() :null );
  
        if ( user ){
  
          const username = user.username
          if ( error ){
            return NextResponse.redirect(`${process.env.SERVER_URL}/user/${ username }?error=${error}`);
          }
          return NextResponse.redirect(`${process.env.SERVER_URL}/user/${ username }`);
        }
        else{
  
          const id = authSession.user.id;
          // TODO const username = authSession.username; to be implemented
          if (error){
            return NextResponse.redirect(`${process.env.SERVER_URL}/user/${ id /*|| username*/ }?error=${error}`);
          }
          return NextResponse.redirect(`${process.env.SERVER_URL}/user/${ id /*|| username*/ }`);
        }
      }
      else{
        return NextResponse.redirect(`${process.env.SERVER_URL}/login`);
      }
      break;
  }
}