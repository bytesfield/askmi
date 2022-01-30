import { Request, Response } from 'express';
import { JwtService } from "../../services/jwt.service";
import { UserInterface as UserModelInterface } from '../../../interfaces/models/user.interface';

const execute = async (req: Request | any, res: Response, user: UserModelInterface): Promise<object> => {

    const jwtService: JwtService = new JwtService();

    const payload = await jwtService.generateToken(user);

    return payload;
}

export default { execute };