
import { Request, Response, NextFunction } from 'express';
import { notFound, unauthorized } from "../responses";
import { JwtService } from '../services/jwt.service';


export default async (req: Request | any, res: Response, next: NextFunction): Promise<Response | void> => {
    let token: string | undefined = req.header('authorization');

    if (!token) {
        return notFound(res, 'Access Denied, token required');
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
    }

    const jwtService = new JwtService();

    const { verified, decoded } = await jwtService.verifyToken(token);

    if (!verified) {
        return unauthorized(res, 'Unauthorized Token');

    }

    req.session.user = decoded.payload;

    return next();
};