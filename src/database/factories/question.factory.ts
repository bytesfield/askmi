import faker from 'faker';
import { QuestionInterface } from '../../interfaces/models/question.interface';
import { QuestionService } from '../../api/services/question.service';
import { UserInterface } from '../../interfaces/models/user.interface';

export default class QuestionFactory {
    public async create(data: Record<string, string> = {}, user: UserInterface): Promise<QuestionInterface> {
        const service = new QuestionService();
        const { title, body } = data;

        return service.createQuestion({
            title: title ?? faker.lorem.sentence(),
            body: body ?? faker.lorem.paragraph(),

        }, user);
    }

}