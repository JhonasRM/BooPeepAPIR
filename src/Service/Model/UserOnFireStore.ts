import { Post } from "./Post";

export class UserOnFirestore{
    public readonly uid?: string 

    public posts!: Post[];
    public age!: number;
    public email: string;
    public password: string;

    constructor(props: Omit<UserOnFirestore, 'posts'|'age' | 'uid'>,uid?: string, posts?: Post[], age?: number){
        this.email = props.email;
        this.password = props.password;
        this.posts = []
        if(posts){
            this.posts = posts
        }
        if(age){
            this.age = age
        }
        if(uid){
            this.uid = uid
        }
    }
}