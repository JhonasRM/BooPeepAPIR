import { UserOnAuth } from "../../../../Service/Model/UserOnAuth";
import { UsersAuthRepository } from "../../../../Service/Repositories/UsersAuthRepository";
import { UsersFireStoreRepository } from "../../../../Service/Repositories/UsersFireStoreRepository";
import { IResetPwdUserRequestDTO } from "./ResetPwdUserDTO";

export class ResetPwdUserUC {
  constructor(
    private usersAuthRepository: UsersAuthRepository,
    private usersFireStoreRepository: UsersFireStoreRepository
  ) {}
  async execute(data: IResetPwdUserRequestDTO):Promise<{valido: boolean, value: number, erro?: string, data?: string}>{
    try {
      const wantedUser = await this.usersAuthRepository.findByEmail(data.email);
      const wantedUserData = await this.usersFireStoreRepository.findByEmail(
        data.email
      );
      if (wantedUser.valido === false || wantedUserData.valido === false) {
        return { valido: false, value: 404, erro: "Not Found" };
      }
      const user: UserOnAuth = wantedUser.value as UserOnAuth
      const resetPassword = await this.usersAuthRepository.resetPassword(user)
      if(resetPassword.valido === false){
        return { valido: false, value: 500,  erro:"Internal Server Error"}
      }
      const parsedURL  = new URL(resetPassword.value as string)
      const token = parsedURL.searchParams.get('oobCode') 
      return { valido: true, value: 200, data: token as string}
    } catch (error) {
        return {valido: false, value: 503, erro: "Unknown Error"}
    }
  }
}
