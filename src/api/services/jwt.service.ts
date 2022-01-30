import { NextFunction } from "express";
import jwt from "jsonwebtoken";

import config from "../../config";
import { JwtInterface } from "../../interfaces/jwt.interface";
import { UserInterface as UserModelInterface } from "../../interfaces/models/user.interface";
import { HttpException } from "../exceptions";
import { notFound, unauthorized } from "../responses";


const signTokenExpiry = {
    expiresIn: 60 * 60 * 24 * 14,
};

type generateTokenData = {
    payload: UserModelInterface; token: string;
}

type verifyTokenData = {
    verified: boolean; decoded: any;
}
export class JwtService implements JwtInterface<any>{

    /**
     * Generate Token
     * 
     * @param {UserModelInterface} payload 
     * 
     * @returns {generateTokenData}
     */
    public async generateToken(payload: UserModelInterface): Promise<generateTokenData> {
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