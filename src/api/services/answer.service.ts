import db from "../../database/models";
import { AnswerInterface } from "../../interfaces/models/answer.interface";
import { QuestionInterface } from "../../interfaces/models/question.interface";
import { UserInterface } from "../../interfaces/models/user.interface";
import { isNull } from "../../utils/helpers.util";
import { HttpException } from "../exceptions";
import { AnswerRepository } from "../repositories/answer.repository";
import { QuestionRepository } from "../repositories/question.repository";
import { NotificationService } from "./notification.service";
import { QuestionService } from "./question.service";

var questionService: QuestionService = new QuestionService();
var answerRepo: AnswerRepository = new AnswerRepository(db.Answer);
var notificationService = new NotificationService();
export class AnswerService implements AnswerInterface {
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    id!: number;
    body!: string;
    isFirst!: boolean;
    isBest!: boolean;

    public async createAnswer(data: Record<string, string>, questionId: number, user: UserInterface): Promise<AnswerInterface> {

        const question: QuestionInterface = await questionService.findQuestionById(questionId);

        const questionAnswers = await answerRepo.findByMultiple({ QuestionId: questionId });

        const answer: AnswerInterface = await answerRepo.create({
            body: data.body,
            QuestionId: questionId,
            isFirst: isNull(questionAnswers) ? true : false,
            UserId: user.id
        });

        await notificationService.sendAnswerNotification(question, user);

        const questionRepo: QuestionRepository = new QuestionRepository(db.Question);

        await questionRepo.update(questionId, { isAnswered: true });

        return answer;

    }

    /**
     * Find Answers by Question Id
     * 
     * @param {number} questionId 
     * 
     * @returns {Promise<AnswerInterface>}
     */
    public async findByQuestion(questionId: number): Promise<AnswerInterface> {
        await questionService.findQuestionById(questionId);

        return await answerRepo.findByMultiple({ QuestionId: questionId });

    }

    /**
     * Find Answer by Id
     * 
     * @param {number} answerId 
     * @returns {Promise<AnswerInterface>}
     */
    public async findAnswerById(answerId: number): Promise<AnswerInterface> {
        const answer: AnswerInterface = await answerRepo.findOne(answerId);

        if (isNull(answer)) {
            throw new HttpException('Answer was not found', 404);
        }

        return answer;
    }

    /**
     * Find a user answer to a question
     * 
     * @param {number} answerId
     * @param {UserInterface} user 
     * 
     * @returns {Promise<AnswerInterface>}
     */
    public async userAnswer(answerId: number, user: UserInterface): Promise<AnswerInterface> {

        const answer: AnswerInterface | any = await this.findAnswerById(answerId);

        if (answer.UserId != user.id) {
            throw new HttpException("Answer not created by user", 403);
        }

        return answer;
    }

    /**
    * User update answer 
    * 
    * @param {number} id 
    * @param {object} item 
    * @param {UserInterface} user 
    * 
    * @returns {Promise<AnswerInterface>}
    */
    public async updateAnswer(id: number, item: object | any, user: UserInterface): Promise<AnswerInterface> {
        const answer: AnswerInterface | any = await this.findAnswerById(id);

        if (answer.UserId != user.id) {
            throw new HttpException("Answer not created by user", 403);
        }

        await answerRepo.update(id, item);

        return await this.findAnswerById(id);
    }

    /**
     * Delete an answer
     * 
     * @param {number} id 
     * @param {UserInterface} user 
     * 
     * @returns Promise<boolean>
     */
    public async deleteAnswer(id: number, user: UserInterface): Promise<boolean> {

        await this.findAnswerById(id);

        await this.userAnswer(id, user);

        return await answerRepo.delete(id);
    }

    /**
     * Mark an answer as best
     * 
     * @param {number} answerId 
     * @param {UserInterface} user 
     * 
     * @returns {Promise<AnswerInterface>}
     */
    public async markAsBestAnswer(answerId: number, user: UserInterface): Promise<AnswerInterface> {
        const answer: AnswerInterface | any = await this.findAnswerById(answerId);

        const bestAnswer: AnswerInterface = await answerRepo.findByMultiple({
            QuestionId: answer.QuestionId, isBest: true
        });

        if (!isNull(bestAnswer)) {
            throw new HttpException("Best answer already exist", 400);
        }

        const question = await answer.getQuestion();

        if (question.UserId !== user.id) {
            throw new HttpException("You dont have access to mark As Best Answer", 403);
        }

        await this.updateAnswer(answerId, { isBest: true }, user);

        await notificationService.sendBestAnswerNotification(answer, user);

        return answer;
    }
}