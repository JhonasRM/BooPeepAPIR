import { User } from "../../../Service/Model/User"
import { UsersRepository } from "../../../Service/Repositories/UsersRepository"

describe('Update User feature on usersrepository', () => {
    let usersRepository: UsersRepository
    let user: User
    beforeAll(() => {
        usersRepository = new UsersRepository()
        user = new User({
            'name': 'Professor Luís Bobão',
            'email': 'jonathan123@gmail.com',
            'password': '123asd789'
        })
    })

    it('Update User with non existing Email', async () => {
        const updatedUser = await usersRepository.update(user)
        expect(updatedUser).toBeUndefined()
    }, 10000)

    it('Update User with an existing email', async () => {
        user.email = 'john@example.com'
        const updatedUser = await usersRepository.update(user)
        expect(updatedUser).not.toBeNull()

    }, 100000)
})