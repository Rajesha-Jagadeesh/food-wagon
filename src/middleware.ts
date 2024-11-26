import { NextRequest, NextResponse } from "next/server";
import { authRoutes, customerProtectedRoutes, protectedRoutes, restaurantProtectedRoutes } from "./utils/utils";
export default async function middleware(request:NextRequest){
  const userCookie = request.cookies.get(process.env.NEXT_USER_COOKIE || "");
  if (userCookie) {
    const userIsRestaurant = atob(request.cookies.get(process.env.NEXT_USER_ROLE || "")?.value || "") === 'true';
    if (authRoutes.includes(request.nextUrl.pathname) || userIsRestaurant && restaurantProtectedRoutes.includes(request.nextUrl.pathname) || !userIsRestaurant && customerProtectedRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL(userIsRestaurant  ? '/dashboard' : "/basket", request.url));
    } else {
      return NextResponse.next();
    }
  }else if(protectedRoutes.find(route=> request.nextUrl.pathname.startsWith(route) && request.nextUrl.pathname !== "/")){
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/",
    "/((?!api|static|.*\\..*|_next|favicon.ico).*)",
  ],
};