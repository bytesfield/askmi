
export interface BaseSubscribersInterface {
  QuestionId: number;
  UserId: number;
}

export interface SubscribersInterface extends BaseSubscribersInterface {
  createdAt?: Date;
  updatedAt?: Date;
}
