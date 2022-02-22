import { Request, Response, NextFunction } from "express";
import { AuthInterface } from "../../interfaces/auth.interface";
import { compare, hash, isNull } from "../../utils/helpers.util";
import { HttpException } from "../exceptions";
import { UserService } from "./user.service";
import RegisterAction from "../actions/auth/register.action";
import LoginAction from "../actions/auth/login.action";
import { OtpService } from "./otp.service";
import db from "../../database/models";
import EmailVerification from "../../utils/modules/send-email-verification";
import { verificationDataType } from "../../types/custom";
import constants from '../../utils/constants.util';
import { UserInterface } from "../../interfaces/models/user.interface";

var userService: UserService = new UserService();

export class AuthService implements AuthInterface {

    /**
     * Registers a user
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     * 
     * @returns {Promise<object>}
     */
    public async register(req: Request, res: Response, next: NextFunction): Promise<any> {
        const email: string = req.body.email;

        const emailExist: UserInterface = await userService.findUserByEmail(email);

        if (!isNull(emailExist)) {
            throw new HttpException(constants.messages.emailExists, 409);
        }

        const userNameExist: UserInterface = await userService.findUserByUsername(req.body.username);

        if (!isNull(userNameExist)) {
            throw new HttpException(constants.messages.usernameExists, 409);
        }

        req.body.password = await hash(req.body.password);

        return await RegisterAction.execute(req, res, userService);
    }

    /**
     * Logs a user in
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     * 
     * @returns {Promise<object>}
     */
    public async login(req: Request, res: Response, next: NextFunction): Promise<object> {
        const email: string = req.body.email;
        const password: string = req.body.password;

        const user = await userService.findUserByEmail(email);

        if (isNull(user)) {
            throw new HttpException(constants.messages.invalidCredentials, 400);
        }

        const isActive = await userService.isUserActivated(user);

        if (!isActive) {
            throw new HttpException(constants.messages.emailNotVerified, 400);
        }

        const isPasswordValid: boolean = await compare(password, user.password);

        if (!isPasswordValid) {
            throw new HttpException(constants.messages.invalidCredentials, 400);
        }

        return await LoginAction.execute(req, res, user);
    }

    /**
     * Verifies user email
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     * @param {User} user 
     * 
     * @returns {Promise<boolean>}
     */
    public async verifyAccount(req: Request, res: Response, next: NextFunction, user: UserInterface): Promise<boolean> {

        const email: string = user.email;
        const token: string = req.params.token

        const otpService = new OtpService();

        const otp: Promise<string> | typeof db.Otp = await otpService.findOtpByMultiple({
            email: email,
            token: token,
        });

        if (isNull(otp)) {
            throw new HttpException(constants.messages.invalidActivationLink, 409);
        }

        const isOtpExpired = await otpService.isOtpExpired(email, token);

        if (isOtpExpired) {
            throw new HttpException(constants.messages.invalidActivationLink, 409);
        }

        const userService = new UserService();

        await userService.updateUser(user.id,
            { emailVerifiedAt: new Date() }
        );

        return await otpService.deleteOtp(otp.id);
    }

    /**
     * Sends new  Email Activation
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     * @param {Promise<User>} user 
     * 
     * @returns {Promise<User>}
     */
    public async getActivationEmail(req: Request | any, res: Response, next: NextFunction, user: UserInterface): Promise<UserInterface> {

        const email: string = user.email;

        const baseUrl: string = req.protocol + "://" + req.get("host");

        const otpService = new OtpService();

        const otp: typeof db.Otp = await otpService.generateOtp(email);

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
}