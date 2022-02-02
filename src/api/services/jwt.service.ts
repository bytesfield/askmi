import jwt from "jsonwebtoken";
import config from "../../config";
import { JwtInterface } from "../../interfaces/jwt.interface";
import { UserInterface } from "../../interfaces/models/user.interface";
import { generateTokenData, verifyTokenData } from "../../types/custom";

const signTokenExpiry = {
    expiresIn: 60 * 60 * 24 * 14,
};

export class JwtService implements JwtInterface {

    /**
     * Generate Token
     * 
     * @param {UserInterface} payload 
     * 
     * @returns {generateTokenData}
     */
    public async generateToken(payload: UserInterface): Promise<generateTokenData> {
        try {
            const token = jwt.sign({ payload }, config.jwt.secret, signTokenExpiry);

            return { payload, token };
        } catch (error) {
            throw new Error('Error occurred generating token');
        }
    }

    /**
     * Verify Token
     * 
     * @param {string} token 
     * 
     * @returns {verifyTokenData}
     */
    public async verifyToken(token: string): Promise<verifyTokenData> {
        try {
            const decoded: jwt.JwtPayload | string = jwt.verify(token, config.jwt.secret);
            return { verified: true, decoded };
        } catch (error) {
            return { verified: false, decoded: null };
        }
    }

}