
import { UserOnAuth } from "../../../Service/Model/UserOnAuth";
import { UsersAuthRepository } from "../../../Service/Repositories/UsersAuthRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
export class CreateUserUC {
    constructor(private usersRepository: UsersAuthRepository) { }
    async execute(data: ICreateUserRequestDTO): Promise<{valido: boolean, value?:  number, erro?: string, data?: UserOnAuth }> {
        try {
            const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

        if (userAlreadyExists.valido === false) {
            return { valido: false, value: 401, erro: 'Unauthorized'}
        } 
        const NewUser: UserOnAuth = new UserOnAuth(data)
        console.log('Cadastrando novo Usuário...')
        const createdUser = await this.usersRepository.saveOnAuth(NewUser)
        if(createdUser.valido === false){
            return { valido: false, value: 400, erro: 'Bad Request'}
        } 
        return { valido: true, value: 201, data: createdUser.value as UserOnAuth }
        } catch (error) {
            return { valido: false, value: 500, erro: 'Internal Server Error'}
        }
       
    }
}