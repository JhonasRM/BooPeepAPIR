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
  });

  test('findByEmail should return the user for existing email', async () => {
    const existingEmail = 'john@example.com';
    const user = await userRepository.findByEmail(existingEmail);
    expect(user).toEqual({
      "name": 'John Doe',
      "email": 'john@example.com',
      "password": 'securepassword',
    });
  });
  // test('save should return the an existing user', async () => {
  //   const data: ICreateUserRequestDTO= {
  //     name: 'Jhonas Histórias',
  //   email: 'jhonas@trabalhos.com',
  //   password: '123asd789',
  //   }
  //   const newUser: ICreateUserRequestDTO = new User(data)
  //   const createUserUC: CreateUserUC = new CreateUserUC(userRepository)
  //   createUserUC.execute(newUser)
  // })
});