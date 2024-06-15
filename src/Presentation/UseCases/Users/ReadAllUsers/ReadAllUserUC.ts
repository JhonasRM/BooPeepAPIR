import { User } from "../../../../Service/Entities/User";
import { IReturnAdapter } from "../../../../utils/Interfaces/IReturnAdapter";
import { UserOnAuth } from "../../../../Service/Model/UserOnAuth";
import { UserOnFirestore } from "../../../../Service/Model/UserOnFireStore";
import { UserAuthRepository } from "../../../../Service/Repositories/UserAuthRepository";
import { UserFireStoreRepository } from "../../../../Service/Repositories/UserFireStoreRepository";

export class ReadAllUsersUC {
    constructor(private userAuthRepository: UserAuthRepository, private userFireStoreRepository: UserFireStoreRepository) { }
    async execute(): Promise<IReturnAdapter>  {
        try {
            const wantedUsers = await this.userAuthRepository.getUsers()
            if (wantedUsers.val === false) {
              throw new Error(wantedUsers.erro)
            }
            console.log('Auth encontrado')
            const wantedUsersData = await this.userFireStoreRepository.getUsers()
            if(wantedUsersData.val === false){
              console.log(wantedUsersData.erro)
              throw new Error(wantedUsersData.erro)
            }
            const ArrayUsers = wantedUsers.data as UserOnAuth[]
            const ArrayUsersData = wantedUsersData.data as UserOnFirestore[]
            const users: User[] = []
            ArrayUsers.forEach(userAuth => {
              ArrayUsersData.forEach(userFireStore => {
                const user: User = new User(userAuth, userFireStore)
                users.push(user)
              });
            });
            if(users[0] === undefined){
              throw new Error('Nenhum usuário foi encontrado')
            }
            return { val: true, data: users as User[] };
          } catch (error) {
            if(error instanceof Error){
              return { val: false, erro: error.message}
            }
            return { val: false, erro: "Internal Server Error" };
          }
    }
}