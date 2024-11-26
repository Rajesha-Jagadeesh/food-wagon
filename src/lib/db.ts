import mongoose from "mongoose";
const connection : {isConnected?: number} = {};

async function mongooseConnect() {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(`mongodb+srv://${process.env.NEXT_MONGODB_USER}:${process.env.NEXT_MONGODB_PASSCODE}@food-wagon.ybdot.mongodb.net/foodwagon?retryWrites=true&w=majority&appName=food-wagon`);
  connection.isConnected = db.connections[0].readyState;
  return db;
}

export default mongooseConnect;

