import { User } from "../../../../Service/Entities/User";
import { IReturnAdapter } from "../../../../utils/Interfaces/IReturnAdapter";
import { UserOnAuth } from "../../../../Service/Model/UserOnAuth";
import { UserOnFirestore } from "../../../../Service/Model/UserOnFireStore";
import { UserAuthRepository } from "../../../../Service/Repositories/UserAuthRepository";
import { UserFireStoreRepository } from "../../../../Service/Repositories/UserFireStoreRepository";
import { IReadUserRequestDTO } from "./ReadUserDTO";
export class ReadUserUC {
  constructor(private userAuthRepository: UserAuthRepository, private userFireStoreRepository: UserFireStoreRepository) {}
  async execute(
    data: IReadUserRequestDTO
  ): Promise<IReturnAdapter> {
    try {
      const wantedUser = await this.userAuthRepository.getUser(data.email);
      if (wantedUser.val === false) {
        throw new Error('Usuário não encontrado.')
      }
      const foundUserAuth = wantedUser.data as unknown as UserOnAuth
      const userAuth = new UserOnAuth(
        foundUserAuth.displayName,
        foundUserAuth.email,
        '*',
        foundUserAuth.emailVerified,
        foundUserAuth.disabled,
        foundUserAuth.uid
      )
      const wantedUserData = await this.userFireStoreRepository.getUser(userAuth.uid as string)
      if (wantedUserData.val === false) {
        return { val: false, erro: 'Os dados do usuário não foram encontrados' };
      }
      const wantedData = wantedUserData.data as UserOnFirestore   
      const userData = new UserOnFirestore(wantedData.uid, wantedData.postsID, wantedData.chatID, wantedData.course, wantedData.shift, wantedData.description)
      const user: User = new User(userAuth,userData)
      return { val: true, data: user };
    } catch (error) {
      if(error instanceof Error){
        return { val: false, erro: error.message}
      }
      return { val: false, erro: `Internal Server Error: ${error}` };
    }
  }
}