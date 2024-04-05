import { UsersRepository } from "../../../Service/Repositories/UsersRepository";
import { IDeleteUserRequestDTO } from "./DeleteUserDTO";

export class DeleteUserUC {
    constructor(private usersRepository: UsersRepository) { }
    async delete(data: IDeleteUserRequestDTO) {
        const userToDelete = await this.usersRepository.findByEmail(data.email);

        if (!userToDelete ) {
            throw new Error('User not found');
        }

        await this.usersRepository.delete(userToDelete);
    }
}