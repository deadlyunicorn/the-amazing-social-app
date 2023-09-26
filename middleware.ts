import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/database.types'

export async function middleware(req: NextRequest) {
  
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>(
    { req, res },{supabaseKey:process.env.supabaseKey,supabaseUrl:process.env.supabaseUrl }
  );
  await supabase.auth.getSession();
  return res
}