import { BaseRepository } from "./base.repository";
import db from "../../database/models";
import { UserInterface as UserModelInterface } from "../../interfaces/models/user.interface";

// now, we have all code implementation from BaseRepository
export class UserRepository extends BaseRepository<UserModelInterface>{

    /**
     * Find User by Email
     * 
     * @param email 
     * @returns Promise<User>
     */
    public async findUserByEmail(email: string): Promise<UserModelInterface> {
        return await db.User.findOne({ where: { email: email } });
    }
}
