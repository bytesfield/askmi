import { UserInterface as UserModelInterface } from "../../interfaces/models/user.interface";
import { created } from "../responses";

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

    created(res, "Subscribed to question successfully", response);
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

    created(res, "Unsubscribed from question successfully");
}

export default {
    subscribe,
    unSubscribe
}