import { conn } from "../../../../Data Access/DAO/conn";
import { User } from "../../../../Service/Model/User";
import { UserOnAuth } from "../../../../Service/Model/UserOnAuth";
import { UsersAuthRepository } from "../../../../Service/Repositories/UsersAuthRepository";
import { UsersFireStoreRepository } from "../../../../Service/Repositories/UsersFireStoreRepository";
import { CreateUserRequestDTO } from "./CreateUserDTO";
import { CreateUserUC } from "./CreateUserUC";

describe('UserRepository', () => {
  let usersA: UsersAuthRepository
  let usersF: UsersFireStoreRepository
  let createUserUC: CreateUserUC

  beforeAll(() => {
    usersA = new UsersAuthRepository()
    usersF = new UsersFireStoreRepository()
    createUserUC = new CreateUserUC(usersA, usersF)
  });

  test('Create Post without user verification should return by console.log the post data', async () => {
    const UserData: CreateUserRequestDTO = new  CreateUserRequestDTO(
         {displayName: 'Aroldo Histórias',
         email: 'aroldo@trabalhos.com',
         password: '123asd789',}
    )
    const NewUser = await createUserUC.execute(UserData)
    expect(NewUser).toEqual({
      valido: true,
      value: 201,
      data: NewUser.data
  })}, 50000)

  test('Create Post with an existing user should return error', async () => {
    
    const UserData: CreateUserRequestDTO = new  CreateUserRequestDTO(
      {displayName: 'Jhons Histórias',
      email: 'jhons@trabalhos.com',
      password: '123asd789',}
 )
    const NewUser = await createUserUC.execute(UserData)
    expect(NewUser).toEqual({ valido: false, value: 401, erro: 'Unauthorized'});
  })
  });
