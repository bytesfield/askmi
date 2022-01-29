import { QuestionInterface as QuestionModelInterface } from "../../interfaces/models/question.interface";
import { UserInterface } from "../../interfaces/models/user.interface";
import { SubscriptionInterface } from "../../interfaces/subscription.interface";
import { isNull } from "../../utils/helpers.util";
import HttpException from "../exceptions/HttpException";
import { QuestionService } from "./question.service";


export class SubscriptionService implements SubscriptionInterface {

    public async subscribe(questionId: number, user: UserInterface): Promise<QuestionModelInterface> {

        const questionService: QuestionService = new QuestionService();

        const question = await questionService.findQuestionById(questionId);

        if (isNull(question)) {
            throw new HttpException('Question was not found', 404);
        }

        const isSubscribed = question.getUsers();

        if (!isNull(isSubscribed)) {
            throw new HttpException(
                'User is already subscribed to this question',
                403
            );
        }

        return question;
    }

}