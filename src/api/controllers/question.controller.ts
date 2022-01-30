import { Request, Response } from "express";
import { UserInterface as UserModelInterface } from "../../interfaces/models/user.interface";
import { created } from "../responses";
import { QuestionService } from "../services/question.service";
import { UserService } from "../services/user.service";

var questionService: QuestionService = new QuestionService();
var userService: UserService = new UserService();

/**
   * User Registration
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

export default {
    create
}