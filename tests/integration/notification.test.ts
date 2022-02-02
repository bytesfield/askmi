
import db from "../../src/database/models"
import UserFactory from "../../src/database/factories/user.factory"
import { Helper } from "../helper";
import constants from "../../src/utils/constants.util";
import config from "../../src/config";
import { NotificationService } from "../../src/api/services/notification.service";

let thisDb: any = db
var userFactory: UserFactory = new UserFactory();
var helper = new Helper();
var urlPrefix = '/api/user';

beforeAll(async () => {
    await thisDb.sequelize.sync({ force: true })
})

describe("Test Notifications", () => {

    test('As a user can view notifications', async () => {
        const { user, token } = await userFactory.login({ username: "username3", email: "username3@gmail.com" });

        const notificationService = new NotificationService();
        await notificationService.notifyReceiver(user.id, 'Test notification', 'Hello world');

        const response = await helper.request
            .get(`${urlPrefix}/notifications`)
            .expect(200)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe(config.http.status.SUCCESS);
        expect(response.body.data.length).toBe(1);
        expect(response.body.message).toBe(constants.messages.retrievedSuccess);
    });

    test('As a user can mark notification as read', async () => {
        const { user, token } = await userFactory.login({ username: "username4", email: "username4@gmail.com" });

        const notificationService = new NotificationService();

        const notification = await notificationService.notifyReceiver(
            user.id,
            'Test notification',
            'Hello world'
        );

        const response = await helper.request
            .post(`${urlPrefix}/notifications/${notification.id}/read`)
            .expect(200)
            .set('Authorization', `Bearer ${token}`);

        expect(response.body.status).toBe(config.http.status.SUCCESS);
        expect(response.body.message).toBe(constants.messages.markNotificationAsRead);
    });

    test('As a user can not mark an invalid notification as read', async () => {
        const { token } = await userFactory.login({ username: "username5", email: "username5@gmail.com" });

        const response = await helper.request
            .post(`${urlPrefix}/notifications/22222/read`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(404);
        expect(response.body.status).toBe(config.http.status.FAILED);
        expect(response.body.message).toBe(constants.messages.notFound);
    });
});

// After all test have finished, close the DB connection
afterAll(async () => {
    await thisDb.sequelize.close()
});