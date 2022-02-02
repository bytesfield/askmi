import db from "../../src/database/models"
import UserFactory from "../../src/database/factories/user.factory";
import { JwtService } from "../../src/api/services/jwt.service";
import { generateTokenData, verifyTokenData } from "../../src/types/custom";
import { generateRandomString } from "../../src/utils/helpers";

let thisDb: any = db
var userFactory: UserFactory = new UserFactory();
var jwtService: JwtService = new JwtService();

// Before any tests run, clear the DB and run migrations with Sequelize sync()
beforeAll(async () => {
    await thisDb.sequelize.sync({ force: true })
})

describe("Test Jwt Service", () => {
    test('Can generate token', async () => {
        const { user } = await userFactory.login({
            username: "jwtUsername1", email: "jwtUsername1@gmail.com"
        });

        const jwt: generateTokenData = await jwtService.generateToken(user);

        expect(jwt.payload.email).toBe(user.email);
        expect(jwt.token).toBeTruthy();
    });

    test('Can verify token', async () => {
        const { user } = await userFactory.login({
            username: "jwtUsername2", email: "jwtUsername2@gmail.com"
        });

        const { token }: generateTokenData = await jwtService.generateToken(user);

        const { verified }: verifyTokenData = await jwtService.verifyToken(token);

        expect(verified).toBe(true);
    });

    test('Can not verify invalid token', async () => {

        const token: string = generateRandomString({ length: 50, type: "base64" });

        const { verified }: verifyTokenData = await jwtService.verifyToken(token);

        expect(verified).toBe(false);
    });
});

afterAll(async () => {
    await thisDb.sequelize.close()
});