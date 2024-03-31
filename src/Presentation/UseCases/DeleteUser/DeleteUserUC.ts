import { UsersRepository } from "../../../Service/Repositories/UsersRepository";
import { IUserRequestDTO } from "./DeleteUserDTO";

export class DeleteUserUC {
    constructor(private usersRepository: UsersRepository) { }
    async delete(data: IUserRequestDTO) {
        const userToDelete = await this.usersRepository.findByEmail(data.email);

        if (!userToDelete ) {
            throw new Error('User not found');
        }

        await this.usersRepository.delete(userToDelete);
    }
}
