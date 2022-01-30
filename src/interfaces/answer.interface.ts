import { UserInterface as UserModelInterface } from "./models/user.interface";
import { AnswerInterface as AnswerModelInterface } from "./models/answer.interface";

export interface AnswerInterface {
    createAnswer(data: Record<string, string>, questionId: number, user: UserModelInterface): Promise<AnswerModelInterface>
    findByQuestion(questionId: number): Promise<AnswerModelInterface>
    findAnswerById(answerId: number): Promise<AnswerModelInterface>
    updateAnswer(id: number, item: object | any, user: UserModelInterface): Promise<AnswerModelInterface>
}