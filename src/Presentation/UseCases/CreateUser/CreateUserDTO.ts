//Data Transfer Object

export interface ICreateUserRequestDTO{
    displayName: string;
    email: string;
    password: string;
    emailVerified: boolean;
    // photoURL: string;
    disabled: boolean
}