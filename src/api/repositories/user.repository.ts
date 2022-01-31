import { BaseRepository } from "./base.repository";
import db from "../../database/models";
import { UserInterface } from "../../interfaces/models/user.interface";

// now, we have all code implementation from BaseRepository
export class UserRepository extends BaseRepository<UserInterface>{

    /**
     * Find User by Email
     * 
     * @param {string} email 
     * @returns {Promise<UserInterface>}
     */
    public async findUserByEmail(email: string): Promise<UserInterface> {
        return await db.User.findOne({ where: { email: email } });
    }

    /**
     * Find User by Username
     * 
     * @param {string} username 
     * @returns {Promise<UserInterface>}
     */
    public async findByUsername(username: string): Promise<UserInterface> {
        return await db.User.findOne({ where: { username: username } });
    }
}
