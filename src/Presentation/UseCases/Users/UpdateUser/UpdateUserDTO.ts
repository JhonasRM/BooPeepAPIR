export interface IUpdateUserRequestDTO{
    email: string,
    fieldToUpdate: string,
    newValue: any,
    token?: string
}