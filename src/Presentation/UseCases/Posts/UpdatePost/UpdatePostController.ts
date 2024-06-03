import { Request, Response } from 'express';
import { UpdatePostUC } from "./UpdatePostUC";

export class UpdatePostController {
    constructor(
        private updatePostUC: UpdatePostUC,
    ) { }

    async handle(request: Request, response: Response): Promise<void> {
        const {
            postId,
            fieldToUpdate,
            newValue,
        } = request.body;

        try {
            const updatedPost = await this.updatePostUC.execute({
                postId,
                fieldToUpdate,
                newValue
            })

            if(updatedPost.val === false){
                throw new Error(updatedPost.erro as string)
            }
             response.status(200).send(updatedPost.data);
        } catch (error: unknown) {
            if(error instanceof Error){
                if(error.message === 'Postagem não encontrada'){
                    response.status(404).send('Erro: postagem não encontrada')
                } else if(error.message === 'Bad Request'){
                   response.status(400).send('Erro de requisição: verifique os campos e valores preenchidos')
                }
                    response.status(400).send(error.message)
            }
            response.status(500).send(`Internal Server Error: ${error}`)
        }
    }
}