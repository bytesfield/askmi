import { BaseRepository } from "./base.repository";
import db from "../../database/models";
import { UserInterface } from "../../interfaces/models/user.interface";

// now, we have all code implementation from BaseRepository
export class UserRepository extends BaseRepository<UserInterface>{

    /**
     * Find User by Email
     * 
     * @param email 
     * @returns Promise<User>
     */
    public async findUserByEmail(email: string): Promise<UserInterface> {
        return await db.User.findOne({ where: { email: email } });
    }
}
