import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  
  //Account settings page: if user isn't logged in redirect them to /login (if they access any of the /account/[subdomains])
  //Implement it after you add Auth.js support.

  if( req.nextUrl.pathname == "/" ){
    return NextResponse.redirect(`${process.env.SERVER_URL}/about`);
  }

}