import { User } from "../../../Service/Model/User"
import { UsersRepository } from "../../../Service/Repositories/UsersRepository"

describe('UsersRepository delete feature test', () => {
    let usersRepository: UsersRepository
    let user : User

    beforeAll(()=> {
        usersRepository = new UsersRepository()
        user = new User({
            'name': 'Jhonas Histórias',
            'email': 'jonathan123@gmail.com',
            'password': '123asd789'
        })
    })
    test('DeleteUser with a non existing id', async () => {
        const wantedUser = user;
        const deletedUser = await usersRepository.delete(wantedUser);
        expect(deletedUser).toBe(undefined)
    })
    test('Delete User with an existing id', async () => {
        const wantedUser = await usersRepository.findByEmail('jhonas@trabalhos')
        if(wantedUser === null){
            return
        }
        const deletedUser = await usersRepository.delete(wantedUser)
        expect(deletedUser).not.toBeNull()
    }, 10000)
})