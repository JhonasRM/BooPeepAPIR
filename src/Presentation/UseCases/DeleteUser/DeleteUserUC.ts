import { User } from "../../../Service/Model/User";
import { UsersAuthRepository } from "../../../Service/Repositories/UsersAuthRepository";
import { IDeleteUserRequestDTO } from "./DeleteUserDTO";

export class DeleteUserUC {
    constructor(private usersRepository: UsersAuthRepository) { }
    async delete(data: IDeleteUserRequestDTO): Promise<{ valido: boolean; value?: number; erro?: string; data?: string }> {
        try {
            const userToDelete = await this.usersRepository.findByEmail(data.email);
            if(userToDelete.valido === false){
            return { valido: false, value: 404, erro: "Not Found" };  
            }
            const deletedUser = await this.usersRepository.delete(userToDelete.value as User);
            if(deletedUser.valido === false){
                return { valido: false, value: 400, erro: "Bad Request" };
            }
            return { valido: true, value: 200, data: deletedUser.value};   
        } catch (error) {
            return { valido: false, value: 500, erro: "Internal Server Error" };
        }
        
    }
}
