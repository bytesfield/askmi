import { vote } from "../../types/custom";
import { AnswerInterface } from "./answer.interface";
import { UserInterface } from "./user.interface";

export interface BaseVoteInterface {
  id: number;
  type: string;
}

export interface VoteInterface extends BaseVoteInterface {
  createdAt?: Date;
  updatedAt?: Date;
  vote?(answerId: number, user: UserInterface, type: vote): Promise<AnswerInterface>;
  deleteVote?(answerId: number, user: UserInterface): Promise<boolean>;
}
