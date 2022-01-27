import jwt from "jsonwebtoken";
import { OtpInterface } from "../../interfaces/otp.interface";
import { UserRepository } from "../repositories/user.repository";
import { OtpRepository } from "../repositories/otp.repository";
import db from "../../database/models";
import { HttpException } from "../../../src/api/exceptions";
import { isEmptyObject, addMinutes } from "../../utils/helpers.util";
import { generateRandomString } from "../../utils/helpers";

export class OtpService implements OtpInterface {

    /**
     * Generates new Otp Token
     * 
     * @param email 
     * @returns Promise<string>
     */
    public async generateOtp(email: string): Promise<string> {
        const userRepo: UserRepository = new UserRepository(db.User);

        const user = await userRepo.findUserByEmail(email);

        if (!isEmptyObject(user)) {
            new HttpException(`Email already exist.`, 409)
        }

        const otpRepo: OtpRepository = new OtpRepository(db.Otp);

        const otp = await otpRepo.otpYetToExpire(email);

        const token: string = generateRandomString({ length: 6 });

        const minutesToAdd: number = 5;

        const expiresAt: Date = addMinutes(minutesToAdd);

        if (otp == null) {
            return await otpRepo.create({
                email: email,
                token: token,
                expiresAt: expiresAt,
                UserId: user.id,
            });
        }

        return await otpRepo.update(user.id, {
            token: token,
            expiresAt: expiresAt
        });

    }

}