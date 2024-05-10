import { RequestHandler } from "express";
import { StandardResponse } from "../other_helpers/standard_response";
import { User, UserModel } from "./user-schema";
import { CustomErrorHandler } from "../error_helpers/response_error";
import { compare, hash } from "bcrypt";
import { sign } from 'jsonwebtoken';

export const user_signup_handler: RequestHandler<unknown, StandardResponse<string>, User> = async (req, res, next) => {

    try {
        const user = req.body;

        const finduser = await UserModel.findOne({ email: user.email });

        if (finduser) throw new CustomErrorHandler("User already exists", 400);

        let hashed_password = await hash(user.password, 10);

        const createuser = await UserModel.create({ ...user, password: hashed_password });

        res.status(201).json({ success: true, data: "User successfully created" });

    } catch (error) {

        next(error);
    }
}

export const user_signin_handler: RequestHandler<unknown, StandardResponse<{
    token: string;
    user: { fullname: string; _id: string; role: string };
}>,
    { email: string; password: string },
    unknown
> = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        const finduser = await UserModel.findOne({ email: email });

        if (!finduser) throw new CustomErrorHandler("Could not find the user.", 404);

        let compare_password = await compare(password, finduser.password);

        if (!compare_password) throw new CustomErrorHandler("Incorrect password", 401);

        const { _id, fullname, role } = finduser;

        if (!process.env.PRIVATE_KEY) throw new CustomErrorHandler("No private key found", 404);

        const jwt = sign(
            {
                _id,
                fullname,
                email,
                role
            },
            process.env.PRIVATE_KEY);

        res.status(200).json({ success: true, data: { token: jwt, user: { fullname: fullname, _id: _id.toString(), role: role } } });

    } catch (error) {

        next(error);
    }
}

export const get_one_user: RequestHandler<{user_id: string}, StandardResponse<{_id: string; fullname: string; email: string; role: string;}>, User> = async(req, res, next) => {

    try{

        const {user_id} = req.params;
        const finduser = await UserModel.findOne({_id: user_id});

        if(!finduser) throw new CustomErrorHandler("Could not find user with given ID", 404);

        res.status(200).json({success: true, data: {_id: finduser._id.toString(), fullname: finduser.fullname, email: finduser.email, role: finduser.role}});

    } catch(error){
        next(error);
    }
}

