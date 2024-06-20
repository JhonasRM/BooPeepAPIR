import { Request, Response } from 'express';
import { UpdateComentUC } from './UpdateComentUC';

export class UpdateComentController {
    constructor(
        private updateComent: UpdateComentUC,
    ) { }

    async handle(request: Request, response: Response): Promise<void> {
        const {
            postID,
            comentID,
            newValue
        } = request.body;

        try {
            const updatedComent = await this.updateComent.execute({
                postID,
                comentID,
                newValue
            })

            if(updatedComent.val === false){
                throw new Error(updatedComent.erro as string)
            }
             response.status(200).send(updatedComent.data);
        } catch (error: unknown) {
            if(error instanceof Error){
                if(error.message === 'Postagem não encontrada'){
                    response.status(404).send('Erro: postagem não encontrada')
                } else if(error.message === 'Bad Request'){
                   response.status(400).send('Erro de requisição: verifique os campos e valores preenchidos')
                }
                    response.status(400).send(error.message)
            } else {
            response.status(500).send(`Internal Server Error: ${error}`)
        }
        }
    }
}