import db from "../../database/models";
import { QuestionInterface } from "../../interfaces/question.interface";
import { QuestionRepository } from "../repositories/question.repository";
import paginator from '../../utils/paginator.util';
import { slugify } from '../../utils/string.util';
import PaginationInterface from '../../interfaces/pagination.interface';
import { UserInterface as UserModelInterface } from "../../interfaces/models/user.interface";
import { QuestionInterface as QuestionModelInterface } from "../../interfaces/models/question.interface";
import { SubscriptionService } from "./subscription.service";

var questionRepo: QuestionRepository = new QuestionRepository(db.Question);

export class QuestionService implements QuestionInterface {

    /**
     * Create a new Question
     * 
     * @param object item 
     * 
     * @returns Promise<UserInterface>
     */
    public async findAllQuestions(query: Record<string, any> = {}): Promise<PaginationInterface<UserModelInterface>> {

        const total: number = await questionRepo.count();

        const { page, limit, skip, pageCount } = paginator(total, query);

        const condition = { limit: limit, offset: skip, include: db.User };


        const records = await questionRepo.findAllWithCondition(condition);

        return { page, pageCount, limit, total, records };
    }

    /**
     * Create a new Question
     * 
     * @param object item 
     * 
     * @returns Promise<QuestionModelInterface>
     */
    public async createQuestion(data: Record<string, string>, user: UserModelInterface): Promise<QuestionModelInterface> {
        const title: string = data.title;
        const slug: string = slugify(title);

        var subscriptionService: SubscriptionService = new SubscriptionService();

        const question: QuestionModelInterface = await questionRepo.create({
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
     * @param id 
     * 
     * @returns Promise<QuestionModelInterface>
     */
    public async findQuestionById(id: number): Promise<QuestionModelInterface> {
        return await questionRepo.findOne(id);
    }

    /**
     * Update a Question
     * 
     * @param number id 
     * @param object item 
     * 
     * @returns Promise<QuestionModelInterface>
     */
    public async updateQuestion(id: number, item: object): Promise<QuestionModelInterface> {
        return await questionRepo.update(id, item);
    }

    /**
     * Find question by multiple conditions
     * 
     * @param object obj 
     * 
     * @returns Promise<QuestionModelInterface>
     */
    public async findQuestionByMultiple(obj: object): Promise<QuestionModelInterface> {
        return await questionRepo.findByMultiple(obj);
    }

    /**
     * Delete a question
     * 
     * @param number id 
     * 
     * @returns Promise<boolean>
     */
    public async deleteQuestion(id: number): Promise<boolean> {
        return await questionRepo.delete(id);
    }
}