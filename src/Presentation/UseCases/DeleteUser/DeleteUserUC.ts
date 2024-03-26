import { IUsersRepository } from "../../../Service/Repositories/IUser";
import { UsersRepository } from "../../../Service/Repositories/UsersRepository";
import { IUserRequestDTO } from "./DeleteUserDTO";

export class DeleteUserUC {
    constructor(private usersRepository: IUsersRepository) { }
    async delete(data: IUserRequestDTO) {
        const userToDelete = await this.usersRepository.findByEmail(data.email);

        if (userToDelete !== null ) {
            throw new Error('User not found');
        }

        await this.usersRepository.delete(userToDelete);
    }
}
