import { User } from "../../../Service/Model/User";
import { UserOnAuth } from "../../../Service/Model/UserOnAuth";
import { UserOnFirestore } from "../../../Service/Model/UserOnFireStore";
import { UsersAuthRepository } from "../../../Service/Repositories/UsersAuthRepository";
import { UsersFireStoreRepository } from "../../../Service/Repositories/UsersFireStoreRepository";
import { IUpdateUserRequestDTO } from "./UpdateUserDTO";


export class UpdateUserUC {
    constructor(private usersAuthRepository: UsersAuthRepository, private usersFireStoreRepository: UsersFireStoreRepository) { }

    async execute(data: IUpdateUserRequestDTO): Promise<{ valido: boolean; value?: number; erro?: string }> {
        try {
            const userToUpdate = await this.usersAuthRepository.findByEmail(data.email);
            if (userToUpdate.valido === false) {
              return { valido: false, value: 404, erro: "Not Found" };
            }
             const user = userToUpdate.value as UserOnAuth 
            if(data.fieldToUpdate in user){
                if(user?.uid !== undefined){
                    const updatedUserAuth =  await this.usersAuthRepository.update(user.uid, data.fieldToUpdate, data.newValue)
                    if(updatedUserAuth.valido === false){
                        console.log(updatedUserAuth.erro)
                        return { valido: false, value: 400, erro: "Bad Request" };
                    }
                    throw new Error()
            }
            const updatedUserData = await this.usersFireStoreRepository.update(user.uid, data.fieldToUpdate, data.newValue)
            if(updatedUserData.valido === false){
                console.log(updatedUserData.erro)
                return { valido: false, value: 400, erro: 'Bad Request'}
            }
                return { valido: true, value: 200 };
            }
            return { valido: false, value: 400, erro: "Bad Request" };
    } catch(error){
        return { valido: false, value: 500, erro: "Internal Server Error" };
    }
}
}