import { Schema, model, InferSchemaType } from "mongoose";

export const productSchema = new Schema({
    productname: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    description: {type: String},
    owner: {type: String, required: true},
    added_by: {
        user_id: String,
        fullname: String,
        email: String,
    },
    quantity: {type: Number, required: true},
    status: {type: String, enum: ["Available", "Unavailable", "In-Cart"], required: true, default: "Available"}
    
  }, {versionKey: false});

  export type Product = InferSchemaType<typeof productSchema>;
  export const ProductModel = model<Product>("product", productSchema);

