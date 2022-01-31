import config from "../../config";

export default class HttpException extends Error {
  public statusCode: number;
  public status: boolean;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? config.http.status.FAILED : config.http.status.FAILED;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);


  }
}
