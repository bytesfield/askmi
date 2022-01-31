import { Request, Response } from "express";
import { QuestionInterface as QuestionModelInterface } from "../../interfaces/models/question.interface";
import { UserInterface as UserModelInterface } from "../../interfaces/models/user.interface";
import { created, success } from "../responses";
import { QuestionService } from "../services/question.service";
import { SubscriptionService } from "../services/subscription.service";

var questionService: QuestionService = new QuestionService();

/**
   * Get all questions
   * 
   * @param {Request} req
   * @param {Response} res
   * 
   * @returns {Promise<Response|any>}
*/
const index = async (req: Request | any, res: Response): Promise<Response | any> => {
    const { query } = req;

    const response = await questionService.findAllQuestions(query);

    success(res, "Questions retrieved successfully", response);
}

/**
   * User create a question
   * 
   * @param {Request} req
   * @param {Response} res
   * 
   * @returns {Promise<Response|any>}
*/
const create = async (req: Request | any, res: Response): Promise<Response | any> => {
    const { body } = req;

    const user: UserModelInterface = req.session.user;

    const response = await questionService.createQuestion(body, user);

    created(res, "Question created successfully", response);
}

/**
   * Find a question
   * 
   * @param {Request} req
   * @param {Response} res
   * 
   * @returns {Promise<Response|any>}
*/
const find = async (req: Request | any, res: Response): Promise<Response | any> => {
    const { questionId } = req.params;

    const response: QuestionModelInterface = await questionService.findQuestionById(questionId);

    success(res, "Question retrieved successfully", response);
}


/**
   * Update a question
   * 
   * @param {Request} req
   * @param {Response} res
   * 
   * @returns {Promise<Response|any>}
*/
const update = async (req: Request | any, res: Response): Promise<Response | any> => {
    const { questionId } = req.params;

    const user: UserModelInterface = req.session.user;

    const response: QuestionModelInterface = await questionService.updateQuestion(questionId, req.body, user);

    success(res, "Question updated successfully", response);
}

/**
   * Deletes a question
   * 
   * @param {Request} req
   * @param {Response} res
   * 
   * @returns {Promise<Response|any>}
*/
const destroy = async (req: Request | any, res: Response): Promise<Response | any> => {
    const { questionId } = req.params;

    const user: UserModelInterface = req.session.user;

    await questionService.deleteQuestion(questionId, user);

    success(res, "Question deleted successfully");
}

export default {
    index,
    create,
    find,
    destroy,
    update
}