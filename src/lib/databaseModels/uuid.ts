import mongoose,{ Document, Schema } from "mongoose";

export interface DBUniqueId extends Document{
  user: Number,
  item: Number,
  order: Number,
}

const DBUniqueIdSchema : Schema = new mongoose.Schema({
  user: { type: Number, required: true },
  item: { type: Number, required: true },
  order: { type: Number, required: true },
});

export default mongoose.models.uuid || mongoose.model<DBUniqueId>("uuid", DBUniqueIdSchema);