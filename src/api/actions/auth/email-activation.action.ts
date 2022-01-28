import { NextFunction, Request, Response } from 'express';
import User from "../../../database/models";
import Otp from "../../../database/models";
import { OtpService } from "../../services/otp.service";
import EmailVerification from "../../../utils/modules/send-email-verification";

type verificationDataType = {
    baseUrl: string, userId: number, token: string
}

/**
 * Executes Email Activation action
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @param {Promise<User>} user 
 * 
 * @returns Promise<User>
 */
const execute = async (req: Request | any, res: Response, next: NextFunction, user: typeof User): Promise<typeof User> => {

    const email: string = user.email;

    const baseUrl: string = req.protocol + "://" + req.get("host");

    const otpService = new OtpService();

    const otp: typeof Otp = await otpService.generateOtp(email);

    //Define the object that will get passed to the view. If there is no data to pass just pass an empty object.
    let verificationData: verificationDataType = {
        baseUrl: baseUrl,
        userId: user.id,
        token: otp.token

    };

    //Sends Email Verification to user
    EmailVerification.send(email, verificationData);

    return user;
}

export default { execute };