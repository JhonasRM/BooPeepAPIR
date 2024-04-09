import { randomUUID } from "crypto";
import { User } from "./User";
export class Post{
    public readonly id!: string;

    public description: string;
    // public image : SVGAElement;
    public createdAt: number;
    public local: string;
    public status: number;
    // public UserID: string;

    constructor(props: Omit<Post, 'id'>, id?: string){
        this.description = props.description
        // this.image = props.image
        this.createdAt = Date.now();
        this.local = props.local
        this.status = props.status
        // this.UserID = user.id
        if(!id){
            this.id = randomUUID()
        }
    }
}
