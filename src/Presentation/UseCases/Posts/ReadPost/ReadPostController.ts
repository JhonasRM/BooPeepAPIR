import { Request, Response } from 'express';
import { ReadPostUC } from './ReadPostUC';

export class ReadPostController {
    constructor(
        private readPostUC: ReadPostUC,
    ) { }

    async handle(request: Request, response: Response): Promise<void> {
        const { postId } = request.params;
        try {
            const wantedPost = await this.readPostUC.execute({postId})
            if(wantedPost.val === false){
                throw new Error(wantedPost.erro as string)
            }
            response.status(200).json(wantedPost.data);
        } catch (error) {
            if(error instanceof Error){
                if(error.message === 'Postagem não encontrada'){
                    response.status(404).send(error.message)
                } else if(error.message !== 'Postagem não encontrada' ){
                    response.status(400).send(`Erro de requisição: ${error.message}`)
                }
            }
            response.status(500).send(`Erro interno do servidor: ${error}`)
          }
    }
}