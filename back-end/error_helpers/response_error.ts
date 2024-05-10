import { ErrorRequestHandler, RequestHandler } from "express";
import { StandardResponse } from '../other_helpers/standard_response';

export class CustomErrorHandler{

    message: string;
    statusCode: number;

    constructor(message: string, statuscode: number){
        this.message = message;
        this.statusCode = statuscode;
    }
}

export const StandardResponseError: ErrorRequestHandler<unknown, StandardResponse<string>> = async(err, req, res, next) => {

    if(err instanceof Error){

        res.status(400).json({success: false, data: err.message});
    }
    else if(err instanceof CustomErrorHandler){

        res.status(401).json({success: false, data: err.message});
    }

    else{
        res.status(500).json({success: false, data: "Unknown error occurred!"});
    }
}