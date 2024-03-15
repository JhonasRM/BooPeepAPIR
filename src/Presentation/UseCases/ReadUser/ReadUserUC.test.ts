import { UsersRepository } from "../../../Service/Repositories/UsersRepository";

describe('UserRepository', () => {
    let userRepository: UsersRepository;
  
    beforeAll(() => {
      userRepository = new UsersRepository();
    });
  
    test('VerifyWPassword should return null for non-existing email', async () => {
      const nonExistingEmail = 'nonexisting@example.com';
      const incorrectPassword  = '123456'
      const user = await userRepository.VerifyWPassword(nonExistingEmail, incorrectPassword)
      expect(user).toBeNull();
    });

    test('VerifyWPassword should return error for incorrect password', async () => {
      const ExistingEmail = 'john@example.com';
      const incorrectPassword  = '123456'
      const user = await userRepository.VerifyWPassword(ExistingEmail, incorrectPassword)
      expect(user).toBeNull()
    })

    test('VerifyWPassword should return User for correct email and password', async () => {
      const ExistingEmail = 'john@example.com';
      const CorrectPassword  = 'securepassword'
      const user = await userRepository.VerifyWPassword(ExistingEmail, CorrectPassword)
      expect(user).toEqual({
        "name": 'John Doe',
        "email": 'john@example.com',
        "password": 'securepassword',
      });
    })

  })
