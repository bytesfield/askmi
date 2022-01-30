import { Request, Response } from "express";
import { AnswerInterface as AnswerModelInterface } from "../../interfaces/models/answer.interface";
import { QuestionInterface as QuestionModelInterface } from "../../interfaces/models/question.interface";
import { UserInterface as UserModelInterface } from "../../interfaces/models/user.interface";
import { created, success } from "../responses";
import { AnswerService } from "../services/answer.service";
import { QuestionService } from "../services/question.service";

var answerService: AnswerService = new AnswerService();


/**
   * Get Question Answers
   * 
   * @param {Request} req
   * @param {Response} res
   * 
   * @returns {Promise<Response|any>}
*/
const index = async (req: Request | any, res: Response): Promise<Response | any> => {
    const { questionId } = req.params;

    const response: AnswerModelInterface = await answerService.findByQuestion(questionId);

    success(res, "Answers retrieved successfully", response);
}

/**
   * Create answer
   * 
   * @param {Request} req
   * @param {Response} res
   * 
   * @returns {Promise<Response|any>}
*/
const create = async (req: Request | any, res: Response): Promise<Response | any> => {
    const { questionId } = req.params;

    const user: UserModelInterface = req.session.user;

    const response = await answerService.createAnswer(req.body, questionId, user);

    created(res, "Answer created successfully", response);
}

/**
   * Find an answer
   * 
   * @param {Request} req
   * @param {Response} res
   * 
   * @returns {Promise<Response|any>}
*/
const show = async (req: Request | any, res: Response): Promise<Response | any> => {
    const { answerId } = req.params;

    const response: AnswerModelInterface = await answerService.findAnswerById(answerId);

    success(res, "Answer retrieved successfully", response);
}


/**
   * Update answer
   * 
   * @param {Request} req
   * @param {Response} res
   * 
   * @returns {Promise<Response|any>}
*/
const update = async (req: Request | any, res: Response): Promise<Response | any> => {
    const { answerId } = req.params;

    const user: UserModelInterface = req.session.user;

    const response: AnswerModelInterface = await answerService.updateAnswer(answerId, req.body, user);

    success(res, "Answer updated successfully", response);
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
    const { answerId } = req.params;

    const user: UserModelInterface = req.session.user;

    await answerService.deleteAnswer(answerId, user);

    success(res, "Answer deleted successfully");
}

export default {
    index,
    create,
    show,
    destroy,
    update
}