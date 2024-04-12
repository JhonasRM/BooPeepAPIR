import { DeletePostUC } from "./DeletePostUC";
import { Request, Response } from "express";

export class DeletePostController{
    constructor(private deletePostUC: DeletePostUC){}

    async handle(request: Request, response: Response): Promise<Response>{
        const { postID } = request.body
        try {
            const deletedPost = await this.deletePostUC.execute({
                postID,
            })

            return response.status(200).send()
        } catch (error) {
            console.error(`Erro: ${error instanceof Error ? error.message : 'desconhecido'}`);
            const statusCode = error instanceof Error ? 400 : 500;
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
            return response.status(statusCode).send(`Erro: ${errorMessage}`);
          }
    }
}