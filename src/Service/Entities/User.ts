import { Post } from "../Model/Post";
import { UserOnAuth } from "../Model/UserOnAuth";
import { UserOnFirestore } from "../Model/UserOnFireStore";

export class User{
    public readonly uid!: string;

    public displayName: string;
    public email: string;
    public password: string;
    public emailVerified: boolean;
    // public photoURL: string;
    public disabled: boolean;
    public postsID!: string[];
    public chatID!: string;

    constructor(userOnAuth: UserOnAuth, userOnFireStore?: UserOnFirestore){
        this.displayName = userOnAuth.displayName;
        this.email = userOnAuth.email;
        this.password = '';
        this.emailVerified = userOnAuth.emailVerified;
        // this.photoURL = '';
        if(userOnAuth.uid  !== undefined){
            this.uid = userOnAuth.uid
        }
        this.disabled = userOnAuth.disabled;
        if(userOnFireStore){
            this.postsID = userOnFireStore.postsID
            this.chatID = userOnFireStore.chatID
        }
    }

    destructuring(){
        const userOnAuth: UserOnAuth = new UserOnAuth(
          this.displayName,
          this.email,
           this.password,
          this.emailVerified,
          this.disabled
        )
        const userOnData: UserOnFirestore = new UserOnFirestore(this.uid, this.postsID, this.chatID)
        return {userOnAuth, userOnData}
    }
}
