import { Post } from "./Post";
import { UserOnAuth } from "./UserOnAuth";
import { UserOnFirestore } from "./UserOnFireStore";

export class User{
    public readonly uid!: string;

    public displayName: string;
    public email: string;
    public password: string;
    public emailVerified: boolean;
    // public photoURL: string;
    public disabled: boolean;
    public posts!: Post[];
    public age!: number;

    constructor(userOnAuth: UserOnAuth, userOnFireStore: UserOnFirestore){
        this.displayName = userOnAuth.displayName;
        this.email = userOnAuth.email;
        this.password = userOnAuth.password;
        this.emailVerified = userOnAuth.emailVerified;
        // this.photoURL = '';
        this.disabled = userOnAuth.disabled;
        this.age = userOnFireStore.age,
        this.posts = userOnFireStore.posts
    }

    destructuring(){
        const userOnAuth: UserOnAuth = new UserOnAuth({
          displayName: this.displayName,
          email: this.email,
          emailVerified: this.emailVerified,
          password: this.password,
          disabled: this.disabled
        }, this.uid)
        const userOnData: UserOnFirestore = new UserOnFirestore({
            uid: this.uid,
            email: this.email,
            password: this.password,
        }, this.posts, this.age)
        return {userOnAuth, userOnData}
    }
}
