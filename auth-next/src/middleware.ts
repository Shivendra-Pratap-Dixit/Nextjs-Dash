import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const {pathname}=request.nextUrl;
    // const host = request.headers.get("host");
    if(token && pathname==="/login"){
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    if(!token && pathname!=="/login"){
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: ['/',"/dashboard"]
  }
  