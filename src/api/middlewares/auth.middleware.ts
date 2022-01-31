
import { Request, Response, NextFunction } from 'express';
import { notFound, unauthorized } from "../responses";
import { JwtService } from '../services/jwt.service';
import constants from "../../utils/constants.util";


export default async (req: Request | any, res: Response, next: NextFunction): Promise<Response | void> => {
    let token: string | undefined = req.header('authorization');

    if (!token) {
        return notFound(res, constants.messages.tokenRequired);
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
    }

    const jwtService = new JwtService();

    const { verified, decoded } = await jwtService.verifyToken(token);

    if (!verified) {
        return unauthorized(res, constants.messages.unauthorizedToken);

    }

    req.session.user = decoded.payload;

    return next();
};