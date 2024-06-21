import { UserAuthRepository } from "../../../../Service/Repositories/UserAuthRepository";
import { UserFireStoreRepository } from "../../../../Service/Repositories/UserFireStoreRepository";
import { IReadUserRequestDTO } from "../ReadUser/ReadUserDTO";
import { ReadUserUC } from "../ReadUser/ReadUserUC";

describe('UserRepository', () => {
    let usersA: UserAuthRepository
    let userF: UserFireStoreRepository
    let readUserUC: ReadUserUC;
  
    beforeAll(() => {
      usersA = new UserAuthRepository();
      userF = new UserFireStoreRepository()
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
        val: false, erro: "Usuário não encontrado."
      })
    }, 100000);
    test('ReadUser(login) should return object user', async () => {
      const ExistingEmail: string = 'dias44520@gmail.com';
      const correctPassword: string  = '123asd789'
      const login: IReadUserRequestDTO = {
        email: ExistingEmail,
        password:  correctPassword,
        
      }
      const user = await readUserUC.execute(login)
  expect(user).toEqual({val: true,  data: user.data})
    }, 50000)
  })