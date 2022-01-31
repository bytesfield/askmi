import { UserInterface } from "./user.interface";
export interface BaseAnswerInterface {
  id: number;
  body: string;
  isFirst: boolean;
  isBest: boolean;
}

export interface AnswerInterface extends BaseAnswerInterface {
  createdAt?: Date;
  updatedAt?: Date;
  createAnswer?(data: Record<string, string>, questionId: number, user: UserInterface): Promise<AnswerInterface>
  findByQuestion?(questionId: number): Promise<AnswerInterface>
  findAnswerById?(answerId: number): Promise<AnswerInterface>
  updateAnswer?(id: number, item: object | any, user: UserInterface): Promise<AnswerInterface>
}
