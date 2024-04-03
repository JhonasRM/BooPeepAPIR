import { conn } from "../../../Data Access/DAO/conn";
import { UsersRepository as UserRepository } from "../../../Service/Repositories/UsersRepository";

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeAll(() => {
    userRepository = new UserRepository();
  });

  test('findByEmail should return null for non-existing email', async () => {
    const nonExistingEmail = 'nonexisting@example.com';
    const user = await userRepository.findByEmail(nonExistingEmail);
    expect(user).toBeNull();
  }, 1000000);

  test('findByEmail should return the user for existing email', async () => {
    const existingEmail = 'john@example.com';
    const user = await userRepository.findByEmail(existingEmail);
    expect(user).toEqual({
      "name": 'John Doe',
      "email": 'john@example.com',
      "password": 'securepassword',
    });
  }, 1000000);
});