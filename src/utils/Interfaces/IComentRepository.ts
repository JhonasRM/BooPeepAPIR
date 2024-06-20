import { Firestore } from "firebase-admin/firestore";
import { IReturnAdapter } from "./IReturnAdapter";
import { Post } from "../../Service/Model/Post";
import { Coment } from "../../Service/Model/Coment";

export interface IComentRepository{
    db: Firestore
    collectionPath: string

    getComents(postID: string): Promise<IReturnAdapter>
    createComent(coment: Coment): Promise<IReturnAdapter>
    updateComent(postId: string,comentID:string, newValue: string): Promise<IReturnAdapter>
    deleteComent(postId: string, comentID:string): Promise<IReturnAdapter>
}