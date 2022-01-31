import db from "../../database/models";
import { CommentInterface } from "../../interfaces/comment.interface";
import { CommentInterface as CommentModelInterface } from "../../interfaces/models/comment.interface";
import { UserInterface as UserModelInterface } from "../../interfaces/models/user.interface";
import { UserInterface } from "../../interfaces/models/user.interface";
import { isNull } from "../../utils/helpers.util";
import { HttpException } from "../exceptions";
import { CommentRepository } from "../repositories/comment.repository";
import { AnswerService } from "./answer.service";

var answerService: AnswerService = new AnswerService();
var commentRepo: CommentRepository = new CommentRepository(db.Comment);

export class CommentService implements CommentInterface {

    public async createComment(data: Record<string, string>, answerId: number, user: UserInterface): Promise<CommentModelInterface> {

        await answerService.findAnswerById(answerId);

        return await commentRepo.create({
            body: data.body,
            AnswerId: answerId,
            UserId: user.id
        });
    }

    /**
     * Find Comments by Answer Id
     * 
     * @param {number} answerId 
     * 
     * @returns {Promise<AnswerModelInterface>}
     */
    public async findByAnswer(answerId: number): Promise<CommentModelInterface> {
        await answerService.findAnswerById(answerId);

        return await commentRepo.findByMultiple({ AnswerId: answerId });

    }

    /**
     * FInd Comment by Id
     * @param {number} commentId 
     * 
     * @returns {CommentModelInterface}
     */
    public async findCommentById(commentId: number): Promise<CommentModelInterface> {
        const comment: CommentModelInterface = await commentRepo.findOne(commentId);

        if (isNull(comment)) {
            throw new HttpException('Comment was not found', 404);
        }

        return comment;
    }

    /**
     * Find a user comment to an answer
     * 
     * @param {number} commentId
     * @param {UserModelInterface} user 
     * 
     * @returns {Promise<CommentModelInterface>}
     */
    public async userComment(commentId: number, user: UserModelInterface): Promise<CommentModelInterface> {

        const comment: CommentModelInterface | any = await this.findCommentById(commentId);

        if (comment.UserId != user.id) {
            throw new HttpException("Comment not created by user", 403);
        }

        return comment;
    }

    /**
    * User update comment 
    * 
    * @param {number} id 
    * @param {object} item 
    * @param {UserModelInterface} user 
    * 
    * @returns {Promise<CommentModelInterface>}
    */
    public async updateComment(id: number, item: object | any, user: UserModelInterface): Promise<CommentModelInterface> {
        const comment: CommentModelInterface | any = await this.findCommentById(id);

        if (comment.UserId != user.id) {
            throw new HttpException("Comment not created by user", 403);
        }

        await commentRepo.update(id, item);

        return await this.findCommentById(id);
    }

    /**
     * Delete a comment
     * 
     * @param {number} id 
     * @param {UserModelInterface} user 
     * 
     * @returns Promise<boolean>
     */
    public async deleteComment(id: number, user: UserModelInterface): Promise<boolean> {

        await this.findCommentById(id);

        await this.userComment(id, user);

        return await commentRepo.delete(id);
    }
}