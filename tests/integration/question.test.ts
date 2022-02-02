import db from "../../src/database/models"
import UserFactory from "../../src/database/factories/user.factory";
import QuestionFactory from "../../src/database/factories/question.factory";
import { UserInterface } from "../../src/interfaces/models/user.interface";
import { JwtService } from "../../src/api/services/jwt.service";
import { Helper } from "../helper";
import constants from "../../src/utils/constants.util";
import config from "../../src/config";
import faker from 'faker';
import { QuestionInterface } from "../../src/interfaces/models/question.interface";

let thisDb: any = db;
var userFactory: UserFactory = new UserFactory();
var questionFactory: QuestionFactory = new QuestionFactory();
var jwtService: JwtService = new JwtService();
var helper = new Helper();
var urlPrefix = '/api/questions';

// Before any tests run, clear the DB and run migrations with Sequelize sync()
beforeAll(async () => {
    await thisDb.sequelize.sync({ force: true })
})

describe("Test Questions", () => {

    const questionPayload = {
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraph(),
    };

    test('A user can ask a question', async () => {
        const { token } = await userFactory.login({
            username: "username10", email: "username10@gmail.com"
        });

        const response = await helper.request
            .post(`${urlPrefix}`)
            .send({
                title: faker.lorem.sentence(),
                body: faker.lorem.paragraph(),
            })
            .expect(201)
            .set('Authorization', `Bearer ${token}`);

        expect(response.body.status).toBe(config.http.status.SUCCESS);
        expect(response.body.message).toBe(constants.messages.createdSuccess);
    });

    test('A user can ask a question without the required parameters', async () => {
        const { token } = await userFactory.login({
            username: "username11", email: "username11@gmail.com"
        });

        const response = await helper.request
            .post(`${urlPrefix}`)
            .expect(500)
            .set('Authorization', `Bearer ${token}`);

        expect(response.body.status).toBe(config.http.status.FAILED);
    });

    test('A user can edit his own question.', async () => {
        const { user, token } = await userFactory.login({
            username: "username12", email: "username12@gmail.com"
        });

        const question: QuestionInterface = await questionFactory.create({}, user);

        const response = await helper.request
            .put(`${urlPrefix}/${question.id}`)
            .send(questionPayload)
            .expect(200)
            .set('Authorization', `Bearer ${token}`);

        expect(response.body.status).toBe(config.http.status.SUCCESS);
        expect(response.body.message).toBe(constants.messages.updatedSuccess);
    });

    test('A user can delete his own question.', async () => {
        const { user, token } = await userFactory.login({
            username: "username14", email: "username14@gmail.com"
        });

        const question: QuestionInterface = await questionFactory.create({}, user);

        const response = await helper.request
            .delete(`${urlPrefix}/${question.id}`)
            .expect(200)
            .set('Authorization', `Bearer ${token}`);

        expect(response.body.status).toBe(config.http.status.SUCCESS);
        expect(response.body.message).toBe(constants.messages.deletedSuccess);
    });

});

test('A user can not delete someone else question.', async () => {
    const { user } = await userFactory.login({
        username: "username15", email: "username15@gmail.com"
    });

    const question: QuestionInterface = await questionFactory.create({}, user);

    const authUser: UserInterface = await userFactory.create({
        username: 'auth15',
        email: 'auth15@gmail.com'
    });

    const { token } = await jwtService.generateToken(authUser);

    const response = await helper.request
        .delete(`${urlPrefix}/${question.id}`)
        .expect(403)
        .set('Authorization', `Bearer ${token}`);

    expect(response.body.status).toBe(config.http.status.FAILED);
    expect(response.body.message).toBe(constants.messages.restrictedAccess);
});

test('A user can subscribe to a question.', async () => {
    const { user } = await userFactory.login({
        username: "username16", email: "username16@gmail.com"
    });

    const authUser = await userFactory.login({
        username: "authUser16", email: "authuser16@gmail.com"
    });

    const question: QuestionInterface = await questionFactory.create({}, user);

    const response = await helper.request
        .post(`${urlPrefix}/${question.id}/subscribe`)
        .expect(200)
        .set('Authorization', `Bearer ${authUser.token}`);

    expect(response.body.status).toBe(config.http.status.SUCCESS);
    expect(response.body.message).toBe(constants.messages.subscribedToQuestion);
});

test('A user can not subscribe to a question he is already subscribed to.', async () => {
    const { user, token } = await userFactory.login({
        username: "username17", email: "username17@gmail.com"
    });

    const question: QuestionInterface = await questionFactory.create({}, user);

    const response = await helper.request
        .post(`${urlPrefix}/${question.id}/subscribe`)
        .expect(403)
        .set('Authorization', `Bearer ${token}`);

    expect(response.body.status).toBe(config.http.status.FAILED);
    expect(response.body.message).toBe(constants.messages.alreadySubscribed);
});

test('A user can unsubscribe from a question.', async () => {
    const { user, token } = await userFactory.login({
        username: "username18", email: "username18@gmail.com"
    });

    const question: QuestionInterface = await questionFactory.create({}, user);

    const response = await helper.request
        .post(`${urlPrefix}/${question.id}/unsubscribe`)
        .expect(200)
        .set('Authorization', `Bearer ${token}`);

    expect(response.body.status).toBe(config.http.status.SUCCESS);
    expect(response.body.message).toBe(constants.messages.unsubscribedFromQuestion);
});

test('A user can not unsubscribe from a question he is not subscribed to.', async () => {
    const { user } = await userFactory.login({
        username: "username19", email: "username19@gmail.com"
    });

    const question: QuestionInterface = await questionFactory.create({}, user);

    const authUser = await userFactory.login({
        username: "authUser19", email: "authuser19@gmail.com"
    });

    const response = await helper.request
        .post(`${urlPrefix}/${question.id}/unsubscribe`)
        .expect(403)
        .set('Authorization', `Bearer ${authUser.token}`);

    expect(response.body.status).toBe(config.http.status.FAILED);
    expect(response.body.message).toBe(constants.messages.notSubscribed);
});

afterAll(async () => {
    await thisDb.sequelize.close()
});