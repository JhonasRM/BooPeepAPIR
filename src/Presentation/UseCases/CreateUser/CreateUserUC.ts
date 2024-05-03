import { User } from "../../../Service/Model/User";
import { UsersRepository } from "../../../Service/Repositories/UsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
export class CreateUserUC {
    constructor(private usersRepository: UsersRepository) { }
    async execute(data: ICreateUserRequestDTO): Promise<{valido: boolean, value?:  number, erro?: string, data?: User }> {
        try {
            const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

        if (userAlreadyExists.valido === false) {
            return { valido: false, value: 401, erro: 'Unauthorized'}
        } 
        const NewUser: User = new User(data)
        console.log('Cadastrando novo Usuário...')
        const createdUser = await this.usersRepository.save(NewUser)
        if(createdUser.valido === false){
            return { valido: false, value: 400, erro: 'Bad Request'}
        } 
        return { valido: true, value: 201, data: createdUser.value as User }
        } catch (error) {
            return { valido: false, value: 500, erro: 'Internal Server Error'}
        }
       
    }
}