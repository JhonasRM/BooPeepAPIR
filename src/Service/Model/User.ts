import { randomUUID } from "crypto";
import { Post } from "./Post";
export class User{
    public readonly uid!: string;

    public name: string;
    public email: string;
    public password: string;
    public readonly posts!: Post[]

    constructor(props: Omit<User, 'uid'|'posts'>){
        this.name = props.name
        this.email = props.email
        this.password = props.password
    }
}
