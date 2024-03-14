import { User } from "../../../Service/Model/User";
import { UsersRepository } from "../../../Service/Repositories/UsersRepository";
import { IReadUserRequestDTO } from "./ReadUserDTO";
export class ReadUserUC {
    constructor(private usersRepository: UsersRepository) { }
    async execute(data: IReadUserRequestDTO) {
        const wantedUser = await this.usersRepository.findByEmail(data.email)

        if (wantedUser === null) {
            throw new Error('O Usuário não existe')
        } 
        return wantedUser
    }
}