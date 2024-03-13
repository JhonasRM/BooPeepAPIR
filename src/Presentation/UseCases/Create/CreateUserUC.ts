import { User } from "../../../Service/Model/User";
import { IUsersRepository } from "../../../Service/Repositories/IUser";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
export class CreateUserUC {
    constructor(private usersRepository: IUsersRepository) { }
    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

        if (userAlreadyExists) {
            throw new Error('User already exists')
        }
       
        const user: User = new User(data)
        await this.usersRepository.save(user)
    }
}