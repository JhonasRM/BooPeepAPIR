import { User } from "../../../Service/Model/User";
import { UserOnAuth } from "../../../Service/Model/UserOnAuth";
import { UsersAuthRepository } from "../../../Service/Repositories/UsersAuthRepository";
import { UsersFireStoreRepository } from "../../../Service/Repositories/UsersFireStoreRepository";
import { IDeleteUserRequestDTO } from "./DeleteUserDTO";

export class DeleteUserUC {
    constructor(private usersAuthRepository: UsersAuthRepository,private usersFireStoreRepository: UsersFireStoreRepository) { }
    async delete(data: IDeleteUserRequestDTO): Promise<{ valido: boolean; value?: number; erro?: string; data?: string }> {
        try {
            const userToDelete = await this.usersAuthRepository.findByEmail(data.email);
            if(userToDelete.valido === false){
            return { valido: false, value: 404, erro: "Not Found" };  
            }
            const deletedUserOnAuth = await this.usersAuthRepository.delete(userToDelete.value as User);
            if(deletedUserOnAuth.valido === false){
                return { valido: false, value: 400, erro: "Bad Request" };
            }
            const deleteUserData = userToDelete.value
            const deletedUserOnData = await this.usersFireStoreRepository.delete(deleteUserData as UserOnAuth)
            if(deletedUserOnData.valido === false){
                throw new Error()
            }
            const deletedUser = deletedUserOnAuth.value
            return { valido: true, value: 200, data: deletedUser};   
        } catch (error) {
            return { valido: false, value: 500, erro: "Internal Server Error" };
        }
        
    }
}
