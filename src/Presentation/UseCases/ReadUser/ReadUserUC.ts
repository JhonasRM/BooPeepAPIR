
import { UsersRepository } from "../../../Service/Repositories/UsersRepository";
import { IReadUserRequestDTO } from "./ReadUserDTO";
export class ReadUserUC {
    constructor(private usersRepository: UsersRepository) { }
    async execute(data: IReadUserRequestDTO) {
        const wantedUser = await this.usersRepository.VerifyWPassword(data.email, data.password)

        if (wantedUser === null) {
            throw new Error('Erro ao buscar usuário')
        } 
        return wantedUser
    }
}