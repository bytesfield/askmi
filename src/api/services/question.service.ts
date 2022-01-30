import db from "../../database/models";
import { QuestionInterface } from "../../interfaces/question.interface";
import { QuestionRepository } from "../repositories/question.repository";
import paginator from '../../utils/paginator.util';
import { slugify } from '../../utils/string.util';
import PaginationInterface from '../../interfaces/pagination.interface';
import { UserInterface as UserModelInterface } from "../../interfaces/models/user.interface";
import { QuestionInterface as QuestionModelInterface } from "../../interfaces/models/question.interface";
import { SubscriptionService } from "./subscription.service";
import { isNull } from "../../utils/helpers.util";
import { HttpException } from "../exceptions";

var questionRepo: QuestionRepository = new QuestionRepository(db.Question);
var subscriptionService: SubscriptionService = new SubscriptionService();

export class QuestionService implements QuestionInterface {

    /**
     * Create a new Question
     * 
     * @param {object} item 
     * 
     * @returns {Promise<PaginationInterface<QuestionModelInterface>>}
     */
    public async findAllQuestions(query: Record<string, any> = {}): Promise<PaginationInterface<QuestionModelInterface>> {

        const total: number = await questionRepo.count();

        const { page, limit, skip, pageCount } = paginator(total, query);

        const condition = { limit: limit, offset: skip, include: db.User };

        const records = await questionRepo.findAllWithCondition(condition);

        return { page, pageCount, limit, total, records };
    }

    /**
     * Create a new Question
     * 
     * @param {object} item 
     * 
     * @returns {Promise<QuestionModelInterface>}
     */
    public async createQuestion(data: Record<string, string>, user: UserModelInterface): Promise<QuestionModelInterface> {
        const title: string = data.title;
        const slug: string = slugify(title);

        const question = await questionRepo.create({
            title: title,
            slug: slug,
            body: data.body,
            UserId: user.id
        });

        subscriptionService.subscribe(question.id, user);

        return question;
    }

    /**
     * Find a question by Id
     * 
     * @param {number} id 
     * 
     * @returns {Promise<QuestionModelInterface>}
     */
    public async findQuestionById(id: number): Promise<QuestionModelInterface> {

        const question: QuestionModelInterface = await questionRepo.findOne(id);

        if (isNull(question)) {
            throw new HttpException('Question was not found', 404);
        }

        return question;
    }

    /**
     * Find a user question
     * 
     * @param {number} id 
     * @param {UserModelInterface} user 
     * 
     * @returns {Promise<QuestionModelInterface>}
     */
    public async userQuestion(id: number, user: UserModelInterface): Promise<QuestionModelInterface> {

        const question = await questionRepo.findByMultiple({ id: id, UserId: user.id });

        if (isNull(question)) {
            throw new HttpException("Question not created by user", 403);

        }

        return question;
    }

    /**
     * Update a Question
     * 
     * @param {number} id 
     * @param {object} item 
     * @param {UserModelInterface} user 
     * 
     * @returns {Promise<QuestionModelInterface>}
     */
    public async updateQuestion(id: number, item: object | any, user: UserModelInterface): Promise<QuestionModelInterface> {
        await this.findQuestionById(id);

        await this.userQuestion(id, user);

        const title: string = item.title;
        const slug: string = slugify(title);

        await questionRepo.update(id, {
            title: title,
            slug: slug,
            body: item.body,
        });

        return await this.userQuestion(id, user);;
    }

    /**
     * Find question by multiple conditions
     * 
     * @param {object} obj 
     * 
     * @returns {Promise<QuestionModelInterface>}
     */
    public async findQuestionByMultiple(obj: object): Promise<QuestionModelInterface> {
        return await questionRepo.findByMultiple(obj);
    }

    /**
     * Delete a question
     * 
     * @param {number} id 
     * @param {UserModelInterface} user 
     * 
     * @returns Promise<boolean>
     */
    public async deleteQuestion(id: number, user: UserModelInterface): Promise<boolean> {

        await this.findQuestionById(id);

        await this.userQuestion(id, user);

        return await questionRepo.delete(id);
    }
}