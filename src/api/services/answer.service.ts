import db from "../../database/models";
import { AnswerInterface } from "../../interfaces/answer.interface";
import { AnswerInterface as AnswerModelInterface } from "../../interfaces/models/answer.interface";
import { UserInterface as UserModelInterface } from "../../interfaces/models/user.interface";
import { UserInterface } from "../../interfaces/models/user.interface";
import { isNull } from "../../utils/helpers.util";
import { HttpException } from "../exceptions";
import { AnswerRepository } from "../repositories/answer.repository";
import { QuestionService } from "./question.service";

var questionService: QuestionService = new QuestionService();
var answerRepo: AnswerRepository = new AnswerRepository(db.Answer);

export class AnswerService implements AnswerInterface {

    public async createAnswer(data: Record<string, string>, questionId: number, user: UserInterface): Promise<AnswerModelInterface> {

        await questionService.findQuestionById(questionId);

        const questionAnswers = await answerRepo.findByMultiple({ QuestionId: questionId });

        return await answerRepo.create({
            body: data.body,
            QuestionId: questionId,
            isFirst: isNull(questionAnswers) ? true : false,
            UserId: user.id
        });
    }

    /**
     * Find Answers by Question Id
     * 
     * @param {number} id 
     * 
     * @returns {Promise<AnswerModelInterface>}
     */
    public async findByQuestion(questionId: number): Promise<AnswerModelInterface> {
        await questionService.findQuestionById(questionId);

        return await answerRepo.findByMultiple({ QuestionId: questionId });

    }

    public async findAnswerById(answerId: number): Promise<AnswerModelInterface> {
        const answer: AnswerModelInterface = await answerRepo.findOne(answerId);

        if (isNull(answer)) {
            throw new HttpException('Answer was not found', 404);
        }

        return answer;
    }

    /**
     * Find a user answer to a question
     * 
     * @param {number} answerId
     * @param {UserModelInterface} user 
     * 
     * @returns {Promise<AnswerModelInterface>}
     */
    public async userAnswer(answerId: number, user: UserModelInterface): Promise<AnswerModelInterface> {

        const answer: AnswerModelInterface | any = await this.findAnswerById(answerId);

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
    * @param {UserModelInterface} user 
    * 
    * @returns {Promise<AnswerModelInterface>}
    */
    public async updateAnswer(id: number, item: object | any, user: UserModelInterface): Promise<AnswerModelInterface> {
        const answer: AnswerModelInterface | any = await this.findAnswerById(id);

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
     * @param {UserModelInterface} user 
     * 
     * @returns Promise<boolean>
     */
    public async deleteAnswer(id: number, user: UserModelInterface): Promise<boolean> {

        await this.findAnswerById(id);

        await this.userAnswer(id, user);

        return await answerRepo.delete(id);
    }
}