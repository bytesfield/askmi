import { BaseRepository } from "./base.repository";
import { Op } from "sequelize";
import { isNull } from "../../utils/helpers.util";
import db from "../../database/models";


export class OtpRepository extends BaseRepository<typeof db.Otp>{

    /**
     * Get User Opt token yet to expire
     * 
     * @param string email 
     * @param string token 
     * 
     * @returns Promise<typeof db.Otp>
     */
    public async otpYetToExpire(email: string, token?: string): Promise<typeof db.Otp> {
        if (!isNull(token)) {
            return await db.Otp.findOne({ where: { email: email, token: token, expiresAt: { [Op.gt]: Date.now() } } });
        }

        return await db.Otp.findOne({ where: { email: email, expiresAt: { [Op.gt]: Date.now() } } });
    }


    /**
     * Get User expired Opt token
     * 
     * @param email 
     * @param string token 
     * 
     * @returns Promise<typeof db.Otp>
     */
    public async otpExpired(email: string, token?: string): Promise<typeof db.Otp> {
        if (!isNull(token)) {
            return await db.Otp.findOne({ where: { email: email, token: token, expiresAt: { [Op.lt]: Date.now() } } });
        }

        return await db.Otp.findOne({ where: { email: email, expiresAt: { [Op.lt]: Date.now() } } });


    }

    /**
     * Find Otp by UserId
     * 
     * @param number id 
     * 
     * @returns Promise<typeof Otp
     */
    public async findOtpByUserId(id: number): Promise<typeof db.Otp> {
        return await db.Otp.findOne({ where: { UserId: id } });
    }

    /**
     * Find Otp by Email
     * 
     * @param string email 
     * 
     * @returns Promise<typeof Otp
     */
    public async findOtpByEmail(email: string): Promise<typeof db.Otp> {
        return await db.Otp.findOne({ where: { email: email } });
    }

}
