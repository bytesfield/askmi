import { VoteService } from '../../api/services/vote.service';
import { UserInterface } from '../../interfaces/models/user.interface';
import { AnswerInterface } from '../../interfaces/models/answer.interface';

export default class VoteFactory {
    public async create(data: Record<string, any> = {}, answerId: number, user: UserInterface): Promise<AnswerInterface> {
        const service = new VoteService();
        const { vote } = data;

        return service.vote(answerId, user, vote);
    }

}