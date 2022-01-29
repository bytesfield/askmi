
export interface BaseQuestionTagInterface {
  id: number;
  questionId: number;
  tagId: number;
}

export interface QuestionTagInterface extends BaseQuestionTagInterface {
  createdAt?: Date;
  updatedAt?: Date;
}
