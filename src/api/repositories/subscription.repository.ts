import { BaseRepository } from "./base.repository";
import db from "../../database/models";
import { SubscribersInterface as SubscribersModelInterface } from "../../interfaces/models/subscribers.interface";
import { UserInterface as UserModelInterface } from "../../interfaces/models/user.interface";
import { isNull } from "../../utils/helpers.util";

// now, we have all code implementation from BaseRepository
export class SubscriptionRepository extends BaseRepository<SubscribersModelInterface>{

    /**
     * Check if a user has subscribed to a question
     * 
     * @param {number} questionId 
     * @param {UserModelInterface} user 
     *  
     * @returns Promise<boolean>
     */
    public async isSubscribed(questionId: number, user: UserModelInterface): Promise<boolean> {

        const userSubscription: SubscribersModelInterface = await db.Subscribers.findOne({
            where: { QuestionId: questionId, UserId: user.id }
        });

        return !isNull(userSubscription) ? true : false;
    }

}
