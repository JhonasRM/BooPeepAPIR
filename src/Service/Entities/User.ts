import { Post } from "../Model/Post";
import { UserOnAuth } from "../Model/UserOnAuth";
import { UserOnFirestore } from "../Model/UserOnFireStore";

export class User {
    public readonly uid!: string;

    public displayName: string;
    public email: string;
    public password: string;
    public emailVerified: boolean;
    // public photoURL: string;
    public disabled: boolean;
    public postsID!: string[];
    public chatID!: string;
    public course!: string;
    public shift!: string;
    public description!: string;

    constructor(userOnAuth: UserOnAuth, userOnFireStore?: UserOnFirestore) {
        this.displayName = userOnAuth.displayName,
            this.email = userOnAuth.email,
            this.password = '',
            this.emailVerified = userOnAuth.emailVerified
        // this.photoURL = '';
        if (userOnAuth.uid !== undefined) {
            this.uid = userOnAuth.uid
        }
        this.disabled = userOnAuth.disabled;
        if (userOnFireStore) {
            this.postsID = userOnFireStore.postsID,
                this.chatID = userOnFireStore.chatID,
                this.course = userOnFireStore.course,
                this.shift = userOnFireStore.shift,
                this.description = userOnFireStore.description
        }
    }

    destructuring() {
        const userOnAuth: UserOnAuth = new UserOnAuth(
            this.displayName,
            this.email,
            this.password,
            this.emailVerified,
            this.disabled
        )
        const userOnData: UserOnFirestore = new UserOnFirestore(
            this.uid,
            this.postsID,
            this.chatID,
            this.course,
            this.shift,
            this.description
        )
        return { userOnAuth, userOnData }
    }
}
