
import { User } from "../../../../Service/Entities/User";
import { UserOnAuth } from "../../../../Service/Model/UserOnAuth";
import { UserOnFirestore } from "../../../../Service/Model/UserOnFireStore";
import { UsersAuthRepository } from "../../../../Service/Repositories/UsersAuthRepository";
import { UsersFireStoreRepository } from "../../../../Service/Repositories/UsersFireStoreRepository";
import { ILoginUserRequestDTO } from "./LoginUserDTO";
export class LoginUserUC {
  constructor(private usersAuthRepository: UsersAuthRepository, private usersFireStoreRepository: UsersFireStoreRepository) {}
  async execute(
    data: ILoginUserRequestDTO
  ): Promise<{ valido: boolean; value?: number; erro?: string; data?: User }> {
    try {
      const wantedUser = await this.usersAuthRepository.findByEmail(data.email);
      if (wantedUser.valido === false) {
        return { valido: false, value: 404, erro: "Not Found" };
      }
      const userAuth = wantedUser.value as UserOnAuth
      const loginUserData = await this.usersFireStoreRepository.findByUID(userAuth.uid as string)
      if(loginUserData.valido === false){
        throw new Error()
      }
      const loginUserAuth = await this.usersAuthRepository.loginOnAuth(data.email, data.password)
      if ( loginUserAuth.valido === false) {
        console.log(loginUserAuth.erro)
        return { valido: false, value: 401, erro: 'Unauthorized' };
      }
      const userOnAuth = loginUserAuth.value as UserOnAuth
      const userOnFirestore = loginUserData.value as UserOnFirestore
      const user: User = new User(userOnAuth, userOnFirestore)
      return { valido: true, value: 200, data: user};
    } catch (error) {
      console.log(error)
      return { valido: false, value: 500, erro: `Internal Server Error: ${error}` };
    }
  }
}
