
import { UserAuthRepository } from "../../../../Service/Repositories/UserAuthRepository";
import { UserFireStoreRepository } from "../../../../Service/Repositories/UserFireStoreRepository";
import { CreateUserRequestDTO } from "./CreateUserDTO";
import { CreateUserUC } from "./CreateUserUC";

describe('UserRepository', () => {
  let usersA: UserAuthRepository
  let usersF: UserFireStoreRepository
  let createUserUC: CreateUserUC

  beforeAll(() => {
    usersA = new UserAuthRepository()
    usersF = new UserFireStoreRepository()
    createUserUC = new CreateUserUC(usersA, usersF)
  });

  test('Create Post without user verification should return by console.log the post data', async () => {
    const UserData: CreateUserRequestDTO = new  CreateUserRequestDTO(
         {displayName: 'Aroldo Histórias',
         email: 'dias44520@gmail.com',
         password: '123asd789',}
    )
    const NewUser = await createUserUC.execute(UserData)
    expect(NewUser).toEqual({
      val: true,
      data: NewUser.data
  })}, 50000)

  test('Create Post with an existing user should return error', async () => {
    
    const UserData: CreateUserRequestDTO = new  CreateUserRequestDTO(
      {displayName: 'Jhons Histórias',
      email: 'jhons@trabalhos.com',
      password: '123asd789',}
 )
    const NewUser = await createUserUC.execute(UserData)
    expect(NewUser).toEqual({ val: false, erro: "Este email já está cadastrado"});
  })
  });
