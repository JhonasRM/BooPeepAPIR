import { Post } from "./Post";

export class UserOnFirestore{
    public readonly uid: string

    public posts!: Post[];
    public age!: number;
    public email: string;
    public password: string;
    constructor(props: Omit<UserOnFirestore, 'posts'|'age'>){
        this.uid =  props.uid;
        this.email = props.email;
        this.password = props.password;
        this.posts = []
    }
}