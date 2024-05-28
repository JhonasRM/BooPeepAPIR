import { UsersAuthRepository } from "../../../../Service/Repositories/UserAuthRepository";
import { UsersFireStoreRepository } from "../../../../Service/Repositories/UserFireStoreRepository";
import { IReadUserRequestDTO } from "./ReadUserDTO";
import { ReadUserUC } from "./ReadUserUC";

describe('UserRepository', () => {
    let usersA: UsersAuthRepository
    let userF: UsersFireStoreRepository
    let readUserUC: ReadUserUC;
  
    beforeAll(() => {
      usersA = new UsersAuthRepository();
      userF = new UsersFireStoreRepository()
      readUserUC = new ReadUserUC(usersA, userF)
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
    test('ReadUser(login) should return object user', async () => {
      const ExistingEmail: string = 'jhons@trabalhos.com';
      const correctPassword: string  = '123asd789'
      const login: IReadUserRequestDTO = {
        email: ExistingEmail,
        password:  correctPassword,
        
      }
      const user = await readUserUC.execute(login)
  expect(user).toEqual({valido: true, value: 200, data: user.data})
    }, 50000)
  })