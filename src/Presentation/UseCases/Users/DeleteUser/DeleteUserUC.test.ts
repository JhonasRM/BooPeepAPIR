import { UserAuthRepository } from "../../../../Service/Repositories/UserAuthRepository";
import { UserFireStoreRepository } from "../../../../Service/Repositories/UserFireStoreRepository";
import { IDeleteUserRequestDTO } from "./DeleteUserDTO";
import { DeleteUserUC } from "./DeleteUserUC";

describe('UsersRepository delete feature test', () => {
    let userA: UserAuthRepository
    let userF: UserFireStoreRepository
    let deleteUserUC: DeleteUserUC
    let realuserToDel : IDeleteUserRequestDTO
    let notrealuserToDel : IDeleteUserRequestDTO

    beforeAll(()=> {
        userA = new UserAuthRepository()
        userF = new UserFireStoreRepository()
        deleteUserUC = new DeleteUserUC(userA, userF)
        notrealuserToDel = {
            email: 'jonathan@trabalhos.com'
        }
        realuserToDel = {
            email: 'jhons@trabalhos.com'
        }
    })

    test('DeleteUser with a non existing email', async () => {
        const deletedUser = await deleteUserUC.delete(notrealuserToDel)
        expect(deletedUser).toEqual({
             val: false, erro: "Usuário não encontrado" 
        })
    }, 100000)

    test('Delete User with an existing id', async () => {
            const deletedUser = await deleteUserUC.delete(realuserToDel)        
        expect(deletedUser).toEqual({
            val: true,  data: "Usuario deletado com sucesso"
        })
    }, 10000)
})
    