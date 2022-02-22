import { Request, Response } from "express";
import { QuestionInterface } from "../../interfaces/models/question.interface";
import { UserInterface } from "../../interfaces/models/user.interface";
import { created, success } from "../responses";
import { QuestionService } from "../services/question.service";
import constants from '../../utils/constants.util';

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

    success(res, constants.messages.retrievedSuccess, response);
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

    const user: UserInterface = req.session.user;

    const response = await questionService.createQuestion(body, user);

    created(res, constants.messages.createdSuccess, response);
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

    const response: QuestionInterface = await questionService.findQuestionById(questionId);

    success(res, constants.messages.retrievedSuccess, response);
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

    const user: UserInterface = req.session.user;

    const response: QuestionInterface = await questionService.updateQuestion(questionId, req.body, user);

    success(res, constants.messages.updatedSuccess, response);
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

    const user: UserInterface = req.session.user;

    await questionService.deleteQuestion(questionId, user);

    success(res, constants.messages.deletedSuccess);
}

export default {
    index,
    create,
    find,
    destroy,
    update
}