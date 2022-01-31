import { Request, Response } from "express";
import { CommentInterface as CommentModelInterface } from "../../interfaces/models/comment.interface";
import { UserInterface as UserModelInterface } from "../../interfaces/models/user.interface";
import { created, success } from "../responses";
import { CommentService } from "../services/comment.service";

var commentService: CommentService = new CommentService();

/**
   * Get Answer Comments
   * 
   * @param {Request} req
   * @param {Response} res
   * 
   * @returns {Promise<Response|any>}
*/
const index = async (req: Request | any, res: Response): Promise<Response | any> => {
    const { answerId } = req.params;

    const response: CommentModelInterface = await commentService.findByAnswer(answerId);

    success(res, "Comments retrieved successfully", response);
}

/**
   * Create comment
   * 
   * @param {Request} req
   * @param {Response} res
   * 
   * @returns {Promise<Response|any>}
*/
const create = async (req: Request | any, res: Response): Promise<Response | any> => {
    const { answerId } = req.params;

    const user: UserModelInterface = req.session.user;

    const response = await commentService.createComment(req.body, answerId, user);

    created(res, "Comment created successfully", response);
}

/**
   * Find an comment
   * 
   * @param {Request} req
   * @param {Response} res
   * 
   * @returns {Promise<Response|any>}
*/
const show = async (req: Request | any, res: Response): Promise<Response | any> => {
    const { commentId } = req.params;

    const response: CommentModelInterface = await commentService.findCommentById(commentId);

    success(res, "Comment retrieved successfully", response);
}


/**
   * Update comment
   * 
   * @param {Request} req
   * @param {Response} res
   * 
   * @returns {Promise<Response|any>}
*/
const update = async (req: Request | any, res: Response): Promise<Response | any> => {
    const { commentId } = req.params;

    const user: UserModelInterface = req.session.user;

    const response: CommentModelInterface = await commentService.updateComment(commentId, req.body, user);

    success(res, "Comment updated successfully", response);
}

/**
   * Delete answer
   * 
   * @param {Request} req
   * @param {Response} res
   * 
   * @returns {Promise<Response|any>}
*/
const destroy = async (req: Request | any, res: Response): Promise<Response | any> => {
    const { commentId } = req.params;

    const user: UserModelInterface = req.session.user;

    await commentService.deleteComment(commentId, user);

    success(res, "Comment deleted successfully");
}

export default {
    index,
    create,
    show,
    destroy,
    update
}