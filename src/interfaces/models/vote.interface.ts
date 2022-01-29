
export interface BaseVoteInterface {
  id: number;
  type: string;
}

export interface VoteInterface extends BaseVoteInterface {
  createdAt?: Date;
  updatedAt?: Date;
}
