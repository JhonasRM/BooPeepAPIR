
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
                throw new Error('Usuário não encontrado')
            }
            const deletedUserOnAuth = await this.usersAuthRepository.delete(userToDelete.data?.uid as string);
            if(deletedUserOnAuth.val === false){
                throw new Error('Erro ao deletar o usuáio')
            }
            const deleteUserData = userToDelete.data
            const deletedUserOnData = await this.usersFireStoreRepository.delete(deleteUserData?.uid as string)
            if(deletedUserOnData.val === false){
                throw new Error('Erro ao deletar os dados  do usuário')
            }
            const deletedUser = deletedUserOnAuth.data
            return { val: true, data: deletedUser};   
        } catch (error) {
            if(error instanceof Error){
                return { val: false, erro: error.message}
            }
            return { val: false, erro: "Internal Server Error" };
        }
        
    }
}
