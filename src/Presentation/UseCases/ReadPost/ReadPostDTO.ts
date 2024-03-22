//Data Transfer Object

export interface IReadPostRequestDTO{
    id:string,
    description: string;
    //   image : SVGAElement;
    data: Date;
    local: string;
    status: number;
    UserID: string;
}