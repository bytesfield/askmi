import { UserInterface } from "./user.interface";

export interface BaseQuestionInterface {
  id: number;
  title: string;
  slug: string;
  body: string;
  isAnswered: boolean;
}

export interface QuestionInterface extends BaseQuestionInterface {
  createdAt?: Date;
  updatedAt?: Date;
  createQuestion?(data: Record<string, string>, user: UserInterface): Promise<QuestionInterface>
  updateQuestion?(id: number, item: object, user: UserInterface): Promise<QuestionInterface>
  findQuestionByMultiple?(obj: object): Promise<QuestionInterface>;
  deleteQuestion?(id: number, user: UserInterface): Promise<boolean>;
}
