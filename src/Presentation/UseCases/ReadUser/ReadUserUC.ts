
import { User } from "../../../Service/Model/User";
import { UsersRepository } from "../../../Service/Repositories/UsersRepository";
import { IReadUserRequestDTO } from "./ReadUserDTO";
export class ReadUserUC {
    constructor(private usersRepository: UsersRepository) { }
    async execute(data: IReadUserRequestDTO): Promise<{valido: boolean, value?:  number, erro?: string, data?: User }> {
        try {
            const wantedUser = await this.usersRepository.findByEmail(data.email)
        if (wantedUser.valido === false) {
            throw new Error(wantedUser.erro)
        } else if( wantedUser.valido === true){
                console.log('Usuário Logado com sucesso') 
                
            }
            throw new Error('Senha Incorreta')
        }
        catch (error) {
                return { valido: false, value: 500, erro: 'Internal Server Error'}
            
        }
        
    }
