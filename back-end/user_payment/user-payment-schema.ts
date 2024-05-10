import { Schema, model, InferSchemaType } from "mongoose";
import { paymentSchema } from "../payment/payment-schema";

export const user_payment_schema = new Schema({
    user_id: {type: String, required: true},
    product_id: {type: String, required: true},
    card_number: {type: paymentSchema, required: true}
  });


export type UserPayment = InferSchemaType<typeof user_payment_schema>;
export const UserPaymentModel = model<UserPayment>("payment", user_payment_schema);
