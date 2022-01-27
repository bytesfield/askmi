import { NextFunction, Request, Response } from 'express';
import path from "path";
import { generateRandomString } from "../../../utils/helpers";
import config from "../../../config";
import { created, conflict } from "../../responses";
import { UserRepository } from "../../repositories/user.repository";
import { sendMail } from "../../../utils/helpers";
import dotenv from 'dotenv';
import db from "../../../database/models";
import { nextTick } from 'process';
import { hash, isEmptyObject, isValidPassword } from '../../../utils/helpers.util';
import { JwtService } from "../../services/jwt.service";
import { OtpService } from "../../services/otp.service";
import { EmailService } from "../../services/email.service";

dotenv.config();

type signToken = {
    expiresIn: number
}

const signTokenExpiry = {
    expiresIn: 60 * 60 * 24 * 14,
} as signToken;

type verificationDataType = {
    baseUrl: string, userId: number, otp: string
}

const execute = async (req: Request | any, res: Response, next: NextFunction) => {

    const firstname: string = req.body.firstname;
    const lastname: string = req.body.lastname;
    const email: string = req.body.email;
    const username: string = req.body.username;
    const password: string = req.body.password;

    const userRepo: UserRepository = new UserRepository(db.User);

    const emailExist = await userRepo.findUserByEmail(email);

    if (!isEmptyObject(emailExist)) {
        return conflict(res, 'Email already exist');
    }

    const hashedPassword: string = await hash(password);

    const payload = {
        firstName: firstname,
        lastName: lastname,
        username: username,
        email: email,
        password: hashedPassword

    }

    const user: UserRepository = await userRepo.create(payload);

    const user_id: number = user.id;

    const signTokenData = {
        _id: user_id,
    }

    const signTokenSecret: string = config.jwt.secret;

    const jwtService = new JwtService();

    const token: string = await jwtService.createToken(signTokenData, signTokenSecret, signTokenExpiry);

    req.session.token = token;

    const baseUrl: string = req.protocol + "://" + req.get("host");

    const otpService = new OtpService();

    const otp = await otpService.generateOtp(email);

    //Get the absolute path to the view template with the file extension specified.
    let emailVerificationPath = path.resolve('./src/views/email/auth/emailVerification.ejs');

    //Define the object that will get passed to the view. If there is no data to pass just pass an empty object.
    let verificationData: verificationDataType = {
        baseUrl: baseUrl,
        userId: user_id,
        otp: otp.token

    };

    //Email Verification Data
    const emailFrom: string = `${config.app.name} <${config.service.email.username}>`;

    const emailSubject: string = "Your Activation Link for YOUR APP";

    const emailTemplate: { name: string, engine: string, context: verificationDataType } = {
        name: emailVerificationPath,
        engine: 'ejs',
        context: verificationData
    }

    //Send Email Verification link
    const emailService = new EmailService();

    await emailService.from(emailFrom).to(email).subject(emailSubject).template(emailTemplate).send();

    return created(res, 'Registration Successful, Check Email for Activation Link', user);

}

export default { execute };