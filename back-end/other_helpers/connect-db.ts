import mongoose from 'mongoose';
import 'dotenv/config';

export const connect = async () => {

    if(process.env.DB_PATH) await mongoose.connect(process.env.DB_PATH)
        .then(() => console.log("Succesfully connected to DB"))
        .catch((error) => console.log("Error", error));

    else{
        console.log("Could not connect to db");
    }
}