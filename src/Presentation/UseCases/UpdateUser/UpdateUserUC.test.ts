import { User } from "../../../Service/Model/User"
import { UsersRepository } from "../../../Service/Repositories/UsersAuthRepository"
import { UpdateUserUC } from "./UpdateUserUC"

describe('Update User feature on usersrepository', () => {
    let usersRepository: UsersRepository
    let updateUserUC: UpdateUserUC
    let NotRealUser: User
    let RealUser: User
    let expectedObject: any

    beforeAll(() => {
        usersRepository = new UsersRepository()
        updateUserUC = new UpdateUserUC(usersRepository)
        NotRealUser = new User({
            displayName: "Luís Daora",
            email: "luis@gmail.com",
            emailVerified: false,
            password: "123asd789",
            disabled: false
        })
        RealUser = new User({
            displayName: "Luís",
            email: "jhons@trabalhos.com",
            emailVerified: false,
            password: "123asd789",
            disabled: false
        })
        expectedObject = {
            data: {
              customClaims: undefined,
              disabled: false,
              displayName: "Luís",
              email: "jhons@trabalhos.com",
              emailVerified: false,
              metadata: {
                creationTime: "Mon, 06 May 2024 23:47:20 GMT",
                lastRefreshTime: null,
                lastSignInTime: null,
              },
              passwordHash: undefined,
              passwordSalt: undefined,
              phoneNumber: undefined,
              photoURL: undefined,
              providerData: [
                {
                  displayName: "Luís",
                  email: "jhons@trabalhos.com",
                  phoneNumber: undefined,
                  photoURL: undefined,
                  providerId: "password",
                  uid: "jhons@trabalhos.com",
                },
              ],
              tenantId: undefined,
              tokensValidAfterTime: expect.stringMatching(/^(\w{3}, \d{2} \w{3} \d{4} \d{2}:\d{2}:\d{2} GMT)$/),
              uid: "tfdanXozImRP0C7UANPks9v89u82",
            },
            valido: true,
            value: 200,
          };
    })

    it('Update User with non existing Email', async () => {
        const updatedUser = await updateUserUC.execute(NotRealUser)
        expect(updatedUser).toEqual({
            valido: false, value: 404, erro: "Not Found" 
        })
    }, 10000)

    it('Update User with an existing email', async () => {
        const updatedUser = await updateUserUC.execute(RealUser)
        expect(updatedUser).toEqual(expectedObject)

    }, 100000)
})