import { UsersRepository } from "../../../Service/Repositories/UsersRepository";
import { IUserRequestDTO } from "./UpdateUserDTO";


export class UpdateUserUC {
    constructor(private usersRepository: UsersRepository) { }

    async update(data: IUserRequestDTO): Promise<void> {
        const userToUpdate = await this.usersRepository.findByEmail(data.email);

        if (!userToUpdate) {
            throw new Error('User not found');
        }

        // Atualiza os campos do usuário com os novos valores fornecidos no DTO
        userToUpdate.name = data.name;
        userToUpdate.password = data.password;

        // Persiste as alterações no repositório
        await this.usersRepository.update(userToUpdate);
    }
}