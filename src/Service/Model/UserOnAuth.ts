
export class UserOnAuth{
    public uid?: string;

    public displayName: string;
    public email: string;
    public password: string;
    public emailVerified: boolean;
    public disabled: boolean;

    constructor(displayName: string, email: string, password: string, emailVerified?: boolean, disabled?:boolean, uid?: string){
        this.displayName = displayName;
        this.email = email;
        this.password = password;
        this.emailVerified = false;
        // this.photoURL = '';
        this.disabled = false;
        if(uid){
            this.uid = uid
        }
        if(emailVerified){
            this.emailVerified = emailVerified
        }
        if(disabled){
            this.disabled = disabled
        }
    }
    conectData(uid: string){
        this.uid = uid
    }
}
