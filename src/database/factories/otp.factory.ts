import { UserInterface } from '../../interfaces/models/user.interface';
import { OtpInterface } from '../../interfaces/models/otp.interface';
import { OtpService } from '../../api/services/otp.service';

export default class OtpFactory {
    public async create(user: UserInterface): Promise<OtpInterface> {
        const service: OtpService = new OtpService();

        return await service.generateOtp(user.email);
    }
}
