import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


const protectedPages = ["/cart", "/profile", "/allorders", "/checkout"];

const authPages = ["/login", "/register"];

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  
  const isProtected = protectedPages.some((page) => pathname.startsWith(page));
  
  if (isProtected) {
    if (!token) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  
  const isAuthPage = authPages.some((page) => pathname.startsWith(page));

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    "/cart/:path*", 
    "/profile/:path*", 
    "/allorders/:path*", 
    "/checkout/:path*", 
    "/login", 
    "/register"
  ],
};