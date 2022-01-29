import { UserInterface as UserModelInterface } from "../interfaces/models/user.interface";
export interface UserInterface {
    createUser(item: object): Promise<UserModelInterface>
    updateUser(id: number, item: object): Promise<UserModelInterface>
    findUserByEmail(email: string): Promise<UserModelInterface>;
    findUserByMultiple(obj: object): Promise<UserModelInterface>;
    deleteUser(id: number): Promise<boolean>;

}