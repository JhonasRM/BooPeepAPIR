import { User } from "../../../../Service/Model/User";
import { UserOnAuth } from "../../../../Service/Model/UserOnAuth";
import { UserOnFirestore } from "../../../../Service/Model/UserOnFireStore";
import { UsersAuthRepository } from "../../../../Service/Repositories/UsersAuthRepository";
import { UsersFireStoreRepository } from "../../../../Service/Repositories/UsersFireStoreRepository";

export class ReadAllUsersUC {
    constructor(private usersAuthRepository: UsersAuthRepository, private usersFireStoreRepository: UsersFireStoreRepository) { }
    async execute(): Promise<{ valido: boolean; value?: number; erro?: string; data?: User[] }>  {
        try {
            const wantedUsers = await this.usersAuthRepository.getAllUsers()
            const wantedUsersData = await this.usersFireStoreRepository.getAllUsers()
            if (wantedUsers.valido === false || wantedUsersData.valido === false) {
              return { valido: false, value: 404, erro: "Not Found" };
            }
            const ArrayUsers = wantedUsers.value as UserOnAuth[]
            const ArrayUsersData = wantedUsersData.value as UserOnFirestore[]
            const users: User[] = []
            ArrayUsers.forEach(userAuth => {
              ArrayUsersData.forEach(userFireStore => {
                const user: User = new User(userAuth, userFireStore)
                users.push(user)
              });
            });
            if(users[0] === undefined){
              return { valido: false, value: 400, erro:"Bad Request"}
            }
            return { valido: true, value: 200, data: users as User[] };
          } catch (error) {
            return { valido: false, value: 500, erro: "Internal Server Error" };
          }
    }
}