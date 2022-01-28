import { NextFunction, Request, Response } from 'express';
import { conflict, success, serverError, badRequest, unauthorized } from "../../responses";
import { JwtService } from "../../services/jwt.service";
import { UserService } from "../../services/user.service";
import { hash, isNull, compare } from '../../../utils/helpers.util';
import HttpException from "../../exceptions/HttpException";
import config from "../../../config";
import db from '../../../database/models';

type signToken = {
    expiresIn: number
}

const signTokenExpiry = {
    expiresIn: 60 * 60 * 24 * 14,
} as signToken;

const execute = async (req: Request | any, res: Response, user: typeof db.User): Promise<object> => {

    const signTokenData = {
        _id: user.id,
    }

    const jwtService: JwtService = new JwtService();

    const token = await jwtService.createToken(signTokenData, config.jwt.secret, signTokenExpiry);

    return {
        token: token,
        "user": user
    }
}

export default { execute };