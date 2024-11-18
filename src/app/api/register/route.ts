import mongooseConnect from "@/lib/db";
import { NextRequest } from "next/server";
import uuid from "@/lib/databaseModels/uuid";
import user from "@/lib/databaseModels/user";
import { cookies } from "next/headers";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { fireApp } from "@/lib/firestore";
export async function POST(request: NextRequest) {
  try {
    const {email, name, password, isRestaurant} = await request.json();
    if (email && name && password) {
      await mongooseConnect();
      const existingUser = await user.findOne({email: email});
      if (existingUser) {
        return Response.json({success: false, message: "An account already exits with the provided email id"});
      }else{
        const uniqueids = await uuid.findOne();
        await fireApp;
        const auth = getAuth();
        const createdUser = await createUserWithEmailAndPassword(auth, email, password);
        if (createdUser.user) {
          cookies().set(process.env.NEXT_USER_COOKIE || "", createdUser.user.uid, {maxAge: 60*60*2});
          cookies().set(process.env.NEXT_USER_ROLE || "", btoa(!!isRestaurant ? 'true' : 'false'), {maxAge: 60*60*2});
          await user.insertMany({email: email, id: uniqueids.user, isRestaurant: !!isRestaurant, name: name, isVerified: false, role : isRestaurant ? "restaurant-admin" : "customer", subsidiary: "", orders: [], uid: createdUser.user.uid});
          await uuid.updateOne({_id: uniqueids._id}, {$set: {user: parseInt(uniqueids.user + 1)}});
          return Response.json({success: true, message: "Account has been created successfully", isRestaurant: isRestaurant});
        } else {
          return Response.json({success: false, message: "An error occured during user creation", createdUser});
        }
      }
    }else{
      return Response.json({success: false, message: "Required information is missing"})
    }
  } catch (error: unknown) {
    if(error instanceof Error)
      return Response.json({success: false, message: error.message})
  }
}