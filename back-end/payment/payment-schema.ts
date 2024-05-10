import { Schema, model, InferSchemaType } from "mongoose";


export const paymentSchema = new Schema({
    card_number: {type: Number, unique: true, required: true},
    card_user_name: {type: String, required: true},
    exp_date: {type: Date, required: true},
    cvv: {type: Number, required: true},
    balance: {type: Number, required: true}

  })

export type PaymentSchema = InferSchemaType<typeof paymentSchema>;

