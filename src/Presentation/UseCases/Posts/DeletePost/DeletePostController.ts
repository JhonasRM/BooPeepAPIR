import { DeletePostUC } from "./DeletePostUC";
import { Request, Response } from "express";

export class DeletePostController{
    constructor(private deletePostUC: DeletePostUC){}

    async handle(request: Request, response: Response): Promise<void>{
        const { postID } = request.body
        try {
            const deletedPost = await this.deletePostUC.execute({postID})

            response.status(200).send(deletedPost.data)
        } catch (error) {
            if(error instanceof Error){
                if(error.message === 'Postagem não encontrada'){
                    response.status(404).send('Postagem não encontrada')
                } else if(error.message !== 'Postagem não encontrada' ){
                    response.status(400).send(`Erro de requisição: ${error.message}`)
                }
            }
            response.status(500).send(`Internal server error: ${error}`)
          }
    }
}