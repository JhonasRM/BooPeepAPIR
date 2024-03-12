import { User } from "../Model/User";

export interface IUsersRepository{
    findByEmail(email: string): Promise<User>;
    save(user: User): Promise<void>
}