
export interface BaseAnswerInterface {
  id: number;
  body: string;
  isFirst: boolean;
  isBest: boolean;
}

export interface AnswerInterface extends BaseAnswerInterface {
  createdAt?: Date;
  updatedAt?: Date;
}
