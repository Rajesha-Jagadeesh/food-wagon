import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./utils/supabase/middleware";
export default async function middleware(request:NextRequest){
  return await updateSession(request)
}
export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};