
import { User } from "../../../../Service/Entities/User";
import { IReturnAdapter } from "../../../../utils/Interfaces/IReturnAdapter";
import { UserOnAuth } from "../../../../Service/Model/UserOnAuth";
import { UserOnFirestore } from "../../../../Service/Model/UserOnFireStore";
import { UserAuthRepository } from "../../../../Service/Repositories/UserAuthRepository";
import { UserFireStoreRepository } from "../../../../Service/Repositories/UserFireStoreRepository";
import { IUpdateUserRequestDTO } from "./UpdateUserDTO";


export class UpdateUserUC {
    constructor(private userAuthRepository: UserAuthRepository, private userFireStoreRepository: UserFireStoreRepository) { }

    async execute(data: IUpdateUserRequestDTO): Promise<IReturnAdapter> {
        try {
            console.log(data)
            const userToUpdate = await this.userAuthRepository.getUser(data.email);
            if (userToUpdate.val === false) {
                throw new Error(userToUpdate.erro)
              }
            const user = userToUpdate.data as UserOnAuth
            const userDataToUpdate = await this.userFireStoreRepository.getUser(user.uid as string)
            if (userDataToUpdate.val === false) {
                throw new Error(userDataToUpdate.erro)
              }
            const userData = userDataToUpdate.data as UserOnFirestore
            if(data.fieldToUpdate in user || data.fieldToUpdate in userData){

                    const updatedUserAuth =  await this.userAuthRepository.update(user.uid as string, data.fieldToUpdate, data.newValue, data.token)
                    if(updatedUserAuth.val === false){
                        throw new Error(updatedUserAuth.erro)
                    }
                    const updatedUserData = await this.userFireStoreRepository.update(userData.uid as unknown as string, data.fieldToUpdate, data.newValue)
                    if(updatedUserData.val === false){
                       throw new Error(updatedUserData.erro)
                      
                    }
                    const updatedUser = new User(updatedUserAuth.data as UserOnAuth, updatedUserData.data as UserOnFirestore)
                        return { val: true, data: 200 };
                    }
                    throw new Error('O campo mencionado para ser atualizado não existe')
            }catch(error){
        console.log(error)
        if(error instanceof Error){
            return { val: false, erro: error.message}
        }
        return { val: false, erro: `Erro interno do servidor: ${error}` };
    }
}
}