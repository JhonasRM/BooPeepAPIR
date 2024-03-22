import { randomUUID } from "crypto";
import { User } from "./User";
export class Post{
    public readonly id!: string;

    public description: string;
    // public image : SVGAElement;
    public data: Date;
    public local: string;
    public status: number;
    public UserID: string;

    constructor(props: Omit<Post, 'id'>, user: User, id?: string){
        this.description = props.description
        // this.image = props.image
        this.data = props.data
        this.local = props.local
        this.status = props.status
        this.UserID = user.id
        if(!id){
            this.id = randomUUID()
        }
    }
}
