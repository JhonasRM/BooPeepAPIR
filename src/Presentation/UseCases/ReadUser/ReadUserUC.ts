import { User } from "../../../Service/Model/User";
import { UsersRepository } from "../../../Service/Repositories/UsersRepository";
import { IReadUserRequestDTO } from "./ReadUserDTO";
export class ReadUserUC {
  constructor(private usersRepository: UsersRepository) {}
  async execute(
    data: IReadUserRequestDTO
  ): Promise<{ valido: boolean; value?: number; erro?: string; data?: User }> {
    try {
      const wantedUser = await this.usersRepository.findByEmail(data.email);
      if (wantedUser.valido === false) {
        return { valido: false, value: 404, erro: "Not Found" };
      }
      console.log("Usuario encontrado");
      const user = wantedUser.value;
      if (data.password !== user?.password) {
        return { valido: false, value: 401, erro: "Unauthorized" };
      }
      return { valido: true, value: 201, data: user as User };
    } catch (error) {
      return { valido: false, value: 500, erro: "Internal Server Error" };
    }
  }
}
