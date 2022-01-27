import { BaseRepository } from "./base.repository";
import { Op } from "sequelize";


export class OtpRepository extends BaseRepository<any>{

    public async otpYetToExpire(email: string): Promise<any> {
        return await this._model.findOne({ where: { email: email, expiresAt: { [Op.gt]: Date.now() } } });
    }

    public async otpExpired(email: string): Promise<any> {
        return await this._model.findOne({ where: { email: email, expiresAt: { [Op.lt]: Date.now() } } });

    }
}
