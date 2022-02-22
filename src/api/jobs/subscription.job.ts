import Bull from 'bull';
import config from '../../config';
import { UserInterface } from '../../interfaces/models/user.interface';
import logger from '../../utils/logger.util';
import { NotificationService } from '../services/notification.service';
import { SubscriptionService } from '../services/subscription.service';


const SubscriptionNotification = new Bull('subscription-notification', config.service.redis.url);

// Process answer notification job.
SubscriptionNotification.process('answer', async (job) => {
    const { questionId, userId, content, title } = job.data;

    const subscriptionService = new SubscriptionService();

    const subscribers: UserInterface[] = await subscriptionService.getAllReceivers(questionId, userId);

    const promises: any[] = [];

    subscribers.forEach(async subscriber => {
        const notificationService = new NotificationService();

        promises.push(
            await notificationService.notifyReceiver(subscriber.id, title, content)
        );
    });

    Promise.all(promises);//Resolves all promises in the array same time or reject if any is rejected.

    logger.info('Answer notifications sent to subscribers.');
});

// Process best answer notification job.
SubscriptionNotification.process('bestAnswer', async (job) => {
    const { questionId, content, title } = job.data;

    const subscriptionService = new SubscriptionService();

    const subscribers: UserInterface[] = await subscriptionService.getAllReceivers(questionId);

    const promises: any[] = [];

    subscribers.forEach(subscriber => {
        const notificationService = new NotificationService();

        promises.push(
            notificationService.notifyReceiver(subscriber.id, title, content)
        );

    });

    await Promise.all(promises);

    logger.info('Best answer notifications sent to subscribers.');
});

// Process vote notification job.
SubscriptionNotification.process('vote', async (job) => {
    const { receiverId, content, title } = job.data;

    const notificationService = new NotificationService();

    await notificationService.notifyReceiver(receiverId, title, content);
});

// Log all errors.
SubscriptionNotification.on('failed', (job, error) => {
    logger.info(`Unable to send ${job.data.title}`);
    logger.error(error);
});

// Log notification sent.
SubscriptionNotification.on('completed', (job) => {
    logger.info(`${job.data.title} was sent to all the subscribers.`);
});

export default SubscriptionNotification;