import { User } from "../../../Service/Model/User";
import { UserOnAuth } from "../../../Service/Model/UserOnAuth";
import { UserOnFirestore } from "../../../Service/Model/UserOnFireStore";
import { UsersAuthRepository } from "../../../Service/Repositories/UsersAuthRepository";
import { UsersFireStoreRepository } from "../../../Service/Repositories/UsersFireStoreRepository";
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
      const userAuth = wantedUser.value as UserOnAuth
      const loginUser = await this.usersFireStoreRepository.login(data.email, data.password)
      if (loginUser.valido === false) {
        console.log(loginUser.erro)
        return { valido: false, value: 401, erro: 'Unauthorized' };
      }
      const userData = loginUser.value as UserOnFirestore
      const FoundUser = new User(userAuth, userData)
      return { valido: true, value: 200, data: FoundUser};
    } catch (error) {
      console.log(error)
      return { valido: false, value: 500, erro: "Internal Server Error" };
    }
  }
}
