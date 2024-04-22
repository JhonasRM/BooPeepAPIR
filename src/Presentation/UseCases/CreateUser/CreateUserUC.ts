import { User } from "../../../Service/Model/User";
import { UsersRepository } from "../../../Service/Repositories/UsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
export class CreateUserUC {
    constructor(private usersRepository: UsersRepository) { }
    async execute(data: ICreateUserRequestDTO): Promise<User | Error> {
        console.log('entrou em CreateUserUC')
        try {  
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email)
        if (userAlreadyExists instanceof User) {
            throw new Error('O Usuário já existe')
        }
        const NewUser: User = new User({
            name: data.name,
            email: data.email,
            password: data.password
        }
        )
        console.log('Cadastrando novo Usuário...')
        const createUser = await this.usersRepository.save(NewUser)
        if(createUser instanceof Error){
            throw new Error(createUser.message)
        }
        return createUser
        } catch (error) {
         return error as Error
        }
        
    }
}