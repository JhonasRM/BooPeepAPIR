import { conn } from "../../../Data Access/DAO/conn";
import { User } from "../../../Service/Model/User";
import { UsersRepository as UserRepository } from "../../../Service/Repositories/UsersRepository";

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeAll(() => {
    userRepository = new UserRepository();
  });

  test('Create Post without user verification should return by console.log the post data', async () => {
    const UserData: User = new  User({
        'name': 'Jhonas Histórias',
        'email': 'jhonas@trabalhos.com',
        'password': '123asd789'
    })
    const NewUser = await userRepository.save(UserData)
expect(NewUser).not.toBeNull()
}, 100000);

  });
