import { User } from "../../../../Service/Entities/User";
import { UserOnAuth } from "../../../../Service/Model/UserOnAuth";
import { UserOnFirestore } from "../../../../Service/Model/UserOnFireStore";
import { UsersAuthRepository } from "../../../../Service/Repositories/UsersAuthRepository";
import { UsersFireStoreRepository } from "../../../../Service/Repositories/UsersFireStoreRepository";
import { IReadUserRequestDTO } from "./ReadUserDTO";
export class ReadUserUC {
  constructor(private usersAuthRepository: UsersAuthRepository, private usersFireStoreRepository: UsersFireStoreRepository) {}
  async execute(
    data: IReadUserRequestDTO
  ): Promise<{ valido: boolean; value?: number; erro?: string; data?: User }> {
    try {
      const wantedUser = await this.usersAuthRepository.findByEmail(data.email);
      if (wantedUser.valido === false) {
        return { valido: false, value: 404, erro: "Not Found" };
      }
      const foundUserAuth = wantedUser.value as unknown as UserOnAuth
      const userAuth = new UserOnAuth(
        foundUserAuth.displayName,
        foundUserAuth.email,
        '*',
        foundUserAuth.emailVerified,
        foundUserAuth.disabled,
        foundUserAuth.uid

      )
      const wantedUserData = await this.usersFireStoreRepository.findByUID(userAuth.uid as string)
      if (wantedUserData.valido === false) {
        return { valido: false, value: 404, erro: "Not Found" };
      }
      const userData = wantedUserData.value as UserOnFirestore      
      const user: User = new User(userAuth, {
        posts: userData.posts,
        age: userData.age,
        uid: userData.uid
      })
      console.log(user)
      return { valido: true, value: 200, data: user as User };
    } catch (error) {
      return { valido: false, value: 500, erro: "Internal Server Error" };
    }
  }
}