
import { User } from "../../../Service/Model/User";
import { UsersRepository } from "../../../Service/Repositories/UsersRepository";
import { IReadUserRequestDTO } from "./ReadAllUserDTO";
export class ReadUserUC {
    constructor(private usersRepository: UsersRepository) { }
    async execute() {
        const Users: User[] | null = await this.usersRepository.getAllUsers()
        if (Users === null) {
            throw new Error('Erro ao buscar os usuários')
        } 
        return Users
    }
}