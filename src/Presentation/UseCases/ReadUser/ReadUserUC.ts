
import { UsersRepository } from "../../../Service/Repositories/UsersRepository";
import { IReadUserRequestDTO } from "./ReadUserDTO";
export class ReadUserUC {
    constructor(private usersRepository: UsersRepository) { }
    async execute(data: IReadUserRequestDTO) {
        const wantedUser = await this.usersRepository.findByEmail(data.email)
        if (wantedUser === null) {
            throw new Error('Este usuário não existe')
        } else {
            console.log('Usuário Encontrado')
            if( wantedUser.password === data.password){
                console.log('Usuário Logado com sucesso') 
                return wantedUser
            }
            throw new Error('Senha Incorreta')
        }
    }
}