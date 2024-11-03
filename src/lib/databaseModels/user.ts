import mongoose, { Document, Schema } from "mongoose";
export interface DBUser extends Document {
  name: string;
  email: string;
  id: Number;
  basket: Array<
      {
        sku: Number, 
        quantity: Number, 
        options: Array<
          {
            key: string,
            value: string
          }
        >
      }
    >;
  role: Array<"customer" | "restaurant-admin">,
  subsidiary: string,
  isRestaurant: boolean,
  orders: Array<Number>,
  parent: Number,
  uid: string
}
export type USER = {
  name: string;
  email: string;
  id: number;
  isVerified: boolean;
  isRestaurant: boolean,
  role: Array<"customer" | "restaurant-admin">,
  parent ? : number
  basket ? : Array<
    {
      sku: Number, 
      quantity: Number, 
      options: Array<
        {
          key: string,
          value: string
        }
      >
    }
  >;
  subsidiary ?: string,
  orders ? : Array<number>,
  uid: string
}


const DBUserSchema : Schema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  role: {type: Array, required: true},
  id: {type: Number},
  basket: {type: Array},
  subsidiary: {type: String},
  uid: {type: String}
});

export default mongoose.models.User || mongoose.model<DBUser>("User", DBUserSchema);