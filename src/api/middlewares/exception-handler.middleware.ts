import { Request, Response, NextFunction } from "express";
import { buildResponse, serverError } from "../responses";
import config from "../../config";
import constants from '../../utils/constants.util';

export default (error: any, req: Request, res: Response, next: NextFunction) => {

    const statusCode: number = error.statusCode || config.http.code.SERVER_ERROR;
    const status: boolean = error.status || false;
    const message: string = error.message || "Server Error Occurred";
    const isOperational: string = error.isOperational || false;

    if (config.app.env === constants.env.production) {
        if (!isOperational) {
            return serverError(res, constants.messages.somethingWentWrong);
        }

        return buildResponse(res, message, status, statusCode);
    }

    return buildResponse(res, message, status, statusCode);

    //return buildResponse(res, message, status, statusCode, { error: error, stack: error.stack });

}


