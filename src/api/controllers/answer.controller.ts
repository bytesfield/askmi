import { Request, Response } from "express";
import { AnswerInterface } from "../../interfaces/models/answer.interface";
import { UserInterface } from "../../interfaces/models/user.interface";
import { badRequest, created, success } from "../responses";
import { AnswerService } from "../services/answer.service";
import constants from '../../utils/constants.util';
import { VoteService } from "../services/vote.service";

var answerService: AnswerService = new AnswerService();
var voteService: VoteService = new VoteService();

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

    const response: AnswerInterface = await answerService.findByQuestion(questionId);

    success(res, constants.messages.retrievedSuccess, response);
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

    const user: UserInterface = req.session.user;

    const response = await answerService.createAnswer(req.body, questionId, user);

    created(res, constants.messages.createdSuccess, response);
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

    const response: AnswerInterface = await answerService.findAnswerById(answerId);

    success(res, constants.messages.retrievedSuccess, response);
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

    const user: UserInterface = req.session.user;

    const response: AnswerInterface = await answerService.updateAnswer(answerId, req.body, user);

    success(res, constants.messages.updatedSuccess, response);
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

    const user: UserInterface = req.session.user;

    await answerService.deleteAnswer(answerId, user);

    success(res, constants.messages.deletedSuccess);
}

/**
 * Mark as best answer.
 *
 * @param {Request}  req
 * @param {Response} res
 *
 * @returns {Promise<Response>}
 */
const markAsBestAnswer = async (req: Request | any, res: Response): Promise<Response | any> => {
    const user: UserInterface = req.session.user;
    const { answerId } = req.params;

    const answer: AnswerInterface = await answerService.markAsBestAnswer(answerId, user);

    return success(res, constants.messages.bestAnswerSelectedSuccess, answer);
};

/**
 * Vote for an answer (upvote or downvote).
 *
 * @param {Request}  request
 * @param {Response} response
 *
 * @returns {Promise<Response>}
 */
const createVote = async (req: Request | any, res: Response | any): Promise<Response | any> => {
    const { answerId } = req.params;
    const { vote } = req.body;
    const user: UserInterface = req.session.user;

    const votes: string[] = Object.values(constants.votes);
    const hasValue: boolean = votes.includes(vote);

    if (!hasValue) {
        badRequest(res, `Vote value must be ${votes}`);
    }

    const post = await voteService.vote(answerId, user, vote);

    return success(res, constants.messages.createdSuccess, post);
};

/**
 * Remove vote for an answer.
 *
 * @param {Request}  req
 * @param {Response} res
 *
 * @returns {Promise<Response>}
 */
const removeVote = async (req: Request | any, res: Response): Promise<Response | any> => {
    const user: UserInterface = req.session.user;
    const { answerId } = req.params;

    await voteService.deleteVote(answerId, user);

    return success(res, constants.messages.deletedSuccess);
};

export default {
    index,
    create,
    show,
    destroy,
    update,
    markAsBestAnswer,
    createVote,
    removeVote
}