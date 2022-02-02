import db from "../../database/models";
import { QuestionRepository } from "../repositories/question.repository";
import paginator from '../../utils/paginator.util';
import { slugify } from '../../utils/string.util';
import PaginationInterface from '../../interfaces/pagination.interface';
import { UserInterface } from "../../interfaces/models/user.interface";
import { QuestionInterface } from "../../interfaces/models/question.interface";
import { SubscriptionService } from "./subscription.service";
import { isNull } from "../../utils/helpers.util";
import { HttpException } from "../exceptions";
import constants from '../../utils/constants.util';

var questionRepo: QuestionRepository = new QuestionRepository(db.Question);

export class QuestionService implements QuestionInterface {
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    id!: number;
    title!: string;
    slug!: string;
    body!: string;
    isAnswered!: boolean;

    /**
     * Create a new Question
     * 
     * @param {object} item 
     * 
     * @returns {Promise<PaginationInterface<QuestionInterface>>}
     */
    public async findAllQuestions(query: Record<string, any> = {}): Promise<PaginationInterface<QuestionInterface>> {

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
     * @returns {Promise<QuestionInterface>}
     */
    public async createQuestion(data: Record<string, string>, user: UserInterface): Promise<QuestionInterface> {
        const title: string = data.title;
        const slug: string = slugify(title);

        const question = await questionRepo.create({
            title: title,
            slug: slug,
            body: data.body,
            UserId: user.id
        });

        const subscriptionService: SubscriptionService = new SubscriptionService();

        await subscriptionService.subscribe(question.id, user);

        return question;
    }

    /**
     * Find a question by Id
     * 
     * @param {number} id 
     * 
     * @returns {Promise<QuestionInterface>}
     */
    public async findQuestionById(id: number): Promise<QuestionInterface> {

        const question: QuestionInterface = await questionRepo.findOne(id);

        if (isNull(question)) {
            throw new HttpException(constants.messages.notFound, 404);
        }

        return question;
    }

    /**
     * Find a user question
     * 
     * @param {number} id 
     * @param {UserInterface} user 
     * 
     * @returns {Promise<QuestionInterface>}
     */
    public async userQuestion(id: number, user: UserInterface): Promise<QuestionInterface> {

        const question = await questionRepo.findByMultiple({ id: id, UserId: user.id });

        if (isNull(question)) {
            throw new HttpException(constants.messages.restrictedAccess, 403);

        }

        return question;
    }

    /**
     * Update a Question
     * 
     * @param {number} id 
     * @param {object} item 
     * @param {UserInterface} user 
     * 
     * @returns {Promise<QuestionInterface>}
     */
    public async updateQuestion(id: number, item: object | any, user: UserInterface): Promise<QuestionInterface> {
        const question: QuestionInterface | any = await this.findQuestionById(id);

        if (user && question.UserId !== user.id) {
            throw new HttpException(constants.messages.restrictedAccess, 403);
        }

        const title: string = item.title;
        const slug: string = slugify(title);

        await questionRepo.update(id, {
            title: title,
            slug: slug,
            body: item.body,
        });

        return question;
    }

    /**
     * Find question by multiple conditions
     * 
     * @param {object} obj 
     * 
     * @returns {Promise<QuestionInterface>}
     */
    public async findQuestionByMultiple(obj: object): Promise<QuestionInterface> {
        return await questionRepo.findByMultiple(obj);
    }

    /**
     * Delete a question
     * 
     * @param {number} id 
     * @param {UserInterface} user 
     * 
     * @returns Promise<boolean>
     */
    public async deleteQuestion(id: number, user: UserInterface): Promise<boolean> {

        await this.findQuestionById(id);

        await this.userQuestion(id, user);

        return await questionRepo.delete(id);
    }
}