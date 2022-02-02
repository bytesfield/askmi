import faker from 'faker';
import { UserInterface } from '../../interfaces/models/user.interface';
import { UserService } from '../../api/services/user.service';
import { hash } from '../../utils/helpers.util';

export const defaultPassword = 'Password@123';

export default class UserFactory {
    public async create(data: Record<string, string> = {}): Promise<UserInterface> {
        const service = new UserService();
        const { firstName, lastName, username, email } = data;

        return service.createUser({
            firstName: firstName ?? faker.name.firstName(),
            lastName: lastName ?? faker.name.lastName(),
            email: email ?? faker.internet.email(),
            username: username ?? faker.name.middleName(),
            password: await hash(defaultPassword),
            emailVerifiedAt: new Date()
        });
    }

    public async login(data: Record<string, string> = {}): Promise<{ user: UserInterface; token: string }> {
        const user: UserInterface = await this.create(data);

        const userService = new UserService();

        return userService.login({ email: user.email, password: 'Password@123' });
    }
}