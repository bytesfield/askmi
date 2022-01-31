import { UserInterface } from "./user.interface";

export interface BaseCommentInterface {
  id: number;
  body: string;
}

export interface CommentInterface extends BaseCommentInterface {
  createdAt?: Date;
  updatedAt?: Date;
  createComment?(data: Record<string, string>, answerId: number, user: UserInterface): Promise<CommentInterface>
  findByAnswer?(answerId: number): Promise<CommentInterface>
  findCommentById?(commentId: number): Promise<CommentInterface>
  updateComment?(id: number, item: object | any, user: UserInterface): Promise<CommentInterface>
}
