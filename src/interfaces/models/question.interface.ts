
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
}
