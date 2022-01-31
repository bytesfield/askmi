
import { AnswerInterface as AnswerModelInterface } from "./answer.interface";
import { NotificationInterface as NotificationModelInterface } from "./notification.interface";
import { UserInterface as UserModelInterface } from "./user.interface";
export interface BaseNotificationInterface {
  id: number;
  title: string;
  content: string;
  isRead: boolean;
}

export interface NotificationInterface extends BaseNotificationInterface {
  createdAt?: Date;
  updatedAt?: Date;
  findByUser?(userId: number): Promise<NotificationModelInterface[]>;
  findNotificationById?(id: number): Promise<NotificationModelInterface>;
  markAsRead?(notificationId: number, user: UserModelInterface): Promise<NotificationModelInterface>
  notifyReceiver?(receiverId: number, title: string, content: string): Promise<NotificationModelInterface>
  sendBestAnswerNotification?(answer: AnswerModelInterface, user: UserModelInterface): Promise<boolean>
}
