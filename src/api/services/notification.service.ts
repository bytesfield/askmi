import db from "../../database/models";
import { AnswerInterface } from "../../interfaces/models/answer.interface";
import { NotificationInterface } from "../../interfaces/models/notification.interface";
import { UserInterface } from "../../interfaces/models/user.interface";
import { isNull } from "../../utils/helpers.util";
import constants from '../../utils/constants.util';
import { HttpException } from "../exceptions";
import { NotificationRepository } from "../repositories/notification.repository";
import { UserService } from "./user.service";
import util from 'util';
import { QuestionInterface } from "../../interfaces/models/question.interface";
import SubscriptionNotification from "../jobs/subscription.job";
import { vote } from "../../types/custom";

var notificationRepo: NotificationRepository = new NotificationRepository(db.Notification);
var userService: UserService = new UserService();

export class NotificationService implements NotificationInterface {
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    id!: number;
    title!: string;
    content!: string;
    isRead!: boolean;

    /**
     * Find User Notifications
     * 
     * @param {number} userId 
     * 
     * @returns {Promise<NotificationInterface[]> }
     */
    public async findByUser(userId: number): Promise<NotificationInterface[]> {
        await userService.findUserById(userId);

        return await notificationRepo.find({ UserId: userId });
    }
    /**
     * Find a notification
     * 
     * @param {number} id 
     * 
     * @returns {Promise<NotificationInterface> }
     */
    public async findNotificationById(id: number): Promise<NotificationInterface> {
        const notification: NotificationInterface = await notificationRepo.findOne(id);

        if (isNull(notification)) {
            throw new HttpException(constants.messages.notFound, 404);
        }

        return notification;
    }

    /**
     * Find a notification
     * 
     * @param {number} id 
     * 
     * @returns {Promise<NotificationInterface> }
     */
    public async updateNotification(id: number, item: object): Promise<NotificationInterface> {
        const notification: NotificationInterface = await this.findNotificationById(id)

        await notificationRepo.update(id, item);

        return notification;
    }

    /**
     * Mark Notification as read
     * 
     * @param {number} notificationId 
     * @param {UserInterface} user 
     * 
     * @returns {Promise<NotificationInterface>}
     */
    public async markAsRead(notificationId: number, user: UserInterface): Promise<NotificationInterface> {
        const notification: NotificationInterface = await this.findNotificationById(notificationId);

        await this.updateNotification(notificationId, { isRead: true });

        return notification;

    }

    /**
     * Notify a receiver
     * 
     * @param {number} receiverId 
     * @param {string} title 
     * @param {string} content 
     * 
     * @returns {Promise<NotificationInterface>}
     */
    public async notifyReceiver(receiverId: number, title: string, content: string): Promise<NotificationInterface> {
        const notification: NotificationInterface = await notificationRepo.create({
            title: title,
            content: content,
            UserId: receiverId
        });

        return notification;
    }

    /**
     * Send Answer Notification to subscribers
     * 
     * @param {QuestionInterface} question 
     * @param {UserInterface} user 
     * 
     * @returns {Promise<boolean>}
     */
    public async sendAnswerNotification(question: QuestionInterface, user: UserInterface): Promise<boolean> {
        const content = util.format(
            constants.notificationContents.answer,
            user.username,
            question.title
        );

        const notificationData: Record<string, any> = {
            title: constants.notifications.answer,
            content,
            questionId: question.id,
            userId: user.id
        };

        await SubscriptionNotification.add('answer', notificationData);

        return true;
    }

    /**
     * Send Best Answer Notification to user
     * 
     * @param {AnswerInterface} answer 
     * @param {UserInterface} user 
     * 
     * @returns {Promise<boolean>}
     */
    public async sendBestAnswerNotification(answer: AnswerInterface | any, user: UserInterface): Promise<boolean> {
        const question: QuestionInterface = await answer.getQuestion();

        const content = util.format(
            constants.notificationContents.bestAnswer,
            user.username,
            question.title
        );

        const notificationData: Record<string, any> = {
            title: constants.notifications.bestAnswer,
            content,
            questionId: question.id,
            userId: user.id
        };

        await SubscriptionNotification.add('bestAnswer', notificationData);

        return true;
    }

    /**
     * Send Vote Notification to user
     * 
     * @param {AnswerInterface} answer 
     * @param {UserInterface} user 
     * @param {vote} type 
     * 
     * @returns {Promise<boolean>}
     */
    public async sendVoteNotification(answer: AnswerInterface | any, user: UserInterface, type: vote): Promise<boolean> {

        const question: QuestionInterface = answer.getQuestion();

        const content = util.format(
            constants.notificationContents.vote,
            user.username,
            constants.voteKeys[type],
            question.title
        );

        const notificationData: Record<string, any> = {
            title: constants.notifications.vote,
            content,
            receiverId: answer.UserId
        };

        await SubscriptionNotification.add('vote', notificationData);

        return true;
    }

}