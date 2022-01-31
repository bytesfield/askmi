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

const voteRepo: VoteRepository = new VoteRepository(db.Vote);

export class VoteService implements VoteInterface {
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    id!: number;
    type!: string;


    public async vote(answerId: number, user: UserInterface, type: vote): Promise<AnswerInterface> {

        const answerService: AnswerService = new AnswerService();
        const userId: number = user.id;

        const answer: AnswerInterface | any = await answerService.findAnswerById(answerId);
        const answerUser: UserInterface = answer.getUser();

        if (answerUser.id === userId) {
            throw new HttpException(constants.messages.canNotVoteYourself, 403);
        }

        const reversed: string = type === constants.votes.up ? constants.votes.down : constants.votes.up;

        const alreadyVoted: VoteInterface = await voteRepo.findByMultiple({ AnswerId: answerId, UserId: userId, type: type });

        if (!isNull(alreadyVoted)) {
            throw new HttpException(constants.messages.alreadyVoted, 403);
        }

        return answer;

        // const reversedVoted: VoteInterface | undefined = post.votes.find(
        //     (voteRecord: VoteInterface) =>
        //         voteRecord.user.toString() === user.id && voteRecord.type === reversed
        // );

        // if (reversedVoted) {
        //     await Post.updateOne(
        //         { _id: postId, 'votes._id': reversedVoted._id },
        //         { $set: { 'votes.$.type': type } }
        //     );

        //     await this.notificationService.sendVoteNotification(post, user, type);

        //     return post;
        // }

        // await Post.updateOne(
        //     { _id: postId },
        //     { $push: { votes: { type, user: user.id } } }
        // );

        // await this.notificationService.sendVoteNotification(post, user, type);

        // return post;
    }

    // public async delete(postId: string, user: UserInterface): Promise<boolean> {
    //     if (!isValidObjectId(postId)) {
    //         throw new HttpException(constants.postNotFound, 404);
    //     }

    //     const post = await Post.findById(postId);

    //     if (!post) {
    //         throw new HttpException(constants.postNotFound, 404);
    //     }

    //     const hasVoted: boolean = post.votes.some(
    //         (voteRecord: VoteInterface) => voteRecord.user.toString() === user.id
    //     );

    //     if (!hasVoted) {
    //         throw new HttpException(constants.notVoted, 403);
    //     }

    //     await post.updateOne({ $pull: { votes: { user: user.id } } });

    //     return true;

    // }
    // public async deleteVote?(answerId: number, user: UserInterface): Promise<boolean> {

    // }



}