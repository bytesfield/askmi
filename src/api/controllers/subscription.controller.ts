import { UserInterface as UserModelInterface } from "../../interfaces/models/user.interface";
import { created, success } from "../responses";
import constants from '../../utils/constants.util';
import { SubscriptionService } from "../services/subscription.service";

/**
   * User subscribes to a question
   * 
   * @param {Request} req
   * @param {Response} res
   * 
   * @returns {Promise<Response|any>}
*/
const subscribe = async (req: Request | any, res: Response | any): Promise<Response | any> => {
    const { questionId } = req.params;

    const user: UserModelInterface = req.session.user;

    const subscriptionService: SubscriptionService = new SubscriptionService();

    const response = await subscriptionService.subscribe(questionId, user);

    success(res, constants.messages.subscribedToQuestion, response);
}

/**
   * User unsubscribes from a question
   * 
   * @param {Request} req
   * @param {Response} res
   * 
   * @returns {Promise<Response|any>}
*/
const unSubscribe = async (req: Request | any, res: Response | any): Promise<Response | any> => {
    const { questionId } = req.params;

    const user: UserModelInterface = req.session.user;

    const subscriptionService: SubscriptionService = new SubscriptionService();

    await subscriptionService.unSubscribe(questionId, user);

    success(res, constants.messages.unsubscribedFromQuestion);
}

export default {
    subscribe,
    unSubscribe
}