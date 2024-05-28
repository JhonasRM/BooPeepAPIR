import { Firestore } from "firebase-admin/firestore";
import { IReturnAdapter } from "./IReturnAdapter";
import { Post } from "../../Service/Model/Post";

export interface IPostRepository{
    db: Firestore
    collectionPath: string

    findByID(id: string): Promise<IReturnAdapter>
    getAllPosts(): Promise<IReturnAdapter>
    save(post: Post): Promise<IReturnAdapter>
    updatePostField(postId: string, fieldToUpdate: string, newValue: string): Promise<IReturnAdapter>
    deletePost(postId: string): Promise<IReturnAdapter>
}