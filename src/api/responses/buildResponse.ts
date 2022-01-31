import { Response } from "express";
import { responseDataType } from "../../types/custom";

const buildResponse = (response: Response, message: string, status: boolean, statusCode: number, data: any = null, headers: any = null): Response => {
    const responseData: responseDataType = {
        status: status,
        statusCode: statusCode,
        message: message,
    };

    if (data != null) {
        responseData.data = data;

    }
    if (headers != null) {
        return response.header(headers).status(statusCode).send(responseData)

    }

    return response.status(statusCode).send(responseData);

}

export default buildResponse;