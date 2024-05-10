
export class UserOnAuth{
    public readonly uid!: string;

    public displayName: string;
    public email: string;
    public password: string;
    public emailVerified: boolean;
    // public photoURL: string;
    public disabled: boolean;

    constructor(props: Omit<UserOnAuth, 'uid'>){
        this.displayName = props.displayName;
        this.email = props.email;
        this.password = props.password;
        this.emailVerified = false;
        // this.photoURL = '';
        this.disabled = false;
    }
}
