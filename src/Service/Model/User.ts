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
        this.password = '';
        this.emailVerified = userOnAuth.emailVerified;
        // this.photoURL = '';
        this.disabled = userOnAuth.disabled;
    }

    destructuring(){
        const userOnAuth: UserOnAuth = new UserOnAuth(
          this.displayName,
          this.email,
           this.password,
          this.emailVerified,
          this.disabled
        )
        const userOnData: UserOnFirestore = new UserOnFirestore({
            email: this.email,
            password: this.password,
        }, this.uid, this.posts, this.age)
        return {userOnAuth, userOnData}
    }
}
