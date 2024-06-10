import { UserAuthRepository } from "../../../../Service/Repositories/UserAuthRepository";
import { UserFireStoreRepository } from "../../../../Service/Repositories/UserFireStoreRepository";
import { IResetPwdUserRequestDTO } from "./ResetPwdUserDTO";
import { ResetPwdUserUC } from "./ResetPwdUserUC";

describe("UserRepository function getAllPosts to return a Array List of Posts from Firebase", () => {
  let usersA: UserAuthRepository;
  let resetpwdUC: ResetPwdUserUC;

  beforeAll(() => {
    usersA = new UserAuthRepository();
    resetpwdUC = new ResetPwdUserUC(usersA);
  });
  test("Trying to reset with a non existing email", async () => {
    const nonExistingEmail: IResetPwdUserRequestDTO = {
      email: "aroldo@gmail.com",
    };
    const user = await resetpwdUC.execute(nonExistingEmail);

    expect(user).toEqual({ valido: false, value: 404, erro: "Not Found" });
  }, 100000);
  test("Trying to reset with an existing email", async () => {
    const ExistingEmail: IResetPwdUserRequestDTO = {
      email: "dias44520@gmail.com",
    };
    const user = await resetpwdUC.execute(ExistingEmail);
    expect(user).toEqual({ valido: false, value: 200, data: user.data});
  }, 100000);
});
