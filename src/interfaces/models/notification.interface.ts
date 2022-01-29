
export interface BaseNotificationInterface {
  id: number;
  title: string;
  content: string;
  isRead: boolean;
}

export interface NotificationInterface extends BaseNotificationInterface {
  createdAt?: Date;
  updatedAt?: Date;
}
