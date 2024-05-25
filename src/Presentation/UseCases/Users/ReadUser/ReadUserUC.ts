import { User } from "../../../../Service/Entities/User";
import { IReturnAdapter } from "../../../../Service/Interfaces/IReturnAdapter";
import { UserOnAuth } from "../../../../Service/Model/UserOnAuth";
import { UserOnFirestore } from "../../../../Service/Model/UserOnFireStore";
import { UserAuthRepository } from "../../../../Service/Repositories/UsersAuthRepository";
import { UserFireStoreRepository } from "../../../../Service/Repositories/UsersFireStoreRepository";
import { IReadUserRequestDTO } from "./ReadUserDTO";
export class ReadUserUC {
  constructor(private userAuthRepository: UserAuthRepository, private userFireStoreRepository: UserFireStoreRepository) {}
  async execute(
    data: IReadUserRequestDTO
  ): Promise<IReturnAdapter> {
    try {
      const wantedUser = await this.userAuthRepository.getUser(data.email);
      if (wantedUser.val === false) {
        return { val: false, erro: "Not Found" };
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
        return { val: false, erro: "Not Found" };
      }
      const userData = wantedUserData.data as UserOnFirestore      
      const user: User = new User(userAuth, {
        posts: userData.posts,
        age: userData.age,
        uid: userData.uid
      })
      console.log(user)
      return { val: true, data: user as User };
    } catch (error) {
      return { val: false, erro: "Internal Server Error" };
    }
  }
}