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
      expect(user.value).toBeNull()
    }, 100000);

    test('VerifyWPassword should return error for incorrect password', async () => {
      const nonExistingEmail: string = 'jonathan@trabalhos.com';
      const incorrectPassword: string  = '123456'
      const login: IReadUserRequestDTO = {
        email: nonExistingEmail,
        password:  incorrectPassword,
        
      }
      const user = await userRepository.findByEmail(login.email)
      if (user.valido === false) {
       console.log('Este usuário não existe')
    } else {
      const loggedUser = user.value
        console.log('Usuário Encontrado')
        if( loggedUser?.password === login.password){
            console.log('Usuário Logado com sucesso') 
            return loggedUser
        }
        console.log('Senha Incorreta')
    }
      expect(user.value).toBeInstanceOf(User)
    }, 50000)
  })
