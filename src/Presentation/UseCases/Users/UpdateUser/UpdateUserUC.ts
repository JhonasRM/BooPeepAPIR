
import { User } from "../../../../Service/Model/User";
import { UserOnAuth } from "../../../../Service/Model/UserOnAuth";
import { UserOnFirestore } from "../../../../Service/Model/UserOnFireStore";
import { UsersAuthRepository } from "../../../../Service/Repositories/UsersAuthRepository";
import { UsersFireStoreRepository } from "../../../../Service/Repositories/UsersFireStoreRepository";
import { IUpdateUserRequestDTO } from "./UpdateUserDTO";


export class UpdateUserUC {
    constructor(private usersAuthRepository: UsersAuthRepository, private usersFireStoreRepository: UsersFireStoreRepository) { }

    async execute(data: IUpdateUserRequestDTO): Promise<{ valido: boolean; value?: number; erro?: string }> {
        try {
            console.log(data)
            const userToUpdate = await this.usersAuthRepository.findByEmail(data.email);
            if (userToUpdate.valido === false) {
                return { valido: false, value: 404, erro: "Not Found" };
              }
            const user = userToUpdate.value as UserOnAuth
            const userDataToUpdate = await this.usersFireStoreRepository.findByUID(user.uid as string)
            if (userDataToUpdate.valido === false) {
                return { valido: false, value: 404, erro: "Not Found" };
              }
            const userData = userDataToUpdate.value as UserOnFirestore
            if(data.fieldToUpdate in user || data.fieldToUpdate in userData){

                    const updatedUserAuth =  await this.usersAuthRepository.update(user.uid as string, data.fieldToUpdate, data.newValue, data.token)
                    if(updatedUserAuth.valido === false){
                        if(updatedUserAuth.erro === 'Unauthorized'){
                            return { valido: false,value:401, erro: 'Unauthorized'}
                        }
                        console.log(updatedUserAuth.erro)
                        return { valido: false, value: 400, erro: "Bad Request" };
                    }
                    const updatedUserData = await this.usersFireStoreRepository.update(userData.uid as unknown as string, data.fieldToUpdate, data.newValue)
                    if(updatedUserData.valido === false){
                        console.log(updatedUserData.erro)
                        return { valido: false, value: 400, erro: 'Bad Request'}
                    }
                    const updatedUser = new User(updatedUserAuth.value as UserOnAuth, updatedUserData.value as UserOnFirestore)
                        return { valido: true, value: 200 };
                    }
                    return { valido: false, value: 400, erro: "O campo informado não existe no banco"}
            }catch(error){
        console.log(error)
        return { valido: false, value: 500, erro: "Internal Server Error" };
    }
}
}