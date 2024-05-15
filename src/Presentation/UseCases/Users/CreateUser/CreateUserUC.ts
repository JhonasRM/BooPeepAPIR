
import { User } from "../../../../Service/Model/User";
import { UserOnAuth } from "../../../../Service/Model/UserOnAuth";
import { UserOnFirestore } from "../../../../Service/Model/UserOnFireStore";
import { UsersAuthRepository } from "../../../../Service/Repositories/UsersAuthRepository";
import { UsersFireStoreRepository } from "../../../../Service/Repositories/UsersFireStoreRepository";
import { CreateUserRequestDTO } from "./CreateUserDTO";
export class CreateUserUC {
    constructor(private usersAuthRepository: UsersAuthRepository, private usersFireStoreRepository: UsersFireStoreRepository) { }
    async execute(data: CreateUserRequestDTO): Promise<{valido: boolean, value?:  number, erro?: string, data?: User }> {
        try {
        const userDataAlreadyExists = await this.usersFireStoreRepository.findByEmail(data.email)
        if (userDataAlreadyExists.valido === true) {
            return { valido: false, value: 401, erro: 'Unauthorized'}
        } else if(userDataAlreadyExists.valido === false){
            const NewUserData = data.destructuring().userOnData
            const createUserData = await this.usersFireStoreRepository.saveOnFireStore(NewUserData)
        if(createUserData.valido === false){
            return { valido: false, value: 400, erro: 'Bad Request'}
        }
        const userOnData = createUserData.value as UserOnFirestore
        const userAlreadyExists = await this.usersAuthRepository.findByEmail(data.email)
        if (userAlreadyExists.valido === true) {
            return { valido: false, value: 401, erro: 'Unauthorized'}
        } 
        const NewUserAuth = data.destructuring().userOnAuth
        NewUserAuth.conectData(userOnData.uid as string)
        const createdUserAuth = await this.usersAuthRepository.saveOnAuth(NewUserAuth)
        if(createdUserAuth.valido === false){
            return { valido: false, value: 400, erro: 'Bad Request'}
        } 
        const userOnAuth = createdUserAuth.value as UserOnAuth
        const user: User = new User(userOnAuth, userOnData)
        return { valido: true, value: 201, data: user}   
     }
     throw new Error()
               
        } catch (error) {
            return { valido: false, value: 500, erro: 'Internal Server Error'}
        }
       
    }
}