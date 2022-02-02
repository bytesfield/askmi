import db from "../../src/database/models"
import UserFactory from "../../src/database/factories/user.factory";
import { OtpService } from "../../src/api/services/otp.service";
import { generateTokenData, verifyTokenData } from "../../src/types/custom";
import { generateRandomString } from "../../src/utils/helpers";
import { OtpInterface } from "../../src/interfaces/models/otp.interface";
import { HttpException } from "../api/exceptions";
import constants from "../../src/utils/constants.util";

let thisDb: any = db
var userFactory: UserFactory = new UserFactory();
var otpService: OtpService = new OtpService();

// Before any tests run, clear the DB and run migrations with Sequelize sync()
beforeAll(async () => {
    await thisDb.sequelize.sync({ force: true })
})

describe("Test Otp Jwt Service", () => {
    test('Can generate otp', async () => {
        const { user } = await userFactory.login({
            username: "otpUsername1", email: "otpUsername1@gmail.com"
        });

        const otp: OtpInterface = await otpService.generateOtp(user.email);

        expect(otp.email).toBe(user.email);
        expect(otp.token).toBeTruthy();
    });
});

afterAll(async () => {
    await thisDb.sequelize.close()
});