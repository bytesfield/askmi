import { QuestionInterface } from "./question.interface";
import { UserInterface } from "./user.interface";

export interface BaseSubscribersInterface {
  QuestionId: number;
  UserId: number;
}

export interface SubscribersInterface extends BaseSubscribersInterface {
  createdAt?: Date;
  updatedAt?: Date;
  subscribe?(questionId: number, user: UserInterface): Promise<QuestionInterface>
  unSubscribe?(questionId: number, user: UserInterface): Promise<boolean>
}
