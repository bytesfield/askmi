import { UserInterface as UserModelInterface } from "./models/user.interface";

type generateTokenData = {
    payload: UserModelInterface; token: string;
}

type verifyTokenData = {
    verified: boolean; decoded: any;
}
export interface JwtInterface<T> {
    generateToken(payload: UserModelInterface): Promise<generateTokenData>;
    verifyToken(token: string): Promise<verifyTokenData>;

}