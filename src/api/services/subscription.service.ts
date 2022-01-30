import db from "../../database/models";
import { QuestionInterface as QuestionModelInterface } from "../../interfaces/models/question.interface";
import { UserInterface } from "../../interfaces/models/user.interface";
import { SubscriptionInterface } from "../../interfaces/subscription.interface";
import { isNull } from "../../utils/helpers.util";
import HttpException from "../exceptions/HttpException";
import { SubscriptionRepository } from "../repositories/subscription.repository";
import { QuestionService } from "./question.service";


export class SubscriptionService implements SubscriptionInterface {

    public async subscribe(questionId: number, user: UserInterface): Promise<QuestionModelInterface> {

        const questionService: QuestionService = new QuestionService();
        const subscriptionRepository: SubscriptionRepository = new SubscriptionRepository(db.Subscribers);

        const question = await questionService.findQuestionById(questionId);

        if (isNull(question)) {
            throw new HttpException('Question was not found', 404);
        }

        const isSubscribed: boolean = await subscriptionRepository.isSubscribed(questionId, user);

        if (isSubscribed) {
            throw new HttpException('User has already subscribed to this question', 403);
        }

        await subscriptionRepository.create({ UserId: user.id, QuestionId: questionId });

        return question;
    }


    public async unSubscribe(questionId: number, user: UserInterface): Promise<boolean> {

        const questionService: QuestionService = new QuestionService();
        const subscriptionRepository: SubscriptionRepository = new SubscriptionRepository(db.Subscribers);

        const question = await questionService.findQuestionById(questionId);

        if (isNull(question)) {
            throw new HttpException('Question was not found', 404);
        }

        const isSubscribed: boolean = await subscriptionRepository.isSubscribed(questionId, user);

        if (!isSubscribed) {
            throw new HttpException('User has not subscribed to this question', 403);
        }

        return await subscriptionRepository.deleteMultiple({ UserId: user.id, QuestionId: questionId });

    }

}