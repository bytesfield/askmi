import { UserInterface } from "./models/user.interface";
import { QuestionInterface as QuestionModelInterface } from "./models/question.interface";

export interface SubscriptionInterface {
    subscribe(questionId: number, user: UserInterface): Promise<QuestionModelInterface>

}