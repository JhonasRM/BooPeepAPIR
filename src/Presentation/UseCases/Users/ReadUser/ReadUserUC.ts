import { User } from "../../../../Service/Model/User";
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
      const wantedUserData = await this.usersFireStoreRepository.findByEmail(data.email)
      if (wantedUser.valido === false) {
        return { valido: false, value: 404, erro: "Not Found" };
      }
      console.log("Usuario encontrado");
      const userAuth = wantedUser.value as UserOnAuth
      const userData = wantedUserData.value as UserOnFirestore
      const user: User = new User(userAuth, userData)
      console.log(user)
      
      return { valido: true, value: 200, data: user as User };
    } catch (error) {
      return { valido: false, value: 500, erro: "Internal Server Error" };
    }
  }
}