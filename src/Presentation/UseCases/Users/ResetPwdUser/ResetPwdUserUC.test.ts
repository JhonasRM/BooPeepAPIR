import { UsersAuthRepository } from "../../../../Service/Repositories/UsersAuthRepository";
import { UsersFireStoreRepository } from "../../../../Service/Repositories/UsersFireStoreRepository";
import { IResetPwdUserRequestDTO } from "./ResetPwdUserDTO";
import { ResetPwdUserUC } from "./ResetPwdUserUC";

describe("UserRepository function getAllPosts to return a Array List of Posts from Firebase", () => {
  let usersA: UsersAuthRepository;
  let usersF: UsersFireStoreRepository;
  let resetpwdUC: ResetPwdUserUC;

  beforeAll(() => {
    usersA = new UsersAuthRepository();
    usersF = new UsersFireStoreRepository();
    resetpwdUC = new ResetPwdUserUC(usersA, usersF);
  });
  test("Trying to reset with a non existing email", async () => {
    const nonExistingEmail: IResetPwdUserRequestDTO = {
      email: "aroldo@gmail.com",
    };
    const user = await resetpwdUC.execute(nonExistingEmail);

    expect(user).toEqual({ valido: false, value: 404, erro: "Not Found" });
  }, 100000);
  test("Trying to reset with a non existing email", async () => {
    const ExistingEmail: IResetPwdUserRequestDTO = {
      email: "dias44520@gmail.com",
    };
    const user = await resetpwdUC.execute(ExistingEmail);
    expect(user).toEqual({ valido: false, value: 200, data:'E-mail de redefinição de senha enviado com sucesso'});
  }, 100000);
});
