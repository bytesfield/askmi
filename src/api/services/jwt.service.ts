import jwt from "jsonwebtoken";
import { JwtInterface } from "../../interfaces/jwt.interface";

export class JwtService implements JwtInterface<any>{

    public async createToken(tokenData: object, tokenSecret: jwt.Secret, tokenExpiry: jwt.SignOptions): Promise<string> {
        return await jwt.sign(tokenData, tokenSecret, tokenExpiry);

    }

}