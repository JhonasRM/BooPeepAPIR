
import { UserAuthRepository } from "../../../../Service/Repositories/UserAuthRepository";
import { UserFireStoreRepository } from "../../../../Service/Repositories/UserFireStoreRepository";
import { ReadAllUsersUC } from "./ReadAllUserUC";

describe('UserRepository function getAllUsers to return a Array List of Users from Firebase', () => {
    let userA: UserAuthRepository;
    let userF: UserFireStoreRepository;
    let readalluseruc: ReadAllUsersUC;

    beforeAll(() => {
        userA = new UserAuthRepository();
        userF = new UserFireStoreRepository();
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
