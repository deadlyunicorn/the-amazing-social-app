import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  
  if( req.nextUrl.pathname == "/" ){
    return NextResponse.redirect(`${process.env.SERVER_URL}/about`);
  } 

}