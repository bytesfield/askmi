import { BaseRepository } from "./base.repository";
import db from "../../database/models";
import { SubscribersInterface as SubscribersModelInterface } from "../../interfaces/models/subscribers.interface";

// now, we have all code implementation from BaseRepository
export class SubscriptionRepository extends BaseRepository<SubscribersModelInterface>{


}
