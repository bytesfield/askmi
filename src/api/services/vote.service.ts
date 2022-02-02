import { AnswerInterface } from "../../interfaces/models/answer.interface";
import { UserInterface } from "../../interfaces/models/user.interface";
import { VoteInterface } from "../../interfaces/models/vote.interface";
import { vote } from "../../types/custom";
import { HttpException } from "../exceptions";
import { AnswerService } from "./answer.service";
import constants from "../../utils/constants.util";
import { VoteRepository } from "../repositories/vote.repository";
import db from "../../database/models";
import { isNull } from "../../utils/helpers.util";
import { NotificationService } from "./notification.service";

const voteRepo: VoteRepository = new VoteRepository(db.Vote);
const answerService: AnswerService = new AnswerService();

export class VoteService implements VoteInterface {
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    id!: number;
    type!: string;


    public async vote(answerId: number, user: UserInterface, type: vote): Promise<AnswerInterface> {

        const notificationService: NotificationService = new NotificationService();
        const userId: number = user.id;

        const answer: AnswerInterface | any = await answerService.findAnswerById(answerId);

        if (answer.UserId === userId) {
            throw new HttpException(constants.messages.canNotVoteYourself, 403);
        }

        const reversed: string = type === constants.votes.up ? constants.votes.down : constants.votes.up;

        const alreadyVoted: VoteInterface = await voteRepo.findByMultiple({ AnswerId: answerId, UserId: userId, type: type });

        if (!isNull(alreadyVoted)) {
            throw new HttpException(constants.messages.alreadyVoted, 403);
        }

        const reversedVoted: VoteInterface = await voteRepo.findByMultiple({ AnswerId: answerId, UserId: userId, type: reversed });

        if (reversedVoted) {
            await voteRepo.update(reversedVoted.id, { type: type });

            await notificationService.sendVoteNotification(answer, user, type);

            return answer;
        }

        await voteRepo.create({
            AnswerId: answerId,
            UserId: userId,
            type: type
        })


        await notificationService.sendVoteNotification(answer, user, type);

        return answer;
    }

    public async deleteVote(answerId: number, user: UserInterface): Promise<boolean> {

        await answerService.findAnswerById(answerId);

        const hasVoted: VoteInterface = await voteRepo.findByMultiple({ AnswerId: answerId, UserId: user.id });

        if (isNull(hasVoted)) {
            throw new HttpException(constants.messages.notVoted, 403);
        }

        return await voteRepo.delete(hasVoted.id);
    }
}