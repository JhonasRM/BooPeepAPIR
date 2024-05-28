
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
                return { val: false, erro: "Not Found" };
              }
            const user = userToUpdate.data as UserOnAuth
            const userDataToUpdate = await this.userFireStoreRepository.getUser(user.uid as string)
            if (userDataToUpdate.val === false) {
                return { val: false, erro: "Not Found" };
              }
            const userData = userDataToUpdate.data as UserOnFirestore
            if(data.fieldToUpdate in user || data.fieldToUpdate in userData){

                    const updatedUserAuth =  await this.userAuthRepository.update(user.uid as string, data.fieldToUpdate, data.newValue, data.token)
                    if(updatedUserAuth.val === false){
                        if(updatedUserAuth.erro === 'Unauthorized'){
                            return { val: false, erro: 'Unauthorized'}
                        }
                        console.log(updatedUserAuth.erro)
                        return { val: false, erro: "Bad Request" };
                    }
                    const updatedUserData = await this.userFireStoreRepository.update(userData.uid as unknown as string, data.fieldToUpdate, data.newValue)
                    if(updatedUserData.val === false){
                        console.log(updatedUserData.erro)
                        return { val: false, erro: 'Bad Request'}
                    }
                    const updatedUser = new User(updatedUserAuth.data as UserOnAuth, updatedUserData.data as UserOnFirestore)
                        return { val: true, data: 200 };
                    }
                    return { val: false, erro: "O campo informado não existe no banco"}
            }catch(error){
        console.log(error)
        return { val: false, erro: "Internal Server Error" };
    }
}
}