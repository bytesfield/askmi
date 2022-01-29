
export interface BaseSubscribersInterface {
  id: number;
  questionId: number;
  userId: number;
}

export interface SubscribersInterface extends BaseSubscribersInterface {
  createdAt?: Date;
  updatedAt?: Date;
}
