import jwt from "jsonwebtoken";
import { JwtInterface } from "../../interfaces/jwt.interface";

export class JwtService implements JwtInterface<any>{

    /**
     * Create a new JWT Token
     * 
     * @param tokenData 
     * @param tokenSecret 
     * @param tokenExpiry 
     * @returns Promise<string>
     */
    public async createToken(tokenData: object, tokenSecret: jwt.Secret, tokenExpiry: jwt.SignOptions): Promise<string> {
        return await jwt.sign(tokenData, tokenSecret, tokenExpiry);

    }

}