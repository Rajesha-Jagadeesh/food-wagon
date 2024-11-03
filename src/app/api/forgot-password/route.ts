import { NextRequest } from "next/server";
import mongooseConnect from "@/lib/db";
import user from "@/lib/databaseModels/user";
import { fireApp } from "@/lib/firestore";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
export async function POST(request: NextRequest) {
  const {email} = await request.json();
  if (email) {
    await mongooseConnect();
    const existingUser = await user.findOne({email: email});
    if (existingUser) {
      await fireApp;
      const auth = getAuth()
      await sendPasswordResetEmail(auth , email);
      return Response.json({success: true, message: "Password reset email has been sent"})
    }else{
      return Response.json({success: false, message: "No users are found in the provided email address."})
    }
  }else{
    return Response.json({success: false, message: "Required information is missing"})
  }
}