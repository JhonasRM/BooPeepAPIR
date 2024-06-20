import { Request, Response } from "express";
import { DeleteComentRequestDTO } from "./DeleteComentDTO";
import { DeleteComentUC } from "./DeleteComentUC";
export class DeleteComentController{
    constructor(private deleteComentUC: DeleteComentUC){}

    async handle(request: Request, response: Response): Promise<void>{
        const { postID, comentID} = request.query;
        const data: DeleteComentRequestDTO = {
            postID: postID as string,
            comentID: comentID as string
        }
        try {
            const deletedComent = await this.deleteComentUC.execute(data)
            if(deletedComent.val === false){
                throw new Error(deletedComent.erro)
            }
            response.status(200).send(deletedComent.data)
        } catch (error) {
            if(error instanceof Error){
                if(error.message === 'Postagem não encontrada'){
                    response.status(404).send('Erro: Postagem não encontrada')
                } else if(error.message !== 'Postagem não encontrada' ){
                    response.status(400).send(`Erro: Erro de requisição: ${error.message}`)
                }
            } else {
            response.status(500).send(`Erro interno do servidor: ${error}`)
        }
          }
    }
}