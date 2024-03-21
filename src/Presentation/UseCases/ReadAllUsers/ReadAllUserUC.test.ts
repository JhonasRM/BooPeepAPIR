import { User } from "../../../Service/Model/User"
import { UsersRepository } from "../../../Service/Repositories/UsersRepository"

describe('UserRepository', () => {
    let userRepository: UsersRepository

    beforeAll(() => {
        userRepository = new UsersRepository()
    })

    test('getAllUsers should return an Array of type Users', async () => {
        const Users = await userRepository.getAllUsers()
        expect(Users).toContain(User)
    })
})