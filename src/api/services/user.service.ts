import { UserInterface } from "../../interfaces/user.interface";
import { UserRepository } from "../repositories/user.repository";
import db from "../../database/models";
import { Op } from "sequelize";
import { isNull } from "../../utils/helpers.util";

var userRepo: UserRepository = new UserRepository(db.User);

export class UserService implements UserInterface {

    /**
     * Create a new User
     * 
     * @param object item 
     * 
     * @returns Promise<any>
     */
    public async createUser(item: object): Promise<typeof db.User> {
        return await userRepo.create(item);
    }

    /**
     * Update a User
     * 
     * @param number id 
     * @param object item 
     * 
     * @returns Promise<any>
     */
    public async updateUser(id: number, item: object): Promise<typeof db.User> {
        return await userRepo.update(id, item);
    }

    /**
     * Find a user by Id
     * @param id 
     * 
     * @returns Promise<string>
     */
    public async findUserById(id: number): Promise<typeof db.User> {
        return await userRepo.findOne(id);
    }

    /**
     * Find a user by Email
     * 
     * @param string email 
     * 
     * @returns Promise<typeof db.User>
     */
    public async findUserByEmail(email: string): Promise<typeof db.User> {
        return await userRepo.findUserByEmail(email);
    }

    /**
     * Find user by multiple conditions
     * 
     * @param object obj 
     * 
     * @returns Promise<typeof db.User>
     */
    public async findUserByMultiple(obj: object): Promise<typeof db.User> {
        return await userRepo.findByMultiple(obj);
    }

    /**
     * Find user by multiple conditions
     * 
     * @param object obj 
     * 
     * @returns Promise<typeof db.User>
     */
    public async isUserActivated(user: typeof db.User): Promise<boolean> {
        return isNull(user.emailVerifiedAt) ? false : true;
    }

    /**
     * Delete a user
     * 
     * @param number id 
     * 
     * @returns Promise<boolean>
     */
    public async deleteUser(id: number): Promise<boolean> {
        return await userRepo.delete(id);
    }

    /**
     * Delete a user with multiple conditions
     * 
     * @param object obj 
     * 
     * @returns Promise<boolean>
     */
    public async deleteUserMultiple(obj: object): Promise<boolean> {
        return await userRepo.deleteMultiple(obj);
    }

}