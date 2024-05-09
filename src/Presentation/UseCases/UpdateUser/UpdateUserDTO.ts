export interface IUpdateUserRequestDTO{
    displayName: string;
    email: string;
    password: string;
    emailVerified: boolean;
    // photoURL: string;
    disabled: boolean
}