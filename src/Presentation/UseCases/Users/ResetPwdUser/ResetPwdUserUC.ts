import { IReturnAdapter } from "../../../../utils/Interfaces/IReturnAdapter";
import { UserOnAuth } from "../../../../Service/Model/UserOnAuth";
import { UserAuthRepository } from "../../../../Service/Repositories/UsersAuthRepository";
import { UserFireStoreRepository } from "../../../../Service/Repositories/UsersFireStoreRepository";
import { IResetPwdUserRequestDTO } from "./ResetPwdUserDTO";

export class ResetPwdUserUC {
  constructor(
    private userAuthRepository: UserAuthRepository
  ) {}
  async execute(data: IResetPwdUserRequestDTO):Promise<IReturnAdapter>{
    try {
      const wantedUser = await this.userAuthRepository.getUser(data.email);
      if (wantedUser.val === false) {
        return { val: false, erro: "Not Found" };
      }
      const user: UserOnAuth = wantedUser.data as UserOnAuth
      const resetPassword = await this.userAuthRepository.resetPassword(user)
      if(resetPassword.val === false){
        return { val: false, erro:"Internal Server Error"}
      }
      return { val: true, data: resetPassword.data}
    } catch (error) {
        return {val: false, erro: "Unknown Error"}
    }
  }
}
