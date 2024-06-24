import { Firestore } from "firebase-admin/firestore";
import { IReturnAdapter } from "./IReturnAdapter";
import { UserOnFirestore } from "../../Service/Model/UserOnFireStore";
import { UserOnAuth } from "../../Service/Model/UserOnAuth";
import { Auth } from "firebase-admin/lib/auth/auth";
export interface IUserRepository{
    db: Firestore
    auth: Auth
    collectionPath: string

    getUser(key: string): Promise<IReturnAdapter>
    getUserByUID?(key: string): Promise<IReturnAdapter>
    getUsers(): Promise<IReturnAdapter>
    create(user: UserOnFirestore | UserOnAuth): Promise<IReturnAdapter>
    update(postId: string, fieldToUpdate: string, newValue: string): Promise<IReturnAdapter>
    delete(postId: string): Promise<IReturnAdapter>
}