
import { User } from "../../../../Service/Entities/User";
import { IReturnAdapter } from "../../../../utils/Interfaces/IReturnAdapter";
import { UserOnAuth } from "../../../../Service/Model/UserOnAuth";
import { UserOnFirestore } from "../../../../Service/Model/UserOnFireStore";
import { UserAuthRepository } from "../../../../Service/Repositories/UserAuthRepository";
import { UserFireStoreRepository } from "../../../../Service/Repositories/UserFireStoreRepository";
import { ILoginUserRequestDTO } from "./LoginUserDTO";
export class LoginUserUC {
  constructor(private userAuthRepository: UserAuthRepository, private userFireStoreRepository: UserFireStoreRepository) {}
  async execute(
    data: ILoginUserRequestDTO
  ): Promise<IReturnAdapter> {
    try {
      const wantedUser = await this.userAuthRepository.getUser(data.email);
      if (wantedUser.val === false) {
        throw new Error('Usuário não encontrado.')
      }
      const userAuth = wantedUser.data as UserOnAuth
      const wantedUserData = await this.userFireStoreRepository.getUser(userAuth.uid as string)
      if(wantedUserData.val === false){
        throw new Error('Usuário não encontrado.')
      }
      const loginUserAuth = await this.userAuthRepository.loginOnAuth(data.email, data.password)
      if ( loginUserAuth.val === false) {
        throw new Error('Login não autorizado.')
      }
      const userOnAuth = loginUserAuth.data as UserOnAuth
      const userOnFirestore = wantedUserData.data as UserOnFirestore
      const user: User = new User(userOnAuth, userOnFirestore)
      console.log(user)
      return { val: true, data: user};
    } catch (error) {
      if(error instanceof Error){
        return { val: false, erro: error.message}
      }
      console.log(error)
      return { val: false, erro: `Internal Server Error: ${error}` };
    }
  }
}
