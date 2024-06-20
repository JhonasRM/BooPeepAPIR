import { Firestore } from "firebase-admin/firestore";
import { IReturnAdapter } from "./IReturnAdapter";
import { Post } from "../../Service/Model/Post";

export interface IComentRepository{
    db: Firestore
    collectionPath: string

    getComents(postID: string): Promise<IReturnAdapter>
    createComent(post: Post): Promise<IReturnAdapter>
    updateComent(postId: string,comentID:string, newValue: string): Promise<IReturnAdapter>
    deleteComent(postId: string): Promise<IReturnAdapter>
}