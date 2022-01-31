import { OtpRepository } from "../repositories/otp.repository";
import db from "../../database/models";
import { HttpException } from "../../../src/api/exceptions";
import { isEmptyObject, addMinutes, isNull } from "../../utils/helpers.util";
import { generateRandomString } from "../../utils/helpers";
import { UserService } from "./user.service";
import { UserInterface } from "../../interfaces/models/user.interface";
import { OtpInterface } from "../../interfaces/models/otp.interface";

var otpRepo: OtpRepository = new OtpRepository(db.Otp);
export class OtpService implements OtpInterface {
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    id!: number;
    email!: string;
    token!: string;
    expiresAt!: Date;

    /**
     * Generates new Otp Token
     * 
     * @param {string} email 
     * 
     * @returns {Promise<typeof db.Otp>}
     */
    public async generateOtp(email: string): Promise<OtpInterface> {
        const userService: UserService = new UserService();

        const user: UserInterface = await userService.findUserByEmail(email);

        if (!isEmptyObject(user)) {
            new HttpException(`Email already exist.`, 409)
        }

        const otp = await otpRepo.otpYetToExpire(email);

        const token: string = generateRandomString({ length: 6, type: "numeric" });

        const minutesToAdd: number = 5;

        const expiresAt: Date = addMinutes(minutesToAdd);

        if (isNull(otp)) {
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

    /**
      * Find Otp by UserId
      * 
      * @param {number} id 
      * 
      * @returns {Promise<OtpInterface>}
      */
    public async findOtpByUserId(id: number): Promise<OtpInterface> {
        return await otpRepo.findOtpByUserId(id);
    }

    /**
     * Find Otp by Email
     * 
     * @param {string} email 
     * 
     * @returns {Promise<OtpInterface>}
     */
    public async findOtpByEmail(email: string): Promise<OtpInterface> {
        return await otpRepo.findOtpByEmail(email);
    }

    /**
     * Find Otp by Email
     * 
     * @param {string} email 
     * 
     * @returns {Promise<OtpInterface>}
     */
    public async findOtpByMultiple(obj: object): Promise<OtpInterface> {
        return await otpRepo.findByMultiple(obj);
    }

    /**
     * Delete an Otp
     * 
     * @param {number} id 
     * 
     * @returns {Promise<boolean>}
     */
    public async deleteOtp(id: number): Promise<boolean> {
        return await otpRepo.delete(id);
    }

    /**
     * Check if otp is yet to expire
     * 
     * @param {string} email 
     * @param {string} token 
     * 
     * @returns {Promise<boolean>}
     */
    public async isOtpYetToExpire(email: string, token: string): Promise<boolean> {

        const otp = await otpRepo.otpYetToExpire(email, token);

        return !isNull(otp) ? true : false

    }

    /**
     * Check if otp has expired
     * 
     * @param {string} email 
     * @param {string} token 
     * 
     * @returns {Promise<boolean>}
     */
    public async isOtpExpired(email: string, token: string): Promise<boolean> {
        const otp = await otpRepo.otpExpired(email, token);

        return !isNull(otp) ? true : false
    }

}