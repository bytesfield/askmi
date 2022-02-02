import faker from 'faker';
import { AnswerService } from '../../api/services/answer.service';
import { AnswerInterface } from '../../interfaces/models/answer.interface';
import { UserInterface } from '../../interfaces/models/user.interface';

export default class AnswerFactory {
    public async create(data: Record<string, any> = {}, questionId: number, user: UserInterface): Promise<AnswerInterface> {
        const service = new AnswerService();
        const { body } = data;

        return service.createAnswer({
            body: body ?? faker.lorem.paragraph(),
        }, questionId, user);
    }

}