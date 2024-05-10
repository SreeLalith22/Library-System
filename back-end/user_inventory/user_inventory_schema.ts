import { Schema, model, InferSchemaType } from "mongoose";

export const user_inventory_schema = new Schema({
    product_id: { type: String, required: true },
    copy_id: { type: String, required: true },
    productname: { type: String, required: true },
    datePurchased: { type: Date, required: true }
  });

  export type UserInventory = InferSchemaType<typeof user_inventory_schema>;
