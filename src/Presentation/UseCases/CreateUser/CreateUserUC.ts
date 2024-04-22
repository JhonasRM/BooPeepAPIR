import { User } from "../../../Service/Model/User";
import { UsersRepository } from "../../../Service/Repositories/UsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
export class CreateUserUC {
    constructor(private usersRepository: UsersRepository) { }
    async execute(data: ICreateUserRequestDTO) {
        console.log('entrou em CreateUserUC')
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

        if (userAlreadyExists instanceof User) {
            throw new Error('O Usuário já existe')
        }
        const NewUser: User = new User(data)
        console.log('Cadastrando novo Usuário...')
        const createUser = await this.usersRepository.save(NewUser)
        return createUser
    }
}