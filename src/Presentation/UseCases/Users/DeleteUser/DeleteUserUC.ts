
import { IReturnAdapter } from "../../../../Service/Interfaces/IReturnAdapter";
import { UserOnAuth } from "../../../../Service/Model/UserOnAuth";
import { UserAuthRepository } from "../../../../Service/Repositories/UsersAuthRepository";
import { UserFireStoreRepository } from "../../../../Service/Repositories/UsersFireStoreRepository";
import { IDeleteUserRequestDTO } from "./DeleteUserDTO";

export class DeleteUserUC {
    constructor(private usersAuthRepository: UserAuthRepository,private usersFireStoreRepository: UserFireStoreRepository) { }
    async delete(data: IDeleteUserRequestDTO): Promise<IReturnAdapter> {
        try {
            const userToDelete = await this.usersAuthRepository.getUser(data.email);
            if(userToDelete.val === false){
            return { val: false, erro: "Not Found" };  
            }
            const deletedUserOnAuth = await this.usersAuthRepository.delete(userToDelete.data?.uid as string);
            if(deletedUserOnAuth.val === false){
                return { val: false,  erro: "Bad Request" };
            }
            const deleteUserData = userToDelete.data
            const deletedUserOnData = await this.usersFireStoreRepository.delete(deleteUserData?.uid as string)
            if(deletedUserOnData.val === false){
                throw new Error()
            }
            const deletedUser = deletedUserOnAuth.data
            return { val: true, data: deletedUser};   
        } catch (error) {
            return { val: false, erro: "Internal Server Error" };
        }
        
    }
}
