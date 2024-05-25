
import { User } from "../../../../Service/Entities/User";
import { IReturnAdapter } from "../../../../Service/Interfaces/IReturnAdapter";
import { UserOnAuth } from "../../../../Service/Model/UserOnAuth";
import { UserOnFirestore } from "../../../../Service/Model/UserOnFireStore";
import { UserAuthRepository } from "../../../../Service/Repositories/UsersAuthRepository";
import { UserFireStoreRepository } from "../../../../Service/Repositories/UsersFireStoreRepository";
import { CreateUserRequestDTO } from "./CreateUserDTO";
export class CreateUserUC {
    constructor(private usersAuthRepository: UserAuthRepository, private usersFireStoreRepository: UserFireStoreRepository) { }
    async execute(data: CreateUserRequestDTO): Promise<IReturnAdapter> {
        try {
            const userAlreadyExists = await this.usersAuthRepository.getUser(data.email)
            if (userAlreadyExists.val === true) {
                return { val: false, erro: 'Unauthorized'}
            }
            const NewUserData = data.destructuring().userOnData
            const createUserData = await this.usersFireStoreRepository.create(NewUserData)
            if(createUserData.val === false){
                return { val: false,  erro: 'Bad Request'}
            }
            const userData = new UserOnFirestore({}, createUserData.data?.uid, createUserData.data?.posts, createUserData.data?.age)
            const NewUserAuth = data.destructuring().userOnAuth
            NewUserAuth.conectData(userData.uid as string)
        const createdUserAuth = await this.usersAuthRepository.create(NewUserAuth)
        if(createdUserAuth.val === false){
            return { val: false, erro: 'Bad Request'}
        }
        const userAuth = new UserOnAuth(
            createdUserAuth.data?.displayName as string,
            createdUserAuth.data?.email as string,
            createdUserAuth.data?.password as string,
        )
        const user: User = new User(userAuth, userData)
        return { val: true, data: user as User}   
        } catch (error) {
            return { val: false, erro: 'Internal Server Error'}
        }
       
    }
}