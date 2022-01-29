import { UserInterface } from "./models/user.interface";
import { QuestionInterface as QuestionModelInterface } from "./models/question.interface";

export interface QuestionInterface {
    createQuestion(data: Record<string, string>, user: UserInterface): Promise<QuestionModelInterface>
    updateQuestion(id: number, item: object): Promise<QuestionModelInterface>
    findQuestionByMultiple(obj: object): Promise<QuestionModelInterface>;
    deleteQuestion(id: number): Promise<boolean>;

}