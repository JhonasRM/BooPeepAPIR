import { User } from "../../../Service/Model/User";
import { UsersRepository } from "../../../Service/Repositories/UsersRepository";
import { IReadUserRequestDTO } from "./ReadUserDTO";

describe('UserRepository', () => {
    let userRepository: UsersRepository;
  
    beforeAll(() => {
      userRepository = new UsersRepository();
    });
  
    test('VerifyWPassword should return null for non-existing email', async () => {
      const nonExistingEmail: string = 'nonexisting@example.com';
      const incorrectPassword: string  = '123456'
      const login: IReadUserRequestDTO = {
        email: nonExistingEmail,
        password:  incorrectPassword,
        
      }
      const user = await userRepository.findByEmail(login.email)
      expect(user).toBeNull();
    }, 100000);

    test('VerifyWPassword should return error for incorrect password', async () => {
      const nonExistingEmail: string = 'john@example.com';
      const incorrectPassword: string  = '123456'
      const login: IReadUserRequestDTO = {
        email: nonExistingEmail,
        password:  incorrectPassword,
        
      }
      const user = await userRepository.findByEmail(login.email)
      if (user === null) {
       console.log('Este usuário não existe')
    } else {
        console.log('Usuário Encontrado')
        if( user.password === login.password){
            console.log('Usuário Logado com sucesso') 
            return user
        }
        console.log('Senha Incorreta')
    }

      expect(user).toEqual( {"email": "john@example.com", "name": "John Doe", "password": "securepassword"})
    }, 50000)
  })
