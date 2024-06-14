
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
            const userToUpdate = await this.userAuthRepository.getUser(data.email);
            if (userToUpdate.val === false) {
                throw new Error('Usuário não encontrado.')
            }
            const user = userToUpdate.data as UserOnAuth
            const userDataToUpdate = await this.userFireStoreRepository.getUser(user.uid as string)
            if (userDataToUpdate.val === false) {
                throw new Error('Usuário não encontrado.')
            }
            const userData = userDataToUpdate.data as UserOnFirestore
            if (data.fieldToUpdate in user) {

                const updatedUserAuth = await this.userAuthRepository.update(user.uid as string, data.fieldToUpdate, data.newValue)
                if (updatedUserAuth.val === false) {
                    throw new Error(updatedUserAuth.erro)
                }
            } else if (data.fieldToUpdate in userData) {
                const updatedUserData = await this.userFireStoreRepository.update(userData.uid as unknown as string, data.fieldToUpdate, data.newValue)
                if (updatedUserData.val === false) {
                    throw new Error(updatedUserData.erro)
                }
                return { val: true, data: 'Usuário alterado com sucesso.' };
            } else {
            throw new Error('O campo mencionado para ser atualizado não existe')
        }
        throw new Error('Erro de lógica!')
        } catch (error) {
            console.log(error)
            if (error instanceof Error) {
                return { val: false, erro: error.message }
            }
            return { val: false, erro: `Erro interno do servidor: ${error}` };
        }
    }
}