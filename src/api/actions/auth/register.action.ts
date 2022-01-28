import { Request, Response } from 'express';
import path from "path";
import config from "../../../config";
import dotenv from 'dotenv';
import { JwtService } from "../../services/jwt.service";
import { OtpService } from "../../services/otp.service";
import { UserService } from "../../services/user.service";
import User from "../../../database/models";
import Otp from "../../../database/models";
import EmailVerification from "../../../utils/modules/send-email-verification";

dotenv.config();

type signToken = {
    expiresIn: number
}

const signTokenExpiry = {
    expiresIn: 60 * 60 * 24 * 14,
} as signToken;

type verificationDataType = {
    baseUrl: string, userId: number, token: string
}

/**
 * Execute Register Action
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * 
 * @returns {Promise<typeof User>}
 */
const execute = async (req: Request | any, res: Response, userService: UserService): Promise<typeof User> => {

    const email: string = req.body.email;

    const user: UserService | typeof User = await userService.createUser(req.body);
    const user_id: number = user.id;

    const signTokenData = {
        _id: user_id,
    }

    const signTokenSecret: string = config.jwt.secret;
    const jwtService = new JwtService();

    const token: string = await jwtService.createToken(signTokenData, signTokenSecret, signTokenExpiry);

    req.session.token = token;

    const otpService = new OtpService();
    const otp: Promise<string> | typeof Otp = await otpService.generateOtp(email);

    const baseUrl: string = req.protocol + "://" + req.get("host");

    //Define the object that will get passed to the view. If there is no data to pass just pass an empty object.
    let verificationData: verificationDataType = {
        baseUrl: baseUrl,
        userId: user_id,
        token: otp.token

    };

    //Sends Email Verification to user
    EmailVerification.send(email, verificationData);

    return user;

}

export default { execute };