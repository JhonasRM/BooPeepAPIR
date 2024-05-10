import { User } from "../../../Service/Model/User"
import { UsersRepository } from "../../../Service/Repositories/UsersAuthRepository"
import { IDeleteUserRequestDTO } from "./DeleteUserDTO";
import { DeleteUserUC } from "./DeleteUserUC";

describe('UsersRepository delete feature test', () => {
    let usersRepository: UsersRepository
    let deleteUserUC: DeleteUserUC
    let user : User

    beforeAll(()=> {
        usersRepository = new UsersRepository()
        deleteUserUC = new DeleteUserUC(usersRepository)
        user = new User({
            displayName: 'Jhonas Histórias',
            email: 'jonathan@gmail.com',
            password: '123asd789',
            emailVerified: false,
            disabled: false
        })
    })
    test('DeleteUser with a non existing id -> Testing DeleteUserUC method', async () => {
        const wantedUser = user as IDeleteUserRequestDTO;
        const deletedUser = await deleteUserUC.delete(wantedUser)
        expect(deletedUser).toEqual({
             valido: false, value: 404, erro: "Not Found" 
        })
    })
    test('Delete User with an existing id -> Testing UsersRepositorys method', async () => {
        const wantedUser = await usersRepository.findByEmail('igor@gmail.com')
            const deletedUser = await usersRepository.delete(wantedUser.value as User)        
        expect(deletedUser).toEqual({
             valido: true, value: 'Usuario deletado com sucesso', erro: undefined 
        })
    }, 10000)
})