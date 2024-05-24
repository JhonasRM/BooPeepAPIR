import { randomUUID } from "crypto";
import { User } from "../Entities/User";
import { UserOnFirestore } from "./UserOnFireStore";
export class Post{
    public readonly postId!: string;

    public description: string;
    // public image : SVGAElement;
    public createdAt: number;
    public local: string;
    public status: number;
    public UserID: string;

    constructor(props: Omit<Post, 'postId' | 'createdAt' | 'UserID'>, uid: string, id?: string, createdAt?: number){
        this.description = props.description
        // this.image = props.image
        this.createdAt = Date.now();
        this.local = props.local
        this.status = props.status
        this.UserID = uid as string
        if(id){
            this.postId = id
        }
        if(createdAt){
            this.createdAt = createdAt
        }
    }
}
