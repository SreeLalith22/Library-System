import { Schema, model, InferSchemaType } from "mongoose";
import { user_inventory_schema } from '../user_inventory/user_inventory_schema';

export const userSchema = new Schema({
    fullname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    inventories: { type: [user_inventory_schema], default: [] },
    role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
  }, {versionKey: false});
  
  export type User = InferSchemaType<typeof userSchema>;
  export const UserModel = model<User>("user", userSchema);