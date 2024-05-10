import { User } from "../../../Service/Model/User";
import { UsersAuthRepository } from "../../../Service/Repositories/UsersAuthRepository";
import { IReadUserRequestDTO } from "./ReadUserDTO";
export class ReadUserUC {
  constructor(private usersRepository: UsersAuthRepository) {}
  async execute(authLoginApp: any,
    data: IReadUserRequestDTO
  ): Promise<{ valido: boolean; value?: number; erro?: string; data?: User }> {
    try {
      const wantedUser = await this.usersRepository.findByEmail(data.email);
      if (wantedUser.valido === false) {
        return { valido: false, value: 404, erro: "Not Found" };
      }
      console.log("Usuario encontrado");
      const loginUser = await this.usersRepository.login(data.email, data.password)
      if (loginUser.valido === false) {
        console.log(loginUser.erro)
        return { valido: false, value: 401, erro: 'Unauthorized' };
      }
      const user = wantedUser.value
      console.log(user)
      return { valido: true, value: 200, data: user as User };
    } catch (error) {
      console.log(error)
      return { valido: false, value: 500, erro: "Internal Server Error" };
    }
  }
}
