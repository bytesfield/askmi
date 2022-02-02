import { NotificationInterface } from "../../interfaces/models/notification.interface";
import { UserInterface } from "../../interfaces/models/user.interface";
import { success } from "../responses";
import { NotificationService } from "../services/notification.service";
import constants from '../../utils/constants.util';

const notificationService: NotificationService = new NotificationService();

/**
 * Get the currently authenticated user.
 *
 * @param {Request}  req
 * @param {Response} res
 *
 * @returns {Promise<Response>}
 */
const profile = async (req: Request | any, res: Response | any): Promise<Response | any> => {
    const user: UserInterface = req.session.user;

    return success(res, constants.messages.retrievedSuccess, user);
};

/**
 * Get all notifications.
 *
 * @param {Request}  req
 * @param {Response} res
 *
 * @returns {Promise<Response>}
 */
const notification = async (req: Request | any, res: Response | any): Promise<Response | any> => {
    const user: UserInterface = req.session.user;

    const notifications = await notificationService.findByUser(user.id);

    return success(res, constants.messages.retrievedSuccess, notifications);
};

/**
 * Mark notification as read.
 *
 * @param {Request}  req
 * @param {Response} res
 *
 * @returns {Promise<Response>}
 */
const markNotificationAsRead = async (req: Request | any, res: Response | any): Promise<Response | any> => {
    const user: UserInterface = req.session.user;
    const { notificationId } = req.params;

    const notification: NotificationInterface = await notificationService.markAsRead(notificationId, user);

    return success(res, constants.messages.markNotificationAsRead, notification);
};

export default {
    profile,
    notification,
    markNotificationAsRead
}