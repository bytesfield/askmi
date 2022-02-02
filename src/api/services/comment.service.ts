import db from "../../database/models";
import { CommentInterface } from "../../interfaces/models/comment.interface";
import { UserInterface } from "../../interfaces/models/user.interface";
import { isNull } from "../../utils/helpers.util";
import { HttpException } from "../exceptions";
import { CommentRepository } from "../repositories/comment.repository";
import { AnswerService } from "./answer.service";
import constants from '../../utils/constants.util';

var answerService: AnswerService = new AnswerService();
var commentRepo: CommentRepository = new CommentRepository(db.Comment);

export class CommentService implements CommentInterface {
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    id!: number;
    body!: string;

    /**
     * User comment on an answer
     * 
     * @param {Record<string, string>} data 
     * @param {number} answerId 
     * @param {UserInterface} user 
     * 
     * @returns {Promise<CommentInterface>}
     */
    public async createComment(data: Record<string, string>, answerId: number, user: UserInterface): Promise<CommentInterface> {

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
    public async findByAnswer(answerId: number): Promise<CommentInterface> {
        await answerService.findAnswerById(answerId);

        return await commentRepo.findByMultiple({ AnswerId: answerId });

    }

    /**
     * Find Comment by Id
     * 
     * @param {number} commentId 
     * 
     * @returns {CommentInterface}
     */
    public async findCommentById(commentId: number): Promise<CommentInterface> {
        const comment: CommentInterface = await commentRepo.findOne(commentId);

        if (isNull(comment)) {
            throw new HttpException(constants.messages.notFound, 404);
        }

        return comment;
    }

    /**
     * Find a user comment to an answer
     * 
     * @param {number} commentId
     * @param {UserInterface} user 
     * 
     * @returns {Promise<CommentInterface>}
     */
    public async userComment(commentId: number, user: UserInterface): Promise<CommentInterface> {

        const comment: CommentInterface | any = await this.findCommentById(commentId);

        if (comment.UserId != user.id) {
            throw new HttpException(constants.messages.restrictedAccess, 403);
        }

        return comment;
    }

    /**
    * User update comment 
    * 
    * @param {number} id 
    * @param {object} item 
    * @param {UserInterface} user 
    * 
    * @returns {Promise<CommentInterface>}
    */
    public async updateComment(id: number, item: object | any, user: UserInterface): Promise<CommentInterface> {
        const comment: CommentInterface | any = await this.findCommentById(id);

        if (comment.UserId != user.id) {
            throw new HttpException(constants.messages.restrictedAccess, 403);
        }

        await commentRepo.update(id, item);

        return await this.findCommentById(id);
    }

    /**
     * Delete a comment
     * 
     * @param {number} id 
     * @param {UserInterface} user 
     * 
     * @returns {Promise<boolean>}
     */
    public async deleteComment(id: number, user: UserInterface): Promise<boolean> {

        await this.findCommentById(id);

        await this.userComment(id, user);

        return await commentRepo.delete(id);
    }
}