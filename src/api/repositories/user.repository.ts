import { BaseRepository } from "./base.repository";
import db from "../../database/models";

// now, we have all code implementation from BaseRepository
export class UserRepository extends BaseRepository<typeof db.User>{

    /**
     * Find User by Email
     * 
     * @param email 
     * @returns Promise<User>
     */
    public async findUserByEmail(email: string): Promise<typeof db.User> {
        return await db.User.findOne({ where: { email: email } });
    }
}
