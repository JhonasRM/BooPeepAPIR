import { User } from "../../../../Service/Entities/User";
import { IReturnAdapter } from "../../../../Service/Interfaces/IReturnAdapter";
import { UserOnAuth } from "../../../../Service/Model/UserOnAuth";
import { UserOnFirestore } from "../../../../Service/Model/UserOnFireStore";
import { UserAuthRepository } from "../../../../Service/Repositories/UsersAuthRepository";
import { UserFireStoreRepository } from "../../../../Service/Repositories/UsersFireStoreRepository";

export class ReadAllUsersUC {
    constructor(private userAuthRepository: UserAuthRepository, private userFireStoreRepository: UserFireStoreRepository) { }
    async execute(): Promise<IReturnAdapter>  {
        try {
            const wantedUsers = await this.userAuthRepository.getUsers()
            const wantedUsersData = await this.userFireStoreRepository.getUsers()
            if (wantedUsers.val === false || wantedUsersData.val === false) {
              return { val: false, erro: "Not Found" };
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
              return { val: false, erro:"Bad Request"}
            }
            return { val: true, data: users as User[] };
          } catch (error) {
            return { val: false, erro: "Internal Server Error" };
          }
    }
}