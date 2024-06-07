
import { User } from "../../../../Service/Entities/User";
import { IReturnAdapter } from "../../../../utils/Interfaces/IReturnAdapter";
import { UserOnAuth } from "../../../../Service/Model/UserOnAuth";
import { UserOnFirestore } from "../../../../Service/Model/UserOnFireStore";
import { UserAuthRepository } from "../../../../Service/Repositories/UserAuthRepository";
import { UserFireStoreRepository } from "../../../../Service/Repositories/UserFireStoreRepository";
import { CreateUserRequestDTO } from "./CreateUserDTO";
export class CreateUserUC {
    constructor(private usersAuthRepository: UserAuthRepository, private usersFireStoreRepository: UserFireStoreRepository) { }
    async execute(data: CreateUserRequestDTO): Promise<IReturnAdapter> {
        try {
            const userAlreadyExists = await this.usersAuthRepository.getUser(data.email)
            if (userAlreadyExists.val === true) {
                throw new Error('Este email já está cadastrado')
            }
            const NewUserData = data.destructuring().userOnData
            const createUserData = await this.usersFireStoreRepository.create(NewUserData)
            if(createUserData.val === false){
                throw new Error('Erro ao cadastrar dados do usuário')
            }
            const NewUserAuth = data.destructuring().userOnAuth
            NewUserAuth.conectData(createUserData.data as string)
        const createdUserAuth = await this.usersAuthRepository.create(NewUserAuth)
        if(createdUserAuth.val === false){
            throw new Error('Erro ao cadastrar usuário no auth.')
        }
        return { val: true, data: 'Usuário Cadatrado com sucesso'}   
        } catch (error) {
            if(error instanceof Error){
                return { val: false, erro: error.message}
            }
            return { val: false, erro: `Internal Server Error: ${error}` }
        }
       
    }
}