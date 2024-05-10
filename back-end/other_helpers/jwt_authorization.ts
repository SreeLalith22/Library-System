import { RequestHandler } from "express";
import { CustomErrorHandler } from "../error_helpers/response_error";
import { verify } from 'jsonwebtoken';
import { Token } from "./types";

export const jwt_authorization: RequestHandler = async (req, res, next) => {

    try {
        const authorization = req.headers['authorization'];

        if (!authorization) throw new CustomErrorHandler("Authorization header is required", 500);

        const jwt_token = authorization.split(" ")[1];

        if (!jwt_token) throw new CustomErrorHandler("JWT is required", 400);

        if (!process.env.PRIVATE_KEY) {
            throw new CustomErrorHandler("Private key is missing", 404);
        }

        const verify_token = verify(jwt_token, process.env.PRIVATE_KEY) as Token;
        req.token = verify_token;

        next();
    } catch(error){
        next(error);
    }
}