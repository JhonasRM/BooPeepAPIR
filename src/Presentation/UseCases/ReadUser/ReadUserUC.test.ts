import * as admin from "firebase-admin";
import { User } from "../../../Service/Model/User";
import { UsersAuthRepository } from "../../../Service/Repositories/UsersAuthRepository";
import { IReadUserRequestDTO } from "./ReadUserDTO";
import { ReadUserUC } from "./ReadUserUC";
import { UsersFireStoreRepository } from "../../../Service/Repositories/UsersFireStoreRepository";
describe('UserRepository', () => {
    let usersAuthRepository: UsersAuthRepository;
    let userFireStore: UsersFireStoreRepository
    let readUserUC: ReadUserUC;
    let authLoginApp: any

    beforeAll(() => {
      usersAuthRepository = new UsersAuthRepository();
      userFireStore = new UsersFireStoreRepository()
      readUserUC = new ReadUserUC(usersAuthRepository, userFireStore) 
    });
  
    test('VerifyWPassword should return null for non-existing email', async () => {
      const nonExistingEmail: string = 'nonexisting@example.com';
      const incorrectPassword: string  = '123456'
      const login: IReadUserRequestDTO = {
        email: nonExistingEmail,
        password:  incorrectPassword,
        
      }
      const user = await readUserUC.execute(login)
      expect(user).toEqual({
        valido: false, value: 404, erro: "Not Found"
      })
    }, 100000);

    test('ReadUser(login) should return error for incorrect password', async () => {
      const ExistingEmail: string = 'jhons@trabalhos.com';
      const incorrectPassword: string  = '123456'
      const login: IReadUserRequestDTO = {
        email: ExistingEmail,
        password:  incorrectPassword,
        
      }
      const user = await readUserUC.execute(login)
      expect(user).toEqual({ valido: false, value: 401, erro: "Unauthorized" })
    }, 50000)

    test('ReadUser(login) should return an existing user', async () => {
      const ExistingEmail: string = 'jhons@trabalhos.com';
      const CorrectPassword: string  = '123asd789'
      const login: IReadUserRequestDTO = {
        email: ExistingEmail,
        password:  CorrectPassword,
        
      }
      const user = await readUserUC.execute(login)
      expect(user).toEqual({ valido: true, value: 200, data: user.data})
    })

  //   test('ReadUser(login) should return object user', async () => {
  //     const ExistingEmail: string = 'jhons@trabalhos.com';
  //     const correctPassword: string  = '123asd789'
  //     const login: IReadUserRequestDTO = {
  //       email: ExistingEmail,
  //       password:  correctPassword,
        
  //     }
  //     const user = await readUserUC.execute(authLoginApp, login)
  // expect(user).toEqual(expect.objectContaining({
  //   erro: undefined,
  //   valido: true,
  //   value: 200,
  //   data: {
  //     customClaims: undefined,
  //     disabled: false,
  //     displayName: 'Jhons Histórias',
  //     email: 'jhons@trabalhos.com',
  //     emailVerified: false,
  //     metadata: {
  //       creationTime: "Mon, 06 May 2024 23:47:20 GMT",
  //       lastRefreshTime: null,
  //       lastSignInTime: null,
  //     },
  //     passwordHash: undefined,
  //     passwordSalt: undefined,
  //     phoneNumber: undefined,
  //     photoURL: undefined,
  //     providerData: [
  //       {
  //         displayName: 'Jhons Histórias',
  //         email: 'jhons@trabalhos.com',
  //         phoneNumber: undefined,
  //         photoURL: undefined,
  //         providerId: 'password',
  //         uid: 'jhons@trabalhos.com',
  //       },
  //     ],
  //     tenantId: undefined,
  //     tokensValidAfterTime: "Mon, 06 May 2024 23:47:20 GMT",
  //     uid: "tfdanXozImRP0C7UANPks9v89u82",
  //   },
  // }))
  //   }, 50000)
  })
