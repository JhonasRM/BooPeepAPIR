import { db } from "../../../Data Access/DAO/conn";
import { User } from "../../../Service/Model/User";
import { IUsersRepository } from "../../../Service/Repositories/IUser";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
export class CreateUserUC {
    constructor(private usersRepository: IUsersRepository) { }
    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

        if (userAlreadyExists) {
            throw new Error('User already exists')
        }
        try {
            const user: User = new User(data)
            const collectionPath: string = 'users'
            const docRef = await db.collection(collectionPath).add(user);

            return user 
            console.log('Usuário cadastrado com sucesso')
            }
         catch (error) {
            console.log(error);
        }

        await this.usersRepository.save(user)
    }
}