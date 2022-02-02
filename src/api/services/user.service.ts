import { UserRepository } from "../repositories/user.repository";
import db from "../../database/models";
import { compare, isNull } from "../../utils/helpers.util";
import { UserInterface, UserLoginInterface } from "../../interfaces/models/user.interface";
import { HttpException } from "../exceptions";
import { JwtService } from "./jwt.service";
import constants from "../../utils/constants.util";

var userRepo: UserRepository = new UserRepository(db.User);

export class UserService implements UserInterface {
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    id!: number;
    firstName!: string;
    lastName!: string;
    username!: string;
    email!: string;
    password!: string;
    emailVerifiedAt!: Date;

    /**
     * Create a new User
     * 
     * @param {object} item 
     * 
     * @returns {Promise<UserInterface>}
     */
    public async createUser(item: any): Promise<UserInterface> {
        return await userRepo.create(item);
    }

    /**
     * Update a User
     * 
     * @param {number} id 
     * @param {object} item 
     * 
     * @returns {Promise<UserInterface>}
     */
    public async updateUser(id: number, item: any): Promise<UserInterface> {
        return await userRepo.update(id, item);
    }

    /**
     * Find a user by Id
     * @param id 
     * 
     * @returns {Promise<UserInterface>}
     */
    public async findUserById(id: number): Promise<UserInterface> {
        return await userRepo.findOne(id);
    }

    /**
     * Find a user by Email
     * 
     * @param {string} email 
     * 
     * @returns {Promise<UserInterface>}
     */
    public async findUserByEmail(email: string): Promise<UserInterface> {
        return await userRepo.findUserByEmail(email);
    }

    /**
     * Find a user by Username
     * 
     * @param {string} username 
     * 
     * @returns {Promise<UserInterface>}
     */
    public async findUserByUsername(username: string): Promise<UserInterface> {
        return await userRepo.findByUsername(username);
    }

    /**
     * Find user by multiple conditions
     * 
     * @param {object} obj 
     * 
     * @returns {Promise<UserInterface>}
     */
    public async findUserByMultiple(obj: object): Promise<UserInterface> {
        return await userRepo.findByMultiple(obj);
    }

    /**
     * Find user by multiple conditions
     * 
     * @param {object} obj 
     * 
     * @returns {Promise<boolean>}
     */
    public async isUserActivated(user: typeof db.User): Promise<boolean> {
        return isNull(user.emailVerifiedAt) ? false : true;
    }

    /**
     * Delete a user
     * 
     * @param {number} id 
     * 
     * @returns {Promise<boolean>}
     */
    public async deleteUser(id: number): Promise<boolean> {
        return await userRepo.delete(id);
    }

    /**
     * Delete a user with multiple conditions
     * 
     * @param {object} obj 
     * 
     * @returns {Promise<boolean>}
     */
    public async deleteUserMultiple(obj: object): Promise<boolean> {
        return await userRepo.deleteMultiple(obj);
    }

    public async login(data: UserLoginInterface): Promise<{ user: UserInterface; token: string; }> {
        const user: UserInterface = await userRepo.findUserByEmail(data.email);

        const passwordMatches = user && (await compare(data.password, user.password));

        if (!(user && passwordMatches)) {
            throw new HttpException(constants.messages.invalidCredentials, 400);
        }

        const jwtService: JwtService = new JwtService();

        const { token } = await jwtService.generateToken(user);

        return {
            user,
            token
        };
    }

}