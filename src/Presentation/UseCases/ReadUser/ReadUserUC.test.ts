import { User } from "../../../Service/Model/User";
import { UsersRepository } from "../../../Service/Repositories/UsersRepository";
import { IReadUserRequestDTO } from "./ReadUserDTO";
import { ReadUserUC } from "./ReadUserUC";

describe('UserRepository', () => {
    let userRepository: UsersRepository;
    let readUserUC: ReadUserUC;
  
    beforeAll(() => {
      userRepository = new UsersRepository();
      readUserUC = new ReadUserUC(userRepository)
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

    test('ReadUser(login) should return object user', async () => {
      const ExistingEmail: string = 'igor@gmail.com';
      const correctPassword: string  = '123asd789'
      const login: IReadUserRequestDTO = {
        email: ExistingEmail,
        password:  correctPassword,
        
      }
      const user = await readUserUC.execute(login)
      console.log(`Password encontrada: ${user.data?.password}`)
      expect(user).toEqual({ valido: true, value: 200, data: user.value  })
    }, 50000)
  })
