import { deletePostUC } from "./DeletePostUC";
import { Request, Response } from "express";

export class DeletePostController{
    constructor(private deletePostUC: deletePostUC){}

    async handle(request: Request, response: Response): Promise<Response>{
        const { postID } = request.body
        try {
            const deletedPost = await this.deletePostUC.execute({
                postID,
            })

            return response.status(200).send()
        } catch (error) {
            if (error instanceof Error) {
                console.error('Erro ao lidar com a solicitação:', error);
                return response.status(500).json({ error: 'Erro interno do servidor' });
            } else {
                console.error('Erro inesperado:', error);
                return response.status(500).json({ error: 'Erro inesperado' });
            }
        }
    }
}