import { User } from "../../../Service/Model/User"
import { UsersRepository } from "../../../Service/Repositories/UsersRepository"

describe('UserRepository function getAllUsers to return a Array List of Users from Firebase', () => {
    let userRepository: UsersRepository

    beforeAll(() => {
        userRepository = new UsersRepository();
    });

    test('getAllUsers should return an Array of type Users', async () => {
        const Users = await userRepository.getAllUsers();
        expect(Users).toBeInstanceOf(Array);
        expect(Users?.length).toBeGreaterThan(0);
    }, 10000);
})
