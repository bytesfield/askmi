import { generateTokenData, verifyTokenData } from "../types/custom";
import { UserInterface as UserModelInterface } from "./models/user.interface";

export interface JwtInterface {
    generateToken(payload: UserModelInterface): Promise<generateTokenData>;
    verifyToken(token: string): Promise<verifyTokenData>;

}