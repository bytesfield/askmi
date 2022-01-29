
export interface BaseCommentInterface {
  id: number;
  body: string;
}

export interface CommentInterface extends BaseCommentInterface {
  createdAt?: Date;
  updatedAt?: Date;
}
