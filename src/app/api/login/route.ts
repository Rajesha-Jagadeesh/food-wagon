import { NextRequest } from "next/server";
import mongooseConnect from "@/lib/db";
import user from "@/lib/databaseModels/user";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { fireApp } from "@/lib/firestore";
import { cookies } from "next/headers";
import { FirebaseError } from "firebase/app";
export async function POST(request: NextRequest) {
  const {email, password, rememberMe} = await request.json();
  if (email && password) {
    await mongooseConnect();
    const existingUser = await user.findOne({email: email});
    if (existingUser) {
      await fireApp;
      const auth = getAuth();
      try {
        const loggedInUser = await signInWithEmailAndPassword(auth, email, password);
        if(loggedInUser && loggedInUser.user){
          cookies().set(process.env.NEXT_USER_COOKIE || "", loggedInUser.user.uid, {maxAge: rememberMe ? 60*60*24*365 : 60*60*2});
          const currentUser = await user.findOne({uid: loggedInUser.user.uid});
          cookies().set(process.env.NEXT_USER_ROLE || "", btoa(!!currentUser.isRestaurant ? 'true' : 'false'), {maxAge: rememberMe ? 60*60*24*365 : 60*60*2});
          return Response.json({success: true, message: "LoggedIn successfully", isRestaurant: currentUser.isRestaurant, currentUser })
        }else{
          return Response.json({success: false, message: "An error occurred while logging in"})
        }
      } catch (error:unknown) {
        if (error instanceof FirebaseError) {
          if(error.name === "FirebaseError" && error.code === "auth/invalid-credential"){
            return Response.json({success: false, message: "Invalid email or password"})
          }else{
            return Response.json({success: false, message: error.message || "An error occurred while logging in"})
          }
        }
      }
      
    }else{
      return Response.json({success: false, message: "There are no users in the provided email address"});
    }
  }else{
    return Response.json({success: false, message: "Required information is missing"})
  }
}

export async function GET() {
  const uid = cookies().get(process.env.NEXT_USER_COOKIE || "")?.value;
  if(uid){
    const loggedInUser = await user.findOne({uid: uid});
    return Response.json({success: !!loggedInUser, user: {isRestaurant: loggedInUser.isRestaurant} },{status: 200})
  }else{
    return Response.json({success: false, message: "User not found"},{status: 200})
  }
}