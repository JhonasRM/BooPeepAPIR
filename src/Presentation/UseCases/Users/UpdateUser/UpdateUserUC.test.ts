
import { UserAuthRepository } from "../../../../Service/Repositories/UserAuthRepository"
import { UserFireStoreRepository } from "../../../../Service/Repositories/UserFireStoreRepository"
import { IUpdateUserRequestDTO } from "./UpdateUserDTO"
import { UpdateUserUC } from "./UpdateUserUC"

describe('Update User feature on usersrepository', () => {
    let UserAuth: UserAuthRepository
    let UserFire: UserFireStoreRepository
    let updateUserUC: UpdateUserUC
    let NotRealUser: IUpdateUserRequestDTO
    let RealUser: IUpdateUserRequestDTO
    let expectedObject: any

    beforeAll(() => {
      UserAuth = new UserAuthRepository()
      UserFire = new UserFireStoreRepository()

        updateUserUC = new UpdateUserUC(UserAuth, UserFire)
        
    })

    it('Update User with non existing Email', async () => {
      const NotRealUser: IUpdateUserRequestDTO =  {
        email: 'johns@trabalhos.com',
        fieldToUpdate: 'email',
        newValue: 'luis@trabalhos.com',
      }
        const updatedUser = await updateUserUC.execute(NotRealUser)
        expect(updatedUser).toEqual({
            valido: false, value: 404, erro: "Not Found" 
        })
    }, 10000)

    it('Update User with an existing email', async () => {
      const RealUser: IUpdateUserRequestDTO = {
        email: 'luis@trabalhos.com',
        fieldToUpdate: 'email',
        newValue: 'jhons@trabalhos.com',
      }
        const updatedUser = await updateUserUC.execute(RealUser)
        expect(updatedUser).toEqual({ valido: true, value: 200})

    }, 10000)
})