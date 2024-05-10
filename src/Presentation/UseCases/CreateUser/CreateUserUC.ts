
import { User } from "../../../Service/Model/User";
import { UserOnAuth } from "../../../Service/Model/UserOnAuth";
import { UserOnFirestore } from "../../../Service/Model/UserOnFireStore";
import { UsersAuthRepository } from "../../../Service/Repositories/UsersAuthRepository";
import { UsersFireStoreRepository } from "../../../Service/Repositories/UsersFireStoreRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
export class CreateUserUC {
    constructor(private usersAuthRepository: UsersAuthRepository, private usersFireStoreRepository: UsersFireStoreRepository) { }
    async execute(data: ICreateUserRequestDTO): Promise<{valido: boolean, value?:  number, erro?: string, data?: User }> {
        try {
            const userAlreadyExists = await this.usersAuthRepository.findByEmail(data.email)

        if (userAlreadyExists.valido === false) {
            return { valido: false, value: 401, erro: 'Unauthorized'}
        } 
        const NewUser: UserOnAuth = new UserOnAuth(data)
        console.log('Cadastrando novo Usuário...')
        const createdUserAuth = await this.usersAuthRepository.saveOnAuth(NewUser)
        if(createdUserAuth.valido === false){
            return { valido: false, value: 400, erro: 'Bad Request'}
        } 
        const userOnAuth = createdUserAuth.value as UserOnAuth
        const createUserData = await this.usersFireStoreRepository.saveOnFireStore(userOnAuth)
        if(createUserData.valido === false){
            throw new Error()
        }
        const userOnData = createUserData.value as UserOnFirestore
        const user: User = new User(userOnAuth, userOnData)
        return { valido: true, value: 201, data: user}
        } catch (error) {
            return { valido: false, value: 500, erro: 'Internal Server Error'}
        }
       
    }
}