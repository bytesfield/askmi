import db from "../../src/database/models"
import UserFactory from "../../src/database/factories/user.factory"
import OtpFactory from "../../src/database/factories/otp.factory"
import { UserInterface } from "../../src/interfaces/models/user.interface";
import { JwtService } from "../../src/api/services/jwt.service";
import { Helper } from "../helper";
import constants from "../../src/utils/constants.util";
import config from "../../src/config";
import { OtpInterface } from "../../src/interfaces/models/otp.interface";
import { OtpService } from "../../src/api/services/otp.service";

let thisDb: any = db
var userFactory: UserFactory = new UserFactory();
var otpFactory: OtpFactory = new OtpFactory();
var jwtService: JwtService = new JwtService();
var helper = new Helper();
var urlPrefix = '/api/auth';

// Before any tests run, clear the DB and run migrations with Sequelize sync()
beforeAll(async () => {
    await thisDb.sequelize.sync({ force: true })
})

describe("Test the JWT authorization middleware", () => {
    test("should succeed when accessing an auth route with a valid JWT", async () => {
        const user: UserInterface = await userFactory.create();

        const { token } = await jwtService.generateToken(user);

        const response = await helper.request
            .get(`${urlPrefix}/protected`)
            .expect(200)
            .set("authorization", `Bearer ${token}`);

        expect(response.body.status).toEqual(config.http.status.SUCCESS);
        expect(response.body.message).toBe("Protected route accessed Successfully");


    });

    test("should fail when accessing an auth route with an invalid JWT", async () => {
        const invalidJwt = "InvalidJwtToken"

        const response = await helper.request
            .get(`${urlPrefix}/protected`)
            .expect(401)
            .set("authorization", `Bearer ${invalidJwt}`);

        expect(response.body.status).toEqual(config.http.status.FAILED);
        expect(response.body.message).toBe(constants.messages.unauthorizedToken);

    });

    test("should fail if no token is passed", async () => {
        const response = await helper.request
            .get(`${urlPrefix}/protected`)
            .expect(404)
            .set("authorization", ``);

        expect(response.body.status).toEqual(config.http.status.FAILED);
        expect(response.body.message).toBe(constants.messages.tokenRequired);

    });
});

describe("Test Register", () => {
    test("A user can create an account", async () => {
        const payload = {
            firstName: "John",
            lastName: "Doe",
            username: "johndoe",
            email: "johndoe@email.com",
            password: "Password@123"
        };
        const response = await helper.request
            .post(`${urlPrefix}/register`)
            .expect(201)
            .send(payload);

        expect(response.body.status).toBe(config.http.status.SUCCESS);
        expect(response.body.message).toBe(constants.messages.accountCreated);
    });

    test('A user can not create an account with an existing email', async () => {
        const payload = {
            firstName: "John",
            lastName: "Doe",
            username: "johndoe1",
            email: "johndoe1@email.com",
            password: "Password@123"
        };
        const user: UserInterface = await userFactory.create({ username: "user1", email: "user1@gmail.com" });
        payload.email = user.email;

        const response = await helper.request
            .post(`${urlPrefix}/register`)
            .expect(409)
            .send(payload);

        expect(response.body.status).toBe(config.http.status.FAILED);
        expect(response.body.message).toBe(constants.messages.emailExists);
    });

    test('A user can not create an account with an existing username', async () => {
        const payload = {
            firstName: "John",
            lastName: "Doe",
            username: "johndoe2",
            email: "johndoe2@email.com",
            password: "Password@123"
        };

        const user: UserInterface = await userFactory.create({ username: "user2", email: "user2@gmail.com" });
        payload.username = user.username;

        const response = await helper.request
            .post(`${urlPrefix}/register`)
            .expect(409)
            .send(payload);

        expect(response.body.status).toBe(config.http.status.FAILED);
        expect(response.body.message).toBe(constants.messages.usernameExists);
    });

    test('A user can not create an account with an invalid email', async () => {
        const payload = {
            firstName: "John",
            lastName: "Doe",
            username: "johndoe3",
            email: "johndoe3@email.com",
            password: "Password@123"
        };

        await userFactory.create({ username: "user3", email: "user3@gmail.com" });
        payload.email = 'invalidEmail';

        const response = await helper.request
            .post(`${urlPrefix}/register`)
            .expect(500)
            .send(payload);

        expect(response.body.status).toBe(config.http.status.FAILED);
        expect(response.body.message).toBe("Validation error: Validation isEmail on email failed");
    });
});


describe('Test Login', () => {
    test('A user can login into his account with a valid credential.', async () => {
        const user: UserInterface = await userFactory.create({ username: "user4", email: "user4@gmail.com" });

        const response = await helper.request
            .post(`${urlPrefix}/login`)
            .expect(200)
            .send({
                email: user.email,
                password: "Password@123"
            });

        expect(response.body.status).toBe(config.http.status.SUCCESS);
        expect(response.body.message).toBe(constants.messages.loginSuccess);
        expect(response.body.data).toHaveProperty('token');
    });

    test('A user can not login an account with an invalid email', async () => {
        await userFactory.create({ username: "user5", email: "user5@gmail.com" });

        const response = await helper.request
            .post(`${urlPrefix}/register`)
            .expect(422)
            .send({
                email: 'email',
                password: '123456'
            });

        expect(response.body.status).toBe(config.http.status.FAILED);
    });

    test('A user can not login with an invalid credential.', async () => {
        const user: UserInterface = await userFactory.create({ username: "user6", email: "user6@gmail.com" });

        const response = await helper.request
            .post(`${urlPrefix}/login`)
            .expect(400)
            .send({
                email: user.email,
                password: 'password123'
            });

        expect(response.body.status).toBe(config.http.status.FAILED);
        expect(response.body.message).toBe(constants.messages.invalidCredentials);
    });
});

describe('Test Verify Email', () => {

    test('A user can verify email', async () => {

        const user: UserInterface = await userFactory.create({ username: "user7", email: "user7@gmail.com" });

        const otp: OtpInterface = await otpFactory.create(user);
        const token: string = otp.token;
        const userId: number = user.id;

        const response = await helper.request
            .get(`${urlPrefix}/verification/verify-account/${userId}/${token}`)
            .expect(200);

        expect(response.body.status).toEqual(config.http.status.SUCCESS);
        expect(response.body.message).toBe(constants.messages.accountActivated);
    });

    test("Should not verify email if user does not exist", async () => {

        const user: UserInterface = await userFactory.create({ username: "user8", email: "user8@gmail.com" });

        const otp: OtpInterface = await otpFactory.create(user);
        const token: string = otp.token;
        const userId: number = 10000;

        const response = await helper.request
            .get(`${urlPrefix}/verification/verify-account/${userId}/${token}`)
            .expect(404);

        expect(response.body.status).toEqual(config.http.status.FAILED);
        expect(response.body.message).toBe(constants.messages.notFound);
    });

    test("Should not verify email if Activation link has expired or already used", async () => {

        const user: UserInterface = await userFactory.create({ username: "user9", email: "user9@gmail.com" });

        const otp: OtpInterface = await otpFactory.create(user);
        const token: string = otp.token;
        const userId: number = user.id;

        const otpService: OtpService = new OtpService();

        await otpService.deleteOtp(otp.id);

        const response = await helper.request
            .get(`${urlPrefix}/verification/verify-account/${userId}/${token}`)
            .expect(409);

        expect(response.body.status).toEqual(config.http.status.FAILED);
        expect(response.body.message).toBe(constants.messages.invalidActivationLink);
    });

    test("Should verify email activation link was sent", async () => {

        const user: UserInterface = await userFactory.create({ username: "user11", email: "user11@gmail.com" });

        const { token } = await jwtService.generateToken(user);

        const response = await helper.request
            .get(`${urlPrefix}/verification/get-activation-email`)
            .expect(200)
            .set("authorization", `Bearer ${token}`);

        expect(response.body.status).toEqual(config.http.status.SUCCESS);
        expect(response.body.message).toBe(constants.messages.activationEmailSent);

    });
});

// After all test have finished, close the DB connection
afterAll(async () => {
    await thisDb.sequelize.close()
});
