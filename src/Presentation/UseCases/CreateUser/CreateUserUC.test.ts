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
        displayName: 'Jhons Histórias',
        email: 'jhons@trabalhos.com',
        password: '123asd789',
        emailVerified: false,
        disabled: false
    })
    const NewUser = await userRepository.save(UserData)
    expect(NewUser).toEqual(expect.objectContaining({
      erro: undefined,
      valido: true,
      value: {
        customClaims: undefined,
        disabled: false,
        displayName: 'Jhons Histórias',
        email: 'jhons@trabalhos.com',
        emailVerified: false,
        metadata: {
          creationTime: expect.any(String),
          lastRefreshTime: null,
          lastSignInTime: null,
        },
        passwordHash: undefined,
        passwordSalt: undefined,
        phoneNumber: undefined,
        photoURL: undefined,
        providerData: [
          {
            displayName: 'Jhons Histórias',
            email: 'jhons@trabalhos.com',
            phoneNumber: undefined,
            photoURL: undefined,
            providerId: 'password',
            uid: 'jhons@trabalhos.com',
          },
        ],
        tenantId: undefined,
        tokensValidAfterTime: expect.any(String),
        uid: expect.any(String),
      },
    }));
  }, 10000)

  });
