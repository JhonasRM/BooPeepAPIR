import { Post } from "../../../Service/Model/Post";

export interface IUpdateUserRequestDTO{
    email: string,
    fieldToUpdate: string,
    newValue: any
}