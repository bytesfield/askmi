import db from "../../src/database/models"
import UserFactory from "../../src/database/factories/user.factory";
import VoteFactory from "../../src/database/factories/vote.factory";
import { UserInterface } from "../../src/interfaces/models/user.interface";
import QuestionFactory from "../../src/database/factories/question.factory";
import AnswerFactory from "../../src/database/factories/answer.factory";
import { Helper } from "../helper";
import constants from "../../src/utils/constants.util";
import config from "../../src/config";
import faker from 'faker';
import { QuestionInterface } from "../../src/interfaces/models/question.interface";
import { AnswerInterface } from "../../src/interfaces/models/answer.interface";
import { AnswerRepository } from "../../src/api/repositories/answer.repository";

let thisDb: any = db
var userFactory: UserFactory = new UserFactory();
var voteFactory: VoteFactory = new VoteFactory();
var questionFactory: QuestionFactory = new QuestionFactory();
var answerFactory: AnswerFactory = new AnswerFactory();
var helper = new Helper();
var urlPrefix = '/api/questions';
var answerUrlPrefix = '/api/answers';

// Before any tests run, clear the DB and run migrations with Sequelize sync()
beforeAll(async () => {
    await thisDb.sequelize.sync({ force: true })
})

describe("Test Answers", () => {

    test('A user can answer a question', async () => {
        const { user, token } = await userFactory.login({
            username: "userAnswer10", email: "userAnswer10@gmail.com"
        });

        const authUser: UserInterface = await userFactory.create({
            username: 'authAnswerUser10',
            email: 'authAnswerUser10@gmail.com'
        });

        const question: QuestionInterface = await questionFactory.create({}, authUser);

        const response = await helper.request
            .post(`${urlPrefix}/${question.id}/answers`)
            .send({
                body: faker.lorem.paragraph(),
            })
            .expect(201)
            .set('Authorization', `Bearer ${token}`);

        expect(response.body.status).toBe(config.http.status.SUCCESS);
        expect(response.body.message).toBe(constants.messages.createdSuccess);
    });

    test('A user can not answer an invalid question', async () => {
        const { token } = await userFactory.login({
            username: "userAnswer11", email: "userAnswer11@gmail.com"
        });

        const response = await helper.request
            .post(`${urlPrefix}/1000/answers`)
            .send({
                body: faker.lorem.paragraph(),
            })
            .expect(404)
            .set('Authorization', `Bearer ${token}`);

        expect(response.body.status).toBe(config.http.status.FAILED);
        expect(response.body.message).toBe(constants.messages.notFound);
    });

    test('A user can retrieve answers of a question', async () => {
        const { user, token } = await userFactory.login({
            username: "userAnswer12", email: "userAnswer12@gmail.com"
        });

        const authUser: UserInterface = await userFactory.create({
            username: 'authAnswerUser12',
            email: 'authAnswerUser12@gmail.com'
        });

        const question: QuestionInterface = await questionFactory.create({}, authUser);

        const response = await helper.request
            .get(`${urlPrefix}/${question.id}/answers`)
            .expect(200)
            .set('Authorization', `Bearer ${token}`);

        expect(response.body.status).toBe(config.http.status.SUCCESS);
        expect(response.body.message).toBe(constants.messages.retrievedSuccess);
    });

    test('A user can not retrieve answers of invalid question', async () => {
        const { user, token } = await userFactory.login({
            username: "userAnswer13", email: "userAnswer13@gmail.com"
        });

        const authUser: UserInterface = await userFactory.create({
            username: 'authAnswerUser13',
            email: 'authAnswerUser13@gmail.com'
        });

        const question: QuestionInterface = await questionFactory.create({}, authUser);

        const response = await helper.request
            .get(`${urlPrefix}/2000/answers`)
            .expect(404)
            .set('Authorization', `Bearer ${token}`);

        expect(response.body.status).toBe(config.http.status.FAILED);
        expect(response.body.message).toBe(constants.messages.notFound);
    });

    test('A user can retrieve single answers of a question', async () => {
        const { user, token } = await userFactory.login({
            username: "userAnswer14", email: "userAnswer14@gmail.com"
        });

        const authUser: UserInterface = await userFactory.create({
            username: 'authAnswerUser14',
            email: 'authAnswerUser14@gmail.com'
        });

        const question: QuestionInterface = await questionFactory.create({}, user);

        const answer: AnswerInterface = await answerFactory.create({}, question.id, authUser);

        const response = await helper.request
            .get(`${answerUrlPrefix}/${answer.id}`)
            .expect(200)
            .set('Authorization', `Bearer ${token}`);

        expect(response.body.status).toBe(config.http.status.SUCCESS);
        expect(response.body.message).toBe(constants.messages.retrievedSuccess);
    });

    test('A user can update their answer', async () => {
        const { user, token } = await userFactory.login({
            username: "userAnswer15", email: "userAnswer15@gmail.com"
        });

        const authUser: UserInterface = await userFactory.create({
            username: 'authAnswerUser15',
            email: 'authAnswerUser15@gmail.com'
        });

        const question: QuestionInterface = await questionFactory.create({}, authUser);

        const answer: AnswerInterface = await answerFactory.create({}, question.id, user);

        const response = await helper.request
            .put(`${answerUrlPrefix}/${answer.id}`)
            .expect(200)
            .set('Authorization', `Bearer ${token}`);

        expect(response.body.status).toBe(config.http.status.SUCCESS);
        expect(response.body.message).toBe(constants.messages.updatedSuccess);
    });

    test('A user can not update someone else answer', async () => {
        const { user, token } = await userFactory.login({
            username: "userAnswer16", email: "userAnswer16@gmail.com"
        });

        const authUser: UserInterface = await userFactory.create({
            username: 'authAnswerUser16',
            email: 'authAnswerUser16@gmail.com'
        });

        const question: QuestionInterface = await questionFactory.create({}, user);

        const answer: AnswerInterface = await answerFactory.create({}, question.id, authUser);

        const response = await helper.request
            .put(`${answerUrlPrefix}/${answer.id}`)
            .expect(403)
            .set('Authorization', `Bearer ${token}`);

        expect(response.body.status).toBe(config.http.status.FAILED);
        expect(response.body.message).toBe(constants.messages.restrictedAccess);
    });

    test('A user can delete their answer', async () => {
        const { user, token } = await userFactory.login({
            username: "userAnswer17", email: "userAnswer17@gmail.com"
        });

        const authUser: UserInterface = await userFactory.create({
            username: 'authAnswerUser17',
            email: 'authAnswerUser17@gmail.com'
        });

        const question: QuestionInterface = await questionFactory.create({}, authUser);

        const answer: AnswerInterface = await answerFactory.create({}, question.id, user);

        const response = await helper.request
            .delete(`${answerUrlPrefix}/${answer.id}`)
            .expect(200)
            .set('Authorization', `Bearer ${token}`);

        expect(response.body.status).toBe(config.http.status.SUCCESS);
        expect(response.body.message).toBe(constants.messages.deletedSuccess);
    });

    test('A user can not delete someone else answer', async () => {
        const { user, token } = await userFactory.login({
            username: "userAnswer18", email: "userAnswer18@gmail.com"
        });

        const authUser: UserInterface = await userFactory.create({
            username: 'authAnswerUser18',
            email: 'authAnswerUser18@gmail.com'
        });

        const question: QuestionInterface = await questionFactory.create({}, user);

        const answer: AnswerInterface = await answerFactory.create({}, question.id, authUser);

        const response = await helper.request
            .delete(`${answerUrlPrefix}/${answer.id}`)
            .expect(403)
            .set('Authorization', `Bearer ${token}`);

        expect(response.body.status).toBe(config.http.status.FAILED);
        expect(response.body.message).toBe(constants.messages.restrictedAccess);
    });

    test('A user can mark answer to their question as best ', async () => {
        const { user, token } = await userFactory.login({
            username: "userAnswer19", email: "userAnswer19@gmail.com"
        });

        const authUser: UserInterface = await userFactory.create({
            username: 'authAnswerUser19',
            email: 'authAnswerUser19@gmail.com'
        });

        const question: QuestionInterface = await questionFactory.create({}, user);

        const answer: AnswerInterface = await answerFactory.create({}, question.id, authUser);

        const response = await helper.request
            .patch(`${answerUrlPrefix}/${answer.id}/best-answer`)
            .expect(200)
            .set('Authorization', `Bearer ${token}`);

        expect(response.body.status).toBe(config.http.status.SUCCESS);
        expect(response.body.message).toBe(constants.messages.bestAnswerSelectedSuccess);
    });

    test('A user can not mark answer to someone else question as best ', async () => {
        const { user, token } = await userFactory.login({
            username: "userAnswer20", email: "userAnswer20@gmail.com"
        });

        const authUser: UserInterface = await userFactory.create({
            username: 'authAnswerUser20',
            email: 'authAnswerUser20@gmail.com'
        });

        const question: QuestionInterface = await questionFactory.create({}, authUser);

        const answer: AnswerInterface = await answerFactory.create({}, question.id, user);

        const response = await helper.request
            .patch(`${answerUrlPrefix}/${answer.id}/best-answer`)
            .expect(403)
            .set('Authorization', `Bearer ${token}`);

        expect(response.body.status).toBe(config.http.status.FAILED);
        expect(response.body.message).toBe(constants.messages.restrictedAccess);
    });

    test('Should not mark as best answer if best answer already exist', async () => {
        const { user, token } = await userFactory.login({
            username: "userAnswer21", email: "userAnswer21@gmail.com"
        });

        const authUser: UserInterface = await userFactory.create({
            username: 'authAnswerUser21',
            email: 'authAnswerUser21@gmail.com'
        });

        const question: QuestionInterface = await questionFactory.create({}, user);

        const answer: AnswerInterface = await answerFactory.create({}, question.id, authUser);

        const answerRepo: AnswerRepository = new AnswerRepository(db.Answer);

        await answerRepo.update(answer.id, { isBest: true });

        const response = await helper.request
            .patch(`${answerUrlPrefix}/${answer.id}/best-answer`)
            .expect(400)
            .set('Authorization', `Bearer ${token}`);

        expect(response.body.status).toBe(config.http.status.FAILED);
        expect(response.body.message).toBe(constants.messages.bestAnswerAlreadyExists);
    });

});

describe("Test Voting", () => {

    test('A user can vote an answer', async () => {
        const { user, token } = await userFactory.login({
            username: "userVote1", email: "userVote1@gmail.com"
        });

        const authUser: UserInterface = await userFactory.create({
            username: 'authVoteUser1',
            email: 'authVoteUser1@gmail.com'
        });

        const question: QuestionInterface = await questionFactory.create({}, user);

        const answer: AnswerInterface = await answerFactory.create({}, question.id, authUser);

        const response = await helper.request
            .post(`${answerUrlPrefix}/${answer.id}/vote`)
            .send({
                vote: constants.votes.up,
            })
            .expect(200)
            .set('Authorization', `Bearer ${token}`);

        expect(response.body.status).toBe(config.http.status.SUCCESS);
        expect(response.body.message).toBe(constants.messages.createdSuccess);
    });

    test('A user can not vote their answer', async () => {
        const { user, token } = await userFactory.login({
            username: "userVote2", email: "userVote2@gmail.com"
        });

        const authUser: UserInterface = await userFactory.create({
            username: 'authVoteUser2',
            email: 'authVoteUser2@gmail.com'
        });

        const question: QuestionInterface = await questionFactory.create({}, authUser);

        const answer: AnswerInterface = await answerFactory.create({}, question.id, user);

        const response = await helper.request
            .post(`${answerUrlPrefix}/${answer.id}/vote`)
            .send({
                vote: constants.votes.up,
            })
            .expect(403)
            .set('Authorization', `Bearer ${token}`);

        expect(response.body.status).toBe(config.http.status.FAILED);
        expect(response.body.message).toBe(constants.messages.canNotVoteYourself);
    });

    test('A user can not vote twice', async () => {
        const { user, token } = await userFactory.login({
            username: "userVote3", email: "userVote3@gmail.com"
        });

        const authUser: UserInterface = await userFactory.create({
            username: 'authVoteUser3',
            email: 'authVoteUser3@gmail.com'
        });

        const question: QuestionInterface = await questionFactory.create({}, user);

        const answer: AnswerInterface = await answerFactory.create({}, question.id, authUser);

        await voteFactory.create({ vote: constants.votes.up }, answer.id, user);

        const response = await helper.request
            .post(`${answerUrlPrefix}/${answer.id}/vote`)
            .send({
                vote: constants.votes.up,
            })
            .expect(403)
            .set('Authorization', `Bearer ${token}`);

        expect(response.body.status).toBe(config.http.status.FAILED);
        expect(response.body.message).toBe(constants.messages.alreadyVoted);
    });

    test('A user can reverse vote', async () => {
        const { user, token } = await userFactory.login({
            username: "userVote4", email: "userVote4@gmail.com"
        });

        const authUser: UserInterface = await userFactory.create({
            username: 'authVoteUser4',
            email: 'authVoteUser4@gmail.com'
        });

        const question: QuestionInterface = await questionFactory.create({}, user);

        const answer: AnswerInterface = await answerFactory.create({}, question.id, authUser);

        await voteFactory.create({ vote: constants.votes.up }, answer.id, user);

        const response = await helper.request
            .post(`${answerUrlPrefix}/${answer.id}/vote`)
            .send({
                vote: constants.votes.down,
            })
            .expect(200)
            .set('Authorization', `Bearer ${token}`);

        expect(response.body.status).toBe(config.http.status.SUCCESS);
        expect(response.body.message).toBe(constants.messages.createdSuccess);
    });


    test('A user can remove vote', async () => {
        const { user, token } = await userFactory.login({
            username: "userVote5", email: "userVote5@gmail.com"
        });

        const authUser: UserInterface = await userFactory.create({
            username: 'authVoteUser5',
            email: 'authVoteUser5@gmail.com'
        });

        const question: QuestionInterface = await questionFactory.create({}, user);

        const answer: AnswerInterface = await answerFactory.create({}, question.id, authUser);

        await voteFactory.create({ vote: constants.votes.up }, answer.id, user);

        const response = await helper.request
            .delete(`${answerUrlPrefix}/${answer.id}/vote`)
            .expect(200)
            .set('Authorization', `Bearer ${token}`);

        expect(response.body.status).toBe(config.http.status.SUCCESS);
        expect(response.body.message).toBe(constants.messages.deletedSuccess);
    });


    test('A user can not remove if not voted', async () => {
        const { user, token } = await userFactory.login({
            username: "userVote6", email: "userVote6@gmail.com"
        });

        const authUser: UserInterface = await userFactory.create({
            username: 'authVoteUser6',
            email: 'authVoteUser6@gmail.com'
        });

        const question: QuestionInterface = await questionFactory.create({}, user);

        const answer: AnswerInterface = await answerFactory.create({}, question.id, authUser);

        const response = await helper.request
            .delete(`${answerUrlPrefix}/${answer.id}/vote`)
            .expect(403)
            .set('Authorization', `Bearer ${token}`);

        expect(response.body.status).toBe(config.http.status.FAILED);
        expect(response.body.message).toBe(constants.messages.notVoted);
    });

});
afterAll(async () => {
    await thisDb.sequelize.close()
});