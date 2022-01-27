import { BaseRepository } from "./base.repository";

// now, we have all code implementation from BaseRepository
export class UserRepository extends BaseRepository<any>{

    /**
     * Find User by Email
     * 
     * @param email 
     * @returns Promise<any>
     */
    public async findUserByEmail(email: string): Promise<any> {
        const result = await this._model.findOne({ where: { email: email } });

        return result;
    }
}
