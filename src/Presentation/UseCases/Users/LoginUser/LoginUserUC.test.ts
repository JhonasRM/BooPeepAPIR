import * as admin from "firebase-admin";
import { UsersAuthRepository } from "../../../../Service/Repositories/UsersAuthRepository";
import { UsersFireStoreRepository } from "../../../../Service/Repositories/UsersFireStoreRepository";
import { LoginUserUC } from "./LoginUserUC";
import { ILoginUserRequestDTO } from "./LoginUserDTO";
describe('UserRepository', () => {
    let usersAuthRepository: UsersAuthRepository;
    let userFireStore: UsersFireStoreRepository
    let loginUserUC: LoginUserUC;
    let authLoginApp: any

    beforeAll(() => {
      usersAuthRepository = new UsersAuthRepository();
      userFireStore = new UsersFireStoreRepository()
      loginUserUC = new LoginUserUC(usersAuthRepository, userFireStore) 
    });
  
    test('VerifyWPassword should return null for non-existing email', async () => {
      const nonExistingEmail: string = 'nonexisting@example.com';
      const incorrectPassword: string  = '123456'
      const login: ILoginUserRequestDTO = {
        email: nonExistingEmail,
        password:  incorrectPassword,
        
      }
      const user = await loginUserUC.execute(login)
      expect(user).toEqual({
        valido: false, value: 404, erro: "Not Found"
      })
    }, 100000);

    test('ReadUser(login) should return error for incorrect password', async () => {
      const ExistingEmail: string = 'jhons@trabalhos.com';
      const incorrectPassword: string  = '123456'
      const login: ILoginUserRequestDTO = {
        email: ExistingEmail,
        password:  incorrectPassword,
        
      }
      const user = await loginUserUC.execute(login)
      expect(user).toEqual({ valido: false, value: 401, erro: "Unauthorized" })
    }, 50000)

    test('ReadUser(login) should return an existing user', async () => {
      const ExistingEmail: string = 'jhons@trabalhos.com';
      const CorrectPassword: string  = '123asd789'
      const login: ILoginUserRequestDTO = {
        email: ExistingEmail,
        password:  CorrectPassword,
        
      }
      const user = await loginUserUC.execute(login)
      expect(user).toEqual({ valido: true, value: 200, data: user.data})
    })
  })
