import { UserInterface as UserModelInterface } from "./models/user.interface";
import { CommentInterface as CommentModelInterface } from "./models/comment.interface";

export interface CommentInterface {
    createComment(data: Record<string, string>, answerId: number, user: UserModelInterface): Promise<CommentModelInterface>
    findByAnswer(answerId: number): Promise<CommentModelInterface>
    findCommentById(commentId: number): Promise<CommentModelInterface>
    updateComment(id: number, item: object | any, user: UserModelInterface): Promise<CommentModelInterface>
}