import * as admin from "firebase-admin";
import { UserAuthRepository } from "../../../../Service/Repositories/UserAuthRepository";
import { UserFireStoreRepository } from "../../../../Service/Repositories/UserFireStoreRepository";
import { LoginUserUC } from "./LoginUserUC";
import { ILoginUserRequestDTO } from "./LoginUserDTO";
describe('UserRepository', () => {
    let userAuthRepository: UserAuthRepository;
    let userFireStore: UserFireStoreRepository
    let loginUserUC: LoginUserUC;
    let authLoginApp: any

    beforeAll(() => {
      userAuthRepository = new UserAuthRepository();
      userFireStore = new UserFireStoreRepository()
      loginUserUC = new LoginUserUC(userAuthRepository, userFireStore) 
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
        val: false, erro: "Usuário não encontrado."
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
      expect(user).toEqual({ val: false,  erro: "Login não autorizado." })
    }, 50000)

    test('ReadUser(login) should return an existing user', async () => {
      const ExistingEmail: string = 'jhons@trabalhos.com';
      const CorrectPassword: string  = '123asd789'
      const login: ILoginUserRequestDTO = {
        email: ExistingEmail,
        password:  CorrectPassword,
        
      }
      const user = await loginUserUC.execute(login)
      expect(user).toEqual({ val: true,  data: user.data})
    })
  })
