import { QuestionInterface as QuestionModelInterface } from "./models/question.interface";
import { UserInterface as UserModelInterface } from "./models/user.interface";

export interface QuestionInterface {
    createQuestion(data: Record<string, string>, user: UserModelInterface): Promise<QuestionModelInterface>
    updateQuestion(id: number, item: object, user: UserModelInterface): Promise<QuestionModelInterface>
    findQuestionByMultiple(obj: object): Promise<QuestionModelInterface>;
    deleteQuestion(id: number, user: UserModelInterface): Promise<boolean>;

}