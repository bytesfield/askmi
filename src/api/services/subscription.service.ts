import db from "../../database/models";
import { QuestionInterface } from "../../interfaces/models/question.interface";
import { UserInterface } from "../../interfaces/models/user.interface";
import { SubscribersInterface } from "../../interfaces/models/subscribers.interface";
import { isNull } from "../../utils/helpers.util";
import HttpException from "../exceptions/http.exception";
import { SubscriptionRepository } from "../repositories/subscription.repository";
import { QuestionService } from "./question.service";
import constants from '../../utils/constants.util';

export class SubscriptionService implements SubscribersInterface {
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    QuestionId!: number;
    UserId!: number;

    /**
     * A user subscribes to a question 
     * 
     * @param {number} questionId 
     * @param {UserInterface} user 
     * 
     * @returns {Promise<QuestionInterface>}
     */
    public async subscribe(questionId: number, user: UserInterface): Promise<QuestionInterface> {
        const questionService: QuestionService = new QuestionService();

        const subscriptionRepository: SubscriptionRepository = new SubscriptionRepository(db.Subscribers);

        const question = await questionService.findQuestionById(questionId);

        const isSubscribed: boolean = await subscriptionRepository.isSubscribed(questionId, user);

        if (isSubscribed) {
            throw new HttpException(constants.messages.alreadySubscribed, 403);
        }

        await subscriptionRepository.create({ UserId: user.id, QuestionId: questionId });

        return question;
    }

    /**
     * A user unsubscribe from a question
     * 
     * @param {number} questionId 
     * @param {UserInterface} user 
     * 
     * @returns {Promise<boolean>}
     */
    public async unSubscribe(questionId: number, user: UserInterface): Promise<boolean> {
        const questionService: QuestionService = new QuestionService();

        const subscriptionRepository: SubscriptionRepository = new SubscriptionRepository(db.Subscribers);

        await questionService.findQuestionById(questionId);

        const isSubscribed: boolean = await subscriptionRepository.isSubscribed(questionId, user);

        if (!isSubscribed) {
            throw new HttpException(constants.messages.alreadySubscribed, 403);
        }

        return await subscriptionRepository.deleteMultiple({ UserId: user.id, QuestionId: questionId });

    }

    /**
     * Get all subscribers of a question
     * 
     * @param {number} questionId 
     * @param {number} userId 
     * 
     * @returns {Promise<any[]>}
     */
    public async getAllReceivers(questionId: number, userId?: number): Promise<any[]> {
        const questionService: QuestionService = new QuestionService();

        const question: QuestionInterface | any = await questionService.findQuestionById(questionId);
        const subscribers = await question.getUsers();

        if (isNull(userId)) {
            return subscribers;
        }

        // filter subscribers where user is not equal to userId.
        return subscribers.filter(
            (subscriber: any) => {
                return subscriber.id !== userId;
            }
        );
    }
}

