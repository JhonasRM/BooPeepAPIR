import { User } from "../../../Service/Model/User"
import { UsersAuthRepository } from "../../../Service/Repositories/UsersAuthRepository";
import { UsersFireStoreRepository } from "../../../Service/Repositories/UsersFireStoreRepository";
import { ReadAllUsersUC } from "./ReadAllUserUC";

describe('UserRepository function getAllUsers to return a Array List of Users from Firebase', () => {
    let userA: UsersAuthRepository;
    let userF: UsersFireStoreRepository;
    let readalluseruc: ReadAllUsersUC;

    beforeAll(() => {
        userA = new UsersAuthRepository();
        userF = new UsersFireStoreRepository();
        readalluseruc = new ReadAllUsersUC(userA, userF)

    });

    test('getAllUsers should return an Array of type Users', async () => {
        const readall = await readalluseruc.execute()
        const users = readall.data
        console.log(users)
        expect(users).toBeInstanceOf(Array);
        expect(users?.length).toBeGreaterThan(0);
    }, 10000);
})
