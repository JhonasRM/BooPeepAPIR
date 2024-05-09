
import { User } from "../../../Service/Model/User";
import { UsersRepository } from "../../../Service/Repositories/UsersRepository";
export class ReadAllUsersUC {
    constructor(private usersRepository: UsersRepository) { }
    async execute(): Promise<{ valido: boolean; value?: number; erro?: string; data?: User[] }>  {
        try {
            const wantedUsers = await this.usersRepository.getAllUsers()
            if (wantedUsers.valido === false) {
              return { valido: false, value: 404, erro: "Not Found" };
            }
            console.log("Usuario encontrado");
            const user = wantedUsers.value;
            return { valido: true, value: 200, data: user as User[] };
          } catch (error) {
            return { valido: false, value: 500, erro: "Internal Server Error" };
          }
    }
}