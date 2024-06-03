//Data Transfer Object

export interface IReadPostRequestDTO{
    postId:string,
    description: string;
    local: string;
    status: number;
    UserID: string;
}