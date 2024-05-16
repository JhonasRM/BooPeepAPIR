import { UsersAuthRepository } from "../../../../Service/Repositories/UsersAuthRepository";
import { UsersFireStoreRepository } from "../../../../Service/Repositories/UsersFireStoreRepository";
import { IDeleteUserRequestDTO } from "./DeleteUserDTO";
import { DeleteUserUC } from "./DeleteUserUC";

describe('UsersRepository delete feature test', () => {
    let userA: UsersAuthRepository
    let userF: UsersFireStoreRepository
    let deleteUserUC: DeleteUserUC
    let realuserToDel : IDeleteUserRequestDTO
    let notrealuserToDel : IDeleteUserRequestDTO

    beforeAll(()=> {
        userA = new UsersAuthRepository()
        userF = new UsersFireStoreRepository()
        deleteUserUC = new DeleteUserUC(userA, userF)
        notrealuserToDel = {
            email: 'jonathan@trabalhos.com'
        }
        realuserToDel = {
            email: 'aroldo@trabalhos.com'
        }
    })

    test('DeleteUser with a non existing email', async () => {
        const deletedUser = await deleteUserUC.delete(notrealuserToDel)
        expect(deletedUser).toEqual({
             valido: false, value: 404, erro: "Not Found" 
        })
    }, 100000)

    test('Delete User with an existing id', async () => {
            const deletedUser = await deleteUserUC.delete(realuserToDel)        
        expect(deletedUser).toEqual({
            valido: true, value: 200, data: "Usuario deletado com sucesso"
        })
    }, 10000)
})
    